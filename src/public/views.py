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


def activity_json(request):
    current_date = datetime.datetime.now()
    date = datetime.date(current_date.year, current_date.month, 1)
    response_data = serializers.serialize(
        'json', Activity.objects.filter(date__gte=date).order_by('date'))
    return HttpResponse(response_data, content_type="application/json")
