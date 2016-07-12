"""Script used to test bucketlist reponse and request."""

from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from .utils import ApiHeaderAuthorization


class ApiBucketListTestCase(ApiHeaderAuthorization):
    """Tests for the BucketList related API views"""

    def test_user_can_view_bucketlist(self):
        url = reverse_lazy('bucketlist-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_can_create_bucketlist(self):
        url = reverse_lazy('bucketlist-list')
        data = {'name': 'B1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_single_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_get_non_existent_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 101})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_update_a_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 200)

    def test_update_bucketlist_with_invalid_args(self):
        data = {'watahc': 'Gaa Too'}
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 400)

    def test_update_non_existent_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 101})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 404)

    def test_delete_a_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 101})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)


class BucketListViewNoAuthorizationTestCase(APITestCase):
    """
    Tests to confirm that users cannot access bucketlists that aren't theirs
    """

    fixtures = ['users', 'initial_data']

    def setUp(self):
        User.objects.create_user(username='madara', password='kenkeigenkai')
        self.client = APIClient()
        self.client.login(username='madara', password='kenkeigenkai')

    def test_user_has_no_bucketlist(self):
        url = reverse_lazy('bucketlist-list')
        response = self.client.get(url)
        self.assertEqual(response.json(), [])

    def test_user_can_not_read_anothers_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

    def test_user_can_not_update_anothers_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 403)

    def test_user_can_not_delete_anothers_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)
