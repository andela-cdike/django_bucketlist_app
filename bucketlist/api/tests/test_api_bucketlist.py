"""Script used to test bucketlist reponse and request."""

from django.core.urlresolvers import reverse_lazy
from django.http import QueryDict
from rest_framework import status

from .utils import ApiHeaderAuthorization, ApiHeaderWrongAuthorization


class ApiBucketListTestCase(ApiHeaderAuthorization):
    """Tests for the BucketList related API views"""

    def test_user_can_view_bucketlist(self):
        url = reverse_lazy('bucketlist-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_search_for_existing_bucketlist(self):
        query_dictionary = QueryDict('', mutable=True)
        query_dictionary.update({'q': 'B'})
        url = '{base_url}?{query_string}'.format(
            base_url=reverse_lazy('bucketlist-list'),
            query_string=query_dictionary.urlencode()
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['count'], 1)

    def test_search_for_non_existing_bucketlist(self):
        query_dictionary = QueryDict('', mutable=True)
        query_dictionary.update({'q': 'C'})
        url = '{base_url}?{query_string}'.format(
            base_url=reverse_lazy('bucketlist-list'),
            query_string=query_dictionary.urlencode()
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['count'], 0)

    def test_user_can_create_bucketlist(self):
        url = reverse_lazy('bucketlist-list')
        data = {'name': 'B1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_single_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_non_existent_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 101})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_a_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_bucketlist_with_invalid_args(self):
        data = {'watahc': 'Gaa Too'}
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_non_existent_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 101})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_a_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 101})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BucketListViewNoAuthorizationTestCase(ApiHeaderWrongAuthorization):
    """
    Tests to confirm that users cannot access bucketlists that aren't theirs
    """

    fixtures = ['users', 'initial_data']

    def test_user_has_no_bucketlist(self):
        url = reverse_lazy('bucketlist-list')
        response = self.client.get(url)
        self.assertEqual(response.json()['results'], [])

    def test_user_can_not_read_anothers_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_not_update_anothers_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        data = {'name': 'Go sky diving'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_not_delete_anothers_bucketlist(self):
        url = reverse_lazy('bucketlist-detail', kwargs={'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
