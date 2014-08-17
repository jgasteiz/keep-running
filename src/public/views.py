import calendar
import datetime

from django.conf import settings
from django.core import serializers
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import (
    TemplateView, ListView, CreateView, DeleteView, UpdateView, DetailView)

from core.models import Activity
from core.utils import generate_dummy_activities as generate_activities

from .forms import ActivityForm


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
