from django.conf.urls import patterns, include, url


urlpatterns = patterns(
    '',
    url(r'', include('public.urls', namespace='public', app_name='public')),
)
