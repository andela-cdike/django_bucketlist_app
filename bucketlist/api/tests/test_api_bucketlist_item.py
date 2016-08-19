"""Script used to test bucketlist item response and request."""

from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User
from rest_framework import status

from .utils import ApiHeaderAuthorization, ApiHeaderWrongAuthorization


class ApiBucketListItemTestCase(ApiHeaderAuthorization):
    """Tests for the Bucketlist item list and detail views"""
    def test_user_can_view_item(self):
        url = reverse_lazy('item-list', kwargs={'bucketlist': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_can_create_item(self):
        url = reverse_lazy('item-list', kwargs={'bucketlist': 1})
        data = {'name': 'Learn Kungfu'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_can_update_item(self):
        url = reverse_lazy('item-detail', kwargs={'bucketlist': 1, 'pk': 2})
        data = {'name': 'Learn Kungfu'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 200)

    def test_user_can_delete_item(self):
        url = reverse_lazy('item-detail', kwargs={'bucketlist': 1, 'pk': 2})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class BucketListItemViewNoAuthorizationTestCase(ApiHeaderWrongAuthorization):
    """
    Tests to confirm that users cannot access bucketlists that aren't theirs
    """

    fixtures = ['users', 'initial_data']

    def test_user_can_not_read_anothers_item(self):
        url = reverse_lazy('item-list', kwargs={'bucketlist': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

    def test_user_can_not_post_item_to_anothers_bucketlist(self):
        url = reverse_lazy('item-list', kwargs={'bucketlist': 1})
        data = {'name': 'Learn Kungfu'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 403)

    def test_user_can_not_update_anothers_bucketlist(self):
        url = reverse_lazy('item-detail', kwargs={'bucketlist': 1, 'pk': 1})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 403)

    def test_user_can_not_delete_anothers_bucketlist(self):
        url = reverse_lazy('item-detail',
                           kwargs={'bucketlist': 1, 'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)
