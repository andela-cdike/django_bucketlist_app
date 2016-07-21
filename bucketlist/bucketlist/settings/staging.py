from .base import *


# Setting for webpack_loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/local/',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack-stats-prod.json'),
    }
}
