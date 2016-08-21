from django.contrib.auth.models import User

from django.core.urlresolvers import reverse
from django.test import Client, TestCase


class UserLoginRouteTestCase(TestCase):
    """
    Test that post and get requests to login route is successful
    """

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('rikD'
                                             'erika_dike@self.com'
                                             'sark1n')

    def test_get_login_route(self):
        response = self.client.get(reverse('login'))
        self.assertEquals(response.status_code, 200)

    def test_post_login_route(self):
        response = self.client.post(reverse('login'),
                                    dict(username='erika_dike@self.com',
                                         password='sark1n'))
        self.assertEquals(response.status_code, 200)


class UserLogoutRouteTestCase(TestCase):
    """
    Test that get requests to logout is successful
    """

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('rikD'
                                             'erika_dike@self.com'
                                             'sark1n')

    def test_logout_route(self):
        response = self.client.get(reverse('logout'))
        self.assertEquals(response.status_code, 302)


class UserRegisterRouteTestCase(TestCase):
    """
    Test that post and get requests to register route is successful
    """
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('erika_dike',
                                             'erika_dike@self.com',
                                             'sark1n')

    def test_get_register_route(self):
        response = self.client.get(reverse('register'))
        self.assertEquals(response.status_code, 200)

    def test_post_register_route(self):
        response = self.client.post(reverse('register'))
        self.assertEquals(response.status_code, 200)


class HomeRouteTestCase(TestCase):
    """
    Test that get bucketlist requests to register route is successful
    """

    def test_get_home_route(self):
        response = self.client.get(reverse('home'))
        self.assertEquals(response.status_code, 302)
