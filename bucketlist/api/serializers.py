from django.contrib.auth.models import User
from rest_framework import serializers

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


class BaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Base


class BucketListItemSerializer(BaseSerializer):
    bucketlist = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = BucketListItem
        fields = ('id', 'name', 'done', 'bucketlist', 'date_created',
                  'date_modified',)


class BucketListSerializer(BaseSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    items = BucketListItemSerializer(many=True, read_only=True)

    class Meta:
        model = BucketList
        fields = ('id', 'name', 'date_created', 'date_modified', 'items',
                  'owner')
