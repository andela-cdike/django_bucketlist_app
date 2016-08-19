from django.contrib.auth.models import User
from django.core.urlresolvers import resolve
from django.test import Client, TestCase

from frontend.views import UserLoginView, UserLogoutView, UserRegistrationView


class UserLoginRouteTestCase(TestCase):
    """
    Test that post and get requests to login routes are successful
    """

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('erika_dike'
                                             'erika_dike@self.com'
                                             'sark1nM0mb@55a')

    def test_get_login_route(self):
        response = self.client.get('/login/')
        self.assertEquals(response.status_code, 200)