import csv
import datetime
import json

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, FormView

from core.models import Activity, RUNKEEPER_ACTIVITY_KEYS
from core.utils import generate_dummy_activities as generate_activities

from .forms import ActivityForm, ImportDataForm

ACTIVITY_PROPERTIES = {
    'date': 'Date',
    'activity_type': 'Type',
    'distance': 'Distance (km)',
    'duration': 'Duration',
    'calories': 'Calories Burned',
    'activity_notes': 'Notes',
}
CSV_HEADERS = [ACTIVITY_PROPERTIES[key] for key in ACTIVITY_PROPERTIES]


class Home(TemplateView):
    template_name = 'public/index.html'

    def get_context_data(self, *args, **kwargs):
        ctx = super(Home, self).get_context_data(*args, **kwargs)
        ctx.update(
            title=u'Keep Running',
            activity_form=ActivityForm(),
            import_data_form=ImportDataForm()
        )
        return ctx


class ImportData(FormView):
    form_class = ImportDataForm
    success_url = '/#/activities'
    template_name = 'public/import_data.html'

    def get_context_data(self, *args, **kwargs):
        ctx = super(ImportData, self).get_context_data(*args, **kwargs)
        ctx.update(
            title=u'Keep Running',
            activity_form=ActivityForm(),
            import_data_form=ImportDataForm()
        )
        return ctx

    def post(self, request, *args, **kwargs):

        form = self.form_class(data=request.POST, files=request.FILES)
        if form.is_valid():

            def _get_prop_value(csv_row, header_idxs, model_property_name):
                csv_header = ACTIVITY_PROPERTIES[model_property_name]
                return csv_row[header_idxs[csv_header]]

            def _get_duration(duration=[]):
                if len(duration) == 2:
                    return datetime.time(0, int(duration[0]), int(duration[1]))
                if len(duration) == 3:
                    return datetime.time(
                        int(duration[0]), int(duration[1]), int(duration[2]))
                else:
                    return datetime.time(0, 5)

            Activity.objects.all().delete()
            csv_file = request.FILES['csv_file']

            spamreader = csv.reader(csv_file, delimiter=',', quotechar='|')

            csv_header_idxs = {}
            for row in spamreader:
                if spamreader.line_num == 1:
                    for idx, col in enumerate(row):
                        if col in CSV_HEADERS:
                            csv_header_idxs[col] = idx
                else:
                    date_str = _get_prop_value(row, csv_header_idxs, 'date')
                    date = datetime.datetime.strptime(
                        date_str, "%Y-%m-%d %H:%M:%S")
                    duration_list = _get_prop_value(
                        row, csv_header_idxs, 'duration').split(':')

                    activity_type = _get_prop_value(
                        row, csv_header_idxs, 'activity_type')
                    if activity_type in RUNKEEPER_ACTIVITY_KEYS:
                        activity_type = RUNKEEPER_ACTIVITY_KEYS[activity_type]
                    duration = _get_duration(duration_list)
                    distance = _get_prop_value(row, csv_header_idxs, 'distance')
                    calories = _get_prop_value(row, csv_header_idxs, 'calories')
                    activity_notes = _get_prop_value(
                        row, csv_header_idxs, 'activity_notes')

                    Activity.objects.create(
                        date=date,
                        activity_type=activity_type,
                        duration=duration,
                        distance=distance,
                        calories=float(calories),
                        activity_notes=activity_notes,
                    )

            response_data = dict(
                message='Your data was imported correctly',
                success=True
            )
        else:
            response_data = dict(
                message='Error',
                errors=form.errors,
                success=False
            )

        return HttpResponse(json.dumps(response_data),
                            content_type="application/json")

import_data = ImportData.as_view()


def generate_dummy_activities(request):
    if settings.DEBUG:
        generate_activities()
        return render(request, 'public/debug/dummy_activities_generated.html')
    else:
        return redirect('public:home')
