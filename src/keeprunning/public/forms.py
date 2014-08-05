from datetime import datetime

from django.core.urlresolvers import reverse_lazy

from crispy_forms.bootstrap import FormActions
from crispy_forms.layout import Layout, Submit, HTML, Row, Div
from crispy_forms.helper import FormHelper
import floppyforms.__future__ as forms

from keeprunning.core.models import Activity


class FormHelperMixin(object):


    def get_button_layout(self):
        return Layout(
            FormActions(
                Submit('submit', 'Submit'),
                HTML('<a class="btn btn-default" href="%s">Cancel</a>' % self.get_cancel_url()),
            )
        )

    def get_cancel_url(self):
        pass


class ActivityForm(forms.ModelForm):
    cancel_url = reverse_lazy('public:activity_list')

    class Meta:
        model = Activity

    def __init__(self, *args, **kwargs):
        super(ActivityForm, self).__init__(*args, **kwargs)
        helper = FormHelper()
        helper.form_class = 'form'
        self.helper = helper
        self.helper.layout = Layout(
            Row(
                Div(
                    'activity_type',
                    'distance',
                    'calories',
                    css_class='col-md-6'
                ),
                Div(
                    'date',
                    'start_time',
                    'duration',
                    css_class='col-md-6'
                ),
            ),
            Div('activity_notes',),
            FormActions(
                Submit('submit', 'Submit'),
                HTML('<a class="btn btn-default" href="%s">Cancel</a>' % self.cancel_url),
            )
        )

        # Some initial values
        if not self.instance.pk:
            self.initial['start_time'] = datetime.now()
            self.initial['date'] = datetime.now()

        # Fix some widgets
        self.fields['distance'].widget.attrs['step'] = "any"
        self.fields['start_time'].widget.attrs['step'] = "1"
        self.fields['duration'].widget.attrs['step'] = "1"
