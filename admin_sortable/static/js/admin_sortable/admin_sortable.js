($ || django.jQuery)(function($) {
    
    function sortable_start_hook(event, ui){
        if(typeof mce_elements != "undefined"){
            $(ui.item).find(mce_elements).each(function(i) {
                tinyMCE.execCommand("mceRemoveControl",true,this.id);
            });
        }
    }
    
    function sortable_stop_hook(event, ui){
        if(typeof mce_elements != "undefined"){
            $(ui.item).find(mce_elements).each(function(i) {
                tinyMCE.execCommand("mceAddControl",false,this.id);
            });
        }
    }
    
    function sortableTabular() {
    
        var targetInlines = sortableInlines({
            sortableSelector: 'div.tabular.inline-related .module table',
            orderFieldSelector: 'td.field-order',
            itemSelector: 'tr.has_original',
            handleSelector: 'td',
            instanceSelector: 'tr.has_original',
            cssClass: 'sortableStacked',
        });
        
        hideOrderColumns(targetInlines);
        
    }
    
    function hideOrderColumns(targetInlines) {
        targetInlines.each(function(index){
            // Which column number is 'Order' hide the 'Order' TH and all the TDs
            // TODO allow the name of this field to be configurable
            $(this).find('td.field-order').hide();
            $(this).find('th').filter(function(){ return $(this).text().indexOf("Order") != -1 }).hide();
            // Add a gripper on the left edge to indicate 'dragability' TODO this needs improving visually
            $(this)
                .find('tbody tr.has_original td:first-child')
                .attr('title', 'Drag up and down to re-order these items');
        })
    }
    
    function sortableStacked() {
        
        var targetInlines = sortableInlines({
            sortableSelector: 'div.page-inlines',
            orderFieldSelector: 'div.field-order',
            itemSelector: 'div.inline-related',
            handleSelector: 'h3',
            instanceSelector: 'div.inline-related',
            cssClass: 'sortableTabular',
        });
    
    }
    
    function sortableInlines(params) {
    
        var targetInlines = $(params.sortableSelector).filter(
            function(index) { // Only convert the inlines that has an "order" field.
                return $(params.orderFieldSelector, this).length > 0;
            });
        targetInlines
            .sortable({
                items: params.itemSelector,
                handle: params.handleSelector,
                helper: 'clone',
                update: function() {
                    // Renumber all hidden 'order' fields to reflect new ordering
                    $(this).find(params.instanceSelector).each(function(i) {
                        // TODO This doesn't allow ordering of unsaved inlines
                        // Need to include all rows
                        // and only add 'order' val to non-empty ones.
                        // if ($(this).find('input[class$=vIntegerField]').val()) {
                            $(this).find('input[id$=field-order]').val(i+1);
                            $(this).find('input[id$=order]').val(i+1);
                        //}
                    });
                },
                // fix for #33, if you re-order by drag and drop all text is lost
                // see also http://tinymce.moxiecode.com/punbb/viewtopic.php?id=17074
                start: sortable_start_hook,
                stop: sortable_stop_hook
            })
        .addClass(params.cssClass);
        
        return targetInlines;
    }
    
    $(document).ready(function () {
        
        if ($('body').hasClass('change-form')) {
            
            // If there's an inline with an 'order' column then make it sortable
            if ($('div.tabular.inline-related .module table input[id$=order]').length) {
                sortableTabular();
            }
            if ($('div.inline-related input[id$=order]').length) {
                sortableStacked();
            }
        }
    });
})