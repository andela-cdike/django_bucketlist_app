from django.test import TestCase

from frontend.forms import RegisterForm


class RegisterFormTestSuite(TestCase):
    """Tests for the Register form"""

    def test_valid_form(self):
        form_data = {
            'username': 'rikD',
            'email': 'rikd@self.com',
            'password1': 'masterofdsims',
            'password2': 'masterofdsims'
        }
        form = RegisterForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_blank_form(self):
        form_data = {
            'username': '',
            'email': '',
            'password1': '',
            'password2': ''
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_missing_username_field(self):
        form_data = {
            'username': '',
            'email': 'rikd@self.com',
            'password1': 'masterofdsims',
            'password2': 'masterofdsims'
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_missing_email_field(self):
        form_data = {
            'username': 'rikD',
            'email': '',
            'password1': 'masterofdsims',
            'password2': 'masterofdsims'
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_missing_password1_field(self):
        form_data = {
            'username': 'rikD',
            'email': 'rikd@self.com',
            'password1': '',
            'password2': 'masterofdsims'
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_missing_password2_field(self):
        form_data = {
            'username': 'rikD',
            'email': 'rikd@self.com',
            'password1': 'masterofdsims',
            'password2': ''
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_unmatched_password_fields(self):
        form_data = {
            'username': 'rikD',
            'email': 'rikd@self.com',
            'password1': 'masterofdsims',
            'password2': 'masterofsims'
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())

    def test_short_password_field(self):
        form_data = {
            'username': 'rikD',
            'email': 'rikd@self.com',
            'password1': 'mas1',
            'password2': 'mas1'
        }
        form = RegisterForm(data=form_data)
        self.assertFalse(form.is_valid())
