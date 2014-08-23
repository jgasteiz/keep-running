import calendar
import csv
import datetime
import logging

from django.conf import settings
from django.core import serializers
from django.core.urlresolvers import reverse_lazy, reverse
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import (
    TemplateView, ListView, CreateView, DeleteView, UpdateView, DetailView,
    FormView)

from core.models import Activity
from core.utils import generate_dummy_activities as generate_activities

from .forms import ActivityForm, ImportDataForm

ACTIVITY_MODEL_PROPERTIES = {
    'date': 'Date',
    'activity_type': 'Type',
    'distance': 'Distance (km)',
    'duration': 'Duration',
    'calories': 'Calories Burned',
    'activity_notes': 'Notes',
}
CSV_HEADERS = [ACTIVITY_MODEL_PROPERTIES[key] for key in ACTIVITY_MODEL_PROPERTIES]


class PublicMixin(object):

    def get_context_data(self, *args, **kwargs):
        ctx = super(PublicMixin, self).get_context_data(*args, **kwargs)
        ctx.update(
            title=u'Keep Running'
        )
        return ctx


class Home(PublicMixin, TemplateView):
    template_name = 'public/home.html'


class ActivityList(PublicMixin, ListView):
    model = Activity
    template_name = 'public/activity_list.html'

    date = None

    def get_queryset(self):
        queryset, self.date = get_activities(self.request, self.model)
        return queryset

    def get_context_data(self, *args, **kwargs):
        ctx = super(ActivityList, self).get_context_data(*args, **kwargs)
        next_date = self.date + datetime.timedelta(days=32)
        previous_date = self.date - datetime.timedelta(days=self.date.day + 1)

        next_month = None
        if next_date < datetime.datetime.now():
            next_month = '%s-%s' % (next_date.year, next_date.month)

        ctx.update(dict(
            month=calendar.month_name[self.date.month],
            next_month=next_month,
            previous_month='%s-%s' % (previous_date.year, previous_date.month),
        ))
        return ctx

activity_list = ActivityList.as_view()


class CreateActivity(PublicMixin, CreateView):
    model = Activity
    form_class = ActivityForm
    success_url = reverse_lazy('public:activity_list')
    template_name = 'public/activity_create.html'

create_activity = CreateActivity.as_view()


class DetailActivity(PublicMixin, DetailView):
    model = Activity
    template_name = 'public/activity_detail.html'

detail_activity = DetailActivity.as_view()


class UpdateActivity(PublicMixin, UpdateView):
    model = Activity
    form_class = ActivityForm
    success_url = reverse_lazy('public:activity_list')
    template_name = 'public/activity_update.html'

update_activity = UpdateActivity.as_view()


class DeleteActivity(PublicMixin, DeleteView):
    model = Activity
    form_class = ActivityForm
    success_url = reverse_lazy('public:activity_list')
    template_name = 'public/confirm_delete.html'

delete_activity = DeleteActivity.as_view()


class ImportData(PublicMixin, FormView):
    form_class = ImportDataForm
    success_url = reverse_lazy('public:activity_list')
    template_name = 'public/import_data.html'

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():

            def _get_prop_value(csv_row, header_idxs, model_property_name):
                return csv_row[header_idxs[ACTIVITY_MODEL_PROPERTIES[model_property_name]]]

            def _get_duration(duration=[]):
                if len(duration) == 2:
                    return datetime.time(0, int(duration[0]), int(duration[1]))
                if len(duration) == 3:
                    return datetime.time(int(duration[0]), int(duration[1]), int(duration[2]))
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
                    date = datetime.datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
                    duration_list = _get_prop_value(row, csv_header_idxs, 'duration').split(':')

                    activity_type = _get_prop_value(row, csv_header_idxs, 'activity_type')
                    duration = _get_duration(duration_list)
                    distance = _get_prop_value(row, csv_header_idxs, 'distance')
                    calories = _get_prop_value(row, csv_header_idxs, 'calories')
                    activity_notes = _get_prop_value(row, csv_header_idxs, 'activity_notes')

                    Activity.objects.create(
                        date=date,
                        activity_type=activity_type,
                        duration=duration,
                        distance=distance,
                        calories=float(calories),
                        activity_notes=activity_notes,
                    )

            return redirect(self.get_success_url())
        else:
            return redirect(reverse('public:import_data'))

import_data = ImportData.as_view()


def generate_dummy_activities(request):
    if settings.DEBUG:
        generate_activities()
        return render(request, 'public/debug/dummy_activities_generated.html')
    else:
        return redirect('public:home')


def get_activities(request, model):
    if not 'date' in request.GET:
        current_date = datetime.datetime.now()
        min_date = datetime.date(current_date.year, current_date.month, 1)
        queryset = model.objects.filter(date__gte=min_date)
    else:
        # TODO: make this nicer
        date_str = request.GET.get('date')
        current_date = datetime.datetime.strptime(date_str, "%Y-%m")
        min_date = datetime.date(current_date.year, current_date.month, 1)
        next_month = min_date + datetime.timedelta(days=32)
        max_date = datetime.date(next_month.year, next_month.month, 1) - datetime.timedelta(days=1)
        queryset = model.objects.filter(date__gte=min_date, date__lte=max_date)
    return queryset, current_date


def activity_json(request):
    queryset, date = get_activities(request, Activity)
    response_data = serializers.serialize(
        'json', queryset.order_by('date'))
    return HttpResponse(response_data, content_type="application/json")
