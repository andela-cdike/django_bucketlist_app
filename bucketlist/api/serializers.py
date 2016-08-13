from django.contrib.auth.models import User
from rest_framework import serializers

from api.custom_pagination import StandardSetPagination
from api.models import Base, BucketList, BucketListItem


class UserSerializer(serializers.ModelSerializer):
    """Serialized representation of users"""
    # bucketlists = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=BucketList.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserDetailSerializer(serializers.ModelSerializer):
    """serialized representation of a user"""

    class Meta:
        model = User
        fields = ('username',)


class BaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Base


class BucketListItemSerializer(BaseSerializer):
    bucketlist = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = BucketListItem
        fields = ('id', 'name', 'done', 'bucketlist', 'date_created',
                  'date_modified',)


class BucketListAllSerializer(BaseSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # items = BucketListItemSerializer(many=True, read_only=True)
    items = serializers.SerializerMethodField('get_two_items')

    class Meta:
        model = BucketList
        fields = ('id', 'name', 'date_created', 'date_modified', 'items',
                  'owner')

    def get_two_items(self, obj):
        """Limit the number of items returned to two to serve as preview"""
        items = BucketListItem.objects.filter(bucketlist=obj). \
            order_by('date_created')
        serializer = BucketListItemSerializer(
            items[:2], many=True, context={'request': self.context['request']})
        return {
            'count': items.count(),
            'items': serializer.data
        }


class BucketListDetailSerializer(BaseSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # items = BucketListItemSerializer(many=True, read_only=True)
    items = serializers.SerializerMethodField('paginated_items')

    class Meta:
        model = BucketList
        fields = ('id', 'name', 'date_created', 'date_modified', 'items',
                  'owner')

    def paginated_items(self, obj):
        items = BucketListItem.objects.filter(bucketlist=obj)
        paginator = StandardSetPagination()
        page = paginator.paginate_queryset(items, self.context['request'])
        serializer = BucketListItemSerializer(
            page, many=True, context={'request': self.context['request']}
        )
        return {
            'count': items.count(),
            'items': serializer.data
        }
