from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'', include('keeprunning.public.urls', namespace='public', app_name='public')),
)
