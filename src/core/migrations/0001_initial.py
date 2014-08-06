# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activity_type', models.CharField(max_length=256, verbose_name='Activity type', choices=[(b'running', b'Running'), (b'walking', b'Walking'), (b'cycling', b'Cycling')])),
                ('date', models.DateField(verbose_name='Date of activity')),
                ('start_time', models.TimeField(null=True, verbose_name='Start time', blank=True)),
                ('duration', models.TimeField(verbose_name='Duration')),
                ('distance', models.FloatField(null=True, verbose_name='Distance', blank=True)),
                ('calories', models.IntegerField(null=True, verbose_name='Calories', blank=True)),
                ('activity_notes', models.TextField(null=True, verbose_name='Notes', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
