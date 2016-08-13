from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from frontend.views import BucketlistAppView, \
    UserLoginView, UserLogoutView, UserRegistrationView

urlpatterns = format_suffix_patterns([
    # pattern maps to view handling `GET` requests to /
    url(r'^$',
        BucketlistAppView.as_view(),
        name='bucketlists'),

    # pattern maps to view handling `GET` & `POST` requests to
    # /register/
    url(r'^register/$',
        UserRegistrationView.as_view(),
        name='register'),

    # pattern maps to view handling `GET` & `POST` requests to
    # /login/
    url(r'^login/$',
        UserLoginView.as_view(),
        name='login'),

    # pattern maps to view handling `GET` requests to
    # /logout/
    url(r'^logout/$',
        UserLogoutView.as_view(),
        name='logout'),
])
