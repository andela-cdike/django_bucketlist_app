"""
Production specific settings for the django bucketlist project
"""

import os

import dj_database_url

from .base import *

APPLICATION_DIR = os.path.dirname(globals()['__file__'])
print "HELLO %s" % os.getenv('SECRET_KEY')
DATABASES = {
    'default': dj_database_url.config()
}

# Enable Connection Pooling
DATABASES['default']['ENGINE'] = 'django_postgrespool'


BOWER_COMPONENTS_ROOT = os.path.join(
    APPLICATION_DIR, '..', '..', 'frontend', 'static'
)

BOWER_PATH = 'app/node_modules/bower'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = ['*']

# Setting for webpack_loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/local/',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack-stats-prod.json'),
    }
}
