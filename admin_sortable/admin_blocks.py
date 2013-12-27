from django.conf import settings
import django_admin_blocks


django_admin_blocks.register({
    'script_blocks': [
        '<script src="%sjs/admin_sortable/jquery-ui-1.10.3.custom.min.js"></script>' % settings.STATIC_URL,
        '<script src="%sjs/admin_sortable/admin_sortable.js"></script>' % settings.STATIC_URL,
    ],
    })
