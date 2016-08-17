from .base import *


# Setting for webpack_loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/stage/',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack-stats-stage.json'),
    }
}
