
import os
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "artmall.settings")


# from django.core.handlers.wsgi import WSGIHandler
# application = WSGIHandler()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
