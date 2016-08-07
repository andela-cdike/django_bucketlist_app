from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from frontend.views import BucketlistAppView, \
    UserLoginView, UserRegistrationView

urlpatterns = format_suffix_patterns([
    url(r'^register/$',
        UserRegistrationView.as_view(),
        name='register'),
    url(r'^login/$',
        UserLoginView.as_view(),
        name='login'),
    url(r'^$',
        BucketlistAppView.as_view(),
        name='bucketlists'),
])
