from django import template

register = template.Library()


@register.filter(name='format_time')
def format_time(value):
    if value.hour > 0:
        return "%s:%s:%s" % (value.hour, value.minute, value.second)
    else:
        return "%s:%s" % (value.minute, value.second)


@register.filter(name='get_ng_model')
def get_ng_model(attrs):
    return attrs.get('ng-model', '')
