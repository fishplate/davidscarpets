/* Honey Trap */
$(document).ready(function (){
  $('.inputGhost').on('change', function() {
    $("input[type=submit]").prop('disabled', $(this).val().length > 0);
  });

/* Fadeout Flash Notice */
  setTimeout(function() {
    $('#flash').fadeOut('slow');}, 3000
  );
});



$(document).ready(function (){
    validate();
    $('#inputName, #inputEmail, #inputTel').change(validate);
});

function validate(){
    if ($('#inputName').val().length   >   0   &&
        $('#inputEmail').val().length  >   0   &&
        $('#inputTel').val().length    >   0) {
        $("input[type=submit]").prop("disabled", false);
    }
    else {
        $("input[type=submit]").prop("disabled", true);
    }
}

