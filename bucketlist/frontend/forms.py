from django.contrib.auth import password_validation
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import forms


class RegisterForm(UserCreationForm):
    """This represents a form for registering users"""
    email = forms.EmailField(required=True)

    class Meta:
        """UserCreationform uses the django User object."""
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def save(self, commit=True):
        """Save method used by the AbstractUser object.

        Subclassed by the User object to save data to database and
        called by UserRegistration Request class in frontend/views.py.

        Arguments:
            commit: A flag set to True

        Returns:
            saved user object
        """
        user = super(RegisterForm, self).save(commit=False)
        user.username = self.cleaned_data['username']
        user.email = self.cleaned_data['email']
        user.is_active = False

        if commit:
            user.save()
        return user


class LoginForm(AuthenticationForm):
    """This represents a form for registering users"""

    class Meta:
        model = User
        fields = ('username', 'password')
