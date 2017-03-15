
$(function () {
    'use strict';
    var picker = $(".datePicker input").datepicker();

    $(".datePicker").on('click',function(e){
        e.stopPropagation();
        picker.datepicker('show');

        console.log('click');
        return false;
    });

   $('[data-toggle="popover"]').popover({
        html : true,
        content: function(context) {
            return $('.popover-content').html();
        }
    }); 
})