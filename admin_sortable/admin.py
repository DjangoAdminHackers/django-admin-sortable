class InlineSortable(admin.ModelAdmin):
    
    class Media:
        js = (
            'js/admin_sortable/jquery-ui-1.10.3.custom.min.js',
            'js/admin_sortable/admin_sortable.js',
        )
        css = {
            'all': ['css/admin_sortable/admin_sortable.css',],
        }
