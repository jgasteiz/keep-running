from django.core.urlresolvers import reverse_lazy
from django.views.generic import TemplateView, ListView, CreateView, DeleteView

from keeprunning.core.models import Activity

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


class DeleteActivity(PublicMixin, DeleteView):
    model = Activity
    form_class = ActivityForm
    success_url = reverse_lazy('public:activity_list')
    template_name = 'public/confirm_delete.html'

delete_activity = DeleteActivity.as_view()
