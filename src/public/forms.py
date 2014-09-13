from crispy_forms.bootstrap import FormActions
from crispy_forms.layout import Layout, Submit, HTML, Row, Div, Field
from crispy_forms.helper import FormHelper
import floppyforms.__future__ as forms

from core.models import Activity

Field.template = 'public/angular-field.html'
DATE_FIELD_TEMPLATE = 'public/ui-date-field.html'


def to_camel_case(snake_str):
        components = snake_str.split('_')
        return components[0] + "".join(x.title() for x in components[1:])


def angularise_fields(fields, ng_model=None):
    for field in fields:
        ng_model_name = to_camel_case(field)
        if ng_model:
            ng_model_name = '%s.%s' % (ng_model, ng_model_name)
        fields[field].widget.attrs['ng-model'] = ng_model_name
    return fields


class ActivityForm(forms.ModelForm):
    class Meta:
        model = Activity

    def __init__(self, *args, **kwargs):
        super(ActivityForm, self).__init__(*args, **kwargs)
        helper = FormHelper()
        helper.form_class = 'form'
        helper.attrs['name'] = 'form'
        helper.attrs['novalidate'] = ''
        helper.attrs['ng-submit'] = 'submit(form)'
        self.helper = helper
        self.helper.layout = Layout(
            Row(
                Div(
                    Field('activity_type'),
                    Field('distance', positive_integer=''),
                    Field('calories', positive_integer=''),
                    css_class='col-md-6'
                ),
                Div(
                    Field('date', template=DATE_FIELD_TEMPLATE, past_date=''),
                    Field('start_time'),
                    Field('duration'),
                    css_class='col-md-6'
                ),
            ),
            Div(
                Field('activity_notes'),
            ),
            FormActions(
                HTML('<button class="btn btn-primary">Save</button>'),
                HTML('<a href="#/activities" class="btn btn-default">Cancel</a>'),
            )
        )

        # Fix some widgets
        self.fields['distance'].widget.attrs['step'] = "any"
        self.fields['start_time'].widget.attrs['step'] = "1"
        self.fields['duration'].widget.attrs['step'] = "1"

        self.fields = angularise_fields(fields=self.fields, ng_model='activity')


class ImportDataForm(forms.Form):
    csv_file = forms.FileField(label='CSV file', help_text="""Import your exported
        Runkeeper CSV file with your activities""")

    def __init__(self, *args, **kwargs):
        super(ImportDataForm, self).__init__(*args, **kwargs)
        helper = FormHelper()
        helper.form_class = 'form'
        helper.attrs['name'] = 'form'
        helper.attrs['novalidate'] = ''
        helper.attrs['ng-submit'] = 'submit(form)'
        self.helper = helper
        self.helper.layout = Layout(
            Field('csv_file'),
            FormActions(
                HTML('<button class="btn btn-primary">Import data</button>'),
                HTML('<a href="#/activities" class="btn btn-default">Cancel</a>'),
            )
        )

        self.fields['csv_file'].widget.attrs['file-model'] = 'acitivty.csvFile'
        self.fields = angularise_fields(fields=self.fields, ng_model='activity')
