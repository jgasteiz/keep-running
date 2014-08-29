from rest_framework import permissions
from rest_framework import viewsets

from core.models import Activity
from .serializers import ActivitySerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Activity.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = ActivitySerializer
