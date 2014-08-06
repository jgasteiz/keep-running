from django import template

register = template.Library()

@register.filter(name='format_time')
def format_time(value):
    if value.hour > 0:
        return "%s:%s:%s" % (value.hour, value.minute, value.second)
    else:
        return "%s:%s" % (value.minute, value.second)