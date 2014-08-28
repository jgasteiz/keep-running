from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns(
    'public.views',
    url(r'^$', views.Home.as_view(), name='home'),
    url(r'^activities$', 'activity_list', name='activity_list'),
    url(r'^activities/import_data/$', 'import_data', name='import_data'),
    url(r'^activities/json/$', 'activity_json', name='activity_json'),
    url(r'^activities/create/$', 'create_activity', name='create_activity'),
    url(r'^activities/detail/(?P<pk>[-\d]+)/$', 'detail_activity', name='detail_activity'),
    url(r'^activities/update/(?P<pk>[-\d]+)/$', 'update_activity', name='update_activity'),
    url(r'^activities/delete/(?P<pk>[-\d]+)/$', 'delete_activity', name='delete_activity'),

    url(r'^activities/generate_dummy/$', 'generate_dummy_activities', name='generate_dummy_activities'),
)
