from rest_framework import permissions

from .models import BucketList


class IsOwner(permissions.BasePermission):
    """
    Permission only allow owners of an object access to
    read, edit and delete it.
    Assumes the model instance has an `owner` attribute
    """
    def has_object_permission(self, request, view, obj):
        # only owners of an object are allowed access
        return obj.owner == request.user


class IsParentId(permissions.BasePermission):
    """
    Permission does not permit access to bucketlist item via
    bucketlists IDs that aren't owned by the current user
    """
    def has_permission(self, request, view):
        owner = BucketList.objects.get(pk=view.kwargs['bucketlist']).owner
        return request.user == owner
