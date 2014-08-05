from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns(
    'keeprunning.public.views',
    url(r'^$', views.Home.as_view(), name='home'),
    url(r'^activities$', 'activity_list', name='activity_list'),
    url(r'^activities/create/$', 'create_activity', name='create_activity'),
    url(r'^activities/detail/(?P<pk>[-\d]+)/$', 'detail_activity', name='detail_activity'),
    url(r'^activities/update/(?P<pk>[-\d]+)/$', 'update_activity', name='update_activity'),
    url(r'^activities/delete/(?P<pk>[-\d]+)/$', 'delete_activity', name='delete_activity'),
)
