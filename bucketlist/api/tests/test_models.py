from django.contrib.auth.models import User
from django.test import TestCase

from api.models import BucketList, BucketListItem


class UserModelTestCase(TestCase):
    """Tests User model"""
    def test_user_model(self):
        user = User.objects.create(username='rikky', password='marryam')
        self.assertEqual(str(user), 'rikky')


class BucketListModelTestCase(TestCase):
    """Tests for the BucketList model"""
    def setUp(self):
        user = User.objects.create(username='rikky', password='marryam')
        BucketList.objects.create(name='B1', owner=user)

    def test_bucketlist_model(self):
        user = User.objects.get(username='rikky')
        bucketlist = BucketList.objects.get(id=1)
        self.assertEqual(str(bucketlist), 'B1')
        self.assertEqual(bucketlist.id, 1)
        self.assertEqual(bucketlist.owner, user)
        self.assertEqual(BucketList.objects.count(), 1)


class BucketListItemModelTestCase(TestCase):
    """Tests for the BucketList Item model"""
    def setUp(self):
        user = User.objects.create(username='rikky', password='marryam')
        bucketlist = BucketList.objects.create(name='B1', owner=user)
        BucketListItem.objects.create(name='Visit Vietnam',
                                      bucketlist=bucketlist)

    def test_bucketlist_item_model(self):
        bucketlist = BucketList.objects.get(id=1)
        item = BucketListItem.objects.get(id=1)
        self.assertEqual(str(item), 'Visit Vietnam')
        self.assertEqual(item.id, 1)
        self.assertEqual(item.bucketlist, bucketlist)
        self.assertEqual(BucketListItem.objects.count(), 1)
