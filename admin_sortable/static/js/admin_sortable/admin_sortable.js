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

function sortable_inlines() {
    var $target_inlines = $('div.tabular.inline-related .module table').filter(
        function(index) {//only convert the inlines that has an "order" field.
            return $('td.field-order', this).length > 0;
        })
    $target_inlines.sortable({
        items: 'tr.has_original',
        handle: 'td',
        helper: 'clone',
        update: function() {
            // Renumber all hidden 'order' fields to reflect new ordering
            $(this).find('tr.has_original').each(function(i) {
                // TODO This doesn't allow ordering of unsaved inlines
                // Need to include all rows
                // And only add 'order' val to non-empty ones.
                //if ($(this).find('input[class$=vIntegerField]').val()) {
                    $(this).find('input[id$=field-order]').val(i+1);
                    $(this).find('input[id$=order]').val(i+1);
                //}
            });
        },
        // fix for #33, if you re-order by drag and drop all text is lost
        // see also http://tinymce.moxiecode.com/punbb/viewtopic.php?id=17074
        start: sortable_start_hook,
        stop: sortable_stop_hook
    });
    // Change the cursor
    $target_inlines.find('td')
        .css('cursor', 'move')
    $target_inlines.each(function(index){
        //Which column number is 'Order'
        // hide the 'Order' TH and all the TDs
        $(this).find('td.field-order').hide();
        $(this).find('th').filter(function(){ return $(this).text().indexOf("Order") != -1 }).hide();
        //Add a gripper on the left edge to indicate 'dragability' TODO this needs improving visually
        $(this).find('tbody tr.has_original td:first-child')
            .css('padding-left', '25px')
            /* TODO Don't hardcode static dir */
            .css('background-image', 'url(/static/images/admin_sortable/gripper.png)')
            .css('background-repeat','no-repeat')
            .css('background-position','left center')
            .attr('title', 'Drag up and down to re-order these items');
        $(this).find('tbody td:first-child p').css('padding-left','30px');
    })
}


function sortable_stacked_inlines() {
    var $target_inlines = $('div.page-inlines').filter(
        function(index) {//only convert the inlines that has an "order" field.
            return $('div.field-order', this).length > 0;
        })
    $target_inlines.sortable({
        items: 'div.inline-related',
        handle: 'h3',
        helper: 'clone',
        update: function() {
            // Renumber all hidden 'order' fields to reflect new ordering
            $(this).find('div.inline-related').each(function(i) {
                // TODO This doesn't allow ordering of unsaved inlines
                // Need to include all rows
                // And only add 'order' val to non-empty ones.
                //if ($(this).find('input[class$=vIntegerField]').val()) {
                    $(this).find('input[id$=field-order]').val(i+1);
                    $(this).find('input[id$=order]').val(i+1);
                //}
            });
        },
        // fix for #33, if you re-order by drag and drop all text is lost
        // see also http://tinymce.moxiecode.com/punbb/viewtopic.php?id=17074
        start: sortable_start_hook,
        stop: sortable_stop_hook
    });
    // Change the cursor
    $target_inlines.find('h3')
        .css('cursor', 'move')
    $target_inlines.each(function(index){
        //hide 'Order' and hide it field.  
        $(this).find('div.field-order').hide();
        //Add a gripper on the left edge to indicate 'dragability' TODO this needs improving visually
        $(this).find('div.inline-related h3:first-child')
            .css('padding-left', '25px')
            /* TODO Don't hardcode static dir */
            .css('background-image', 'url(/static/images/gripper.png)')
            .css('background-repeat','no-repeat')
            .css('background-position','left center')
            .attr('title', 'Drag up and down to re-order these items');
        $(this).find('div:first-child p').css('padding-left','30px');
    })
}

$(document).ready(function () {
    if ($('body').hasClass('change-form')) {
        // If there's an inline with an 'order' column then make it sortable
        if ($('div.tabular.inline-related .module table input[id$=order]').length) {
            sortable_inlines();
        }
        if ($('div.inline-related input[id$=order]').length) {
            sortable_stacked_inlines();
        }
    }
});