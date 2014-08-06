import datetime

import factory
from factory.fuzzy import FuzzyInteger, FuzzyFloat

from .models import Activity


class ActivityFactory(factory.Factory):
    class Meta:
        model = Activity


def generate_dummy_activities(num_activities=50):
    Activity.objects.all().delete()

    current_date = datetime.datetime.now()

    for i in range(0, num_activities):
        activity = ActivityFactory.build(
            date=current_date,
            start_time=datetime.time(11, 30),
            duration=datetime.time(0, FuzzyInteger(30, 59).fuzz()),
            distance=FuzzyFloat(5, 9).fuzz(),
            calories=FuzzyInteger(320, 750).fuzz()
        )
        activity.save()
        current_date = current_date - datetime.timedelta(1)
