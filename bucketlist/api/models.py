from __future__ import unicode_literals

from django.db import models


class Base(models.Model):
    """Base model for the database"""
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BucketList(Base):
    """Bucket list table"""
    name = models.CharField(max_length=50)
    owner = models.ForeignKey('auth.User', related_name='bucketlists')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class BucketListItem(Base):
    """Bucket list item table"""
    name = models.CharField(max_length=150)
    done = models.BooleanField(default=False)
    bucketlist = models.ForeignKey(
        'BucketList',
        related_name='items', on_delete=models.CASCADE,)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('name',)
