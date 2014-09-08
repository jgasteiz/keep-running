from rest_framework import mixins, viewsets, permissions
from rest_framework.response import Response

from core.models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Activity.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = ActivitySerializer


class StatViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    """
    def list(self, request, *args, **kwargs):
        activities = Activity.objects.all()

        num_activities = len(activities)
        total_distance = sum(activity.distance for activity in activities)
        total_calories = sum(activity.calories for activity in activities)

        data = [
            dict(
                title='Total activities',
                value=num_activities
            ),
            dict(
                title='Total distance',
                value='%s km' % round(total_distance, 2)
            ),
            dict(
                title='Total calories',
                value='%s' % format(int(total_calories), ",d")
            ),
        ]
        return Response(data)