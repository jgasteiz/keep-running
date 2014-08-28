from core.models import Activity
from rest_framework import serializers


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('activity_type', 'date', 'start_time', 'duration',
                  'distance', 'calories', 'activity_notes',)