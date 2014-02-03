from django.conf import settings
import django_admin_blocks


django_admin_blocks.register({
    'script_blocks': [
        {'url_path': 'js/admin_sortable/jquery-ui-1.10.3.custom.min.js'},
        {'url_path': 'js/admin_sortable/admin_sortable.js'},
    ],
})
