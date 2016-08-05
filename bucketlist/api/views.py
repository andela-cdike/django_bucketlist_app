from django.contrib.auth.models import User
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from api.custom_permissions import IsOwner, IsParentId
from api.custom_pagination import StandardSetPagination
from api.models import BucketList, BucketListItem
from api.serializers import BucketListAllSerializer, \
    BucketListDetailSerializer, BucketListItemSerializer, UserSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-register', request=request, format=format),
        'bucketlists': reverse('bucketlist-list', request=request,
                               format=format),
    })


class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field
    filtering.
    """
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)  # Lookup the object


class UserList(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BucketListAll(generics.ListCreateAPIView):
    """
    List all code snippets, or create a new bucketlist.
    """
    queryset = BucketList.objects.all()
    serializer_class = BucketListAllSerializer
    pagination_class = StandardSetPagination
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        """Queryset should only return bucketlists of logged in user"""
        search_str = self.request.query_params.get('q', None)
        authenticated_user = self.request.user

        if search_str is None:
            return BucketList.objects.filter(owner=authenticated_user)
        else:
            return BucketList.objects.filter(owner=authenticated_user,
                                             name__contains=search_str)

    def perform_create(self, serializer):
        """Include the owner information when saving a BucketList"""
        serializer.save(owner=self.request.user)


class BucketListDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a bucketlist instance.
    """
    queryset = BucketList.objects.all()
    serializer_class = BucketListDetailSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)


class BucketListItemAll(generics.ListCreateAPIView):
    """
    Create a new bucketlist item.
    """
    permission_classes = (permissions.IsAuthenticated, IsParentId)
    queryset = BucketListItem.objects.all()
    serializer_class = BucketListItemSerializer

    def perform_create(self, serializer):
        """Include the bucketlist id within BucketListItem object"""
        bucketlist_id = self.kwargs['bucketlist']
        try:
            bucketlist = BucketList.objects.get(pk=bucketlist_id)
        except BucketList.DoesNotExist:
            raise Http404("The Bucketlist ID provided does not exist")
        serializer.save(bucketlist=bucketlist)

    def get_queryset(self):
        """Limit items returned to those of a particular bucketlist"""
        bucketlist_id = self.kwargs['bucketlist']
        return BucketListItem.objects.filter(
            bucketlist=bucketlist_id,
            bucketlist__owner=self.request.user)


class BucketListItemDetail(MultipleFieldLookupMixin,
                           generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a bucketlist item instance.
    """
    queryset = BucketListItem.objects.all()
    serializer_class = BucketListItemSerializer
    lookup_fields = ('bucketlist', 'pk')
    permission_classes = (permissions.IsAuthenticated, IsParentId)
