from django.conf.urls import patterns, url, include

from rest_framework import routers

from . import views, api


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'activities', api.ActivityViewSet)
router.register(r'stats', api.StatViewSet, 'stats')


urlpatterns = patterns(
    'public.views',

    url(r'^$', views.Home.as_view(), name='home'),

    url(r'^_api/', include(router.urls)),
    url(r'^_api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^activities/import_data/$', 'import_data', name='import_data'),
    url(r'^activities/generate_dummy/$', 'generate_dummy_activities',
        name='generate_dummy_activities'),
)
