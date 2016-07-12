from django.conf.urls import url
from rest_framework.authtoken import views as authtoken_views
from rest_framework.urlpatterns import format_suffix_patterns

from api import views


urlpatterns = format_suffix_patterns([
    url(r'^auth/register$',
        views.UserList.as_view(),
        name='user-register'),
    url(r'^auth/login/',
        authtoken_views.obtain_auth_token,
        name='user-login'),
    url(r'^users/(?P<pk>[0-9]+)/$',
        views.UserDetail.as_view(),
        name='user-detail'),
    url(r'^bucketlists/$',
        views.BucketListAll.as_view(),
        name='bucketlist-list'),
    url(r'^bucketlists/(?P<pk>[0-9]+)$',
        views.BucketListDetail.as_view(),
        name='bucketlist-detail'),
    url(r'^bucketlists/(?P<bucketlist>[0-9]+)/items/$',
        views.BucketListItemAll.as_view(),
        name='item-list'),
    url(r'^bucketlists/(?P<bucketlist>[0-9]+)/items/'
        '(?P<pk>[0-9]+)$', views.BucketListItemDetail.as_view(),
        name='item-detail'),
])
