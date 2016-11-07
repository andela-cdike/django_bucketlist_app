from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from api import views


urlpatterns = format_suffix_patterns([
    # swagger documentation url
    url(r'^docs/', include('rest_framework_swagger.urls')),

    # login and register url
    url(r'^auth/register$',
        views.UserList.as_view(),
        name='user-register'),
    # url(r'^auth/login/',
    #     authtoken_views.obtain_auth_token,
    #     name='user-login'),
    url(r'^auth/login', obtain_jwt_token, name='user-login'),
    url(r'^auth/api-token-refresh/', refresh_jwt_token),
    url(r'^users/(?P<pk>[0-9]+)/$',
        views.UserDetail.as_view(),
        name='user-detail'),

    # bucketlist related urls
    url(r'^bucketlists/$',
        views.BucketListAll.as_view(),
        name='bucketlist-list'),
    url(r'^bucketlists/(?P<pk>[0-9]+)$',
        views.BucketListDetail.as_view(),
        name='bucketlist-detail'),

    # bucketlist item related urls
    url(r'^bucketlists/(?P<bucketlist>[0-9]+)/items/$',
        views.BucketListItemAll.as_view(),
        name='item-list'),
    url(r'^bucketlists/(?P<bucketlist>[0-9]+)/items/'
        '(?P<pk>[0-9]+)$', views.BucketListItemDetail.as_view(),
        name='item-detail'),
])
