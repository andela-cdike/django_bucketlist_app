"""Module holds classes common to test modules"""

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient


class ApiHeaderAuthorization(APITestCase):
    """Base class used to attach header to all request on setup."""

    fixtures = ['users', 'initial_data']

    def setUp(self):
        """Include and appropriate `Authorization:` header on all requests"""
        token = Token.objects.get(user__username='Erika')
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
