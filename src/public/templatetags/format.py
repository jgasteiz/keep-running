from django import template

register = template.Library()


@register.filter(name='get_ng_model')
def get_ng_model(attrs):
    return attrs.get('ng-model', '')
