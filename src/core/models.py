from django.db import models

ACTIVITY_TYPES = (
    ('running', 'Running'),
    ('walking', 'Walking'),
    ('cycling', 'Cycling'),
)
RUNKEEPER_ACTIVITY_KEYS = {
    'Running': 'running'
}

class Activity(models.Model):
    activity_type = models.CharField(
        verbose_name=u"Activity type", choices=ACTIVITY_TYPES, default='running', max_length=256)
    date = models.DateField(verbose_name=u"Date of activity")
    start_time = models.TimeField(verbose_name=u"Start time", blank=True, null=True)
    duration = models.TimeField(verbose_name=u"Duration")
    distance = models.FloatField(verbose_name=u"Distance", blank=True, null=True)
    calories = models.IntegerField(verbose_name=u"Calories", blank=True, null=True)
    activity_notes = models.TextField(verbose_name=u"Notes", blank=True, null=True)

    class Meta:
        ordering = ('-date',)

    def __unicode__(self):
        return '%s, on %s, %sh, %skm' % (self.activity_type, self.date, self.duration, self.distance)
