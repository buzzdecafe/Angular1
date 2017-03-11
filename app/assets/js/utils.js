
$(function(){

    var picker = $(".datePicker input").datepicker();

    $(".datePicker").on('click',function(e){
        e.stopPropagation();
        picker.datepicker('show');

        console.log('click');
        return false;
    })

})