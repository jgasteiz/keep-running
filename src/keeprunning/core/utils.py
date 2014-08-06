from .models import Activity


def generate_dummy_activities(num_activities=50):
    Activity.objects.all().delete()
