$(document).ready(function (){
  $('.inputGhost').on('change', function() {
    $("input[type=submit]").prop('disabled', $(this).val().length > 0);
  });
});
