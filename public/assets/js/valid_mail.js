// var $ for better adaptation and work with other libraries

$(function(){
  $(document).ready(function(){
     $(".help-inline").each(function() {
      $(this).css('display', 'none');
     });
  });
  $("#inputEmail").bind('blur', is_valid_email);
  $("#inputTel").bind('blur', is_valid_tel);
  $("#inputName").bind('blur', is_valid_name);
  $('#validForm').bind('submit', function() {
    return is_valid_form();
  });
});

//Tel Validate
function is_valid_tel() {
  $this = $("#inputTel");
  var pattern = new RegExp(/^\d{11}$/);
  if(pattern.test($this.val())){ // valid
    if ($this.closest(".control-group").hasClass("error"))
      $this.closest(".control-group").removeClass("error");
    $this.siblings(".help-inline").css("display", "none");
    return true;
  } else { // error
    if (!$this.closest(".control-group").hasClass("error"))
      $this.closest(".control-group").addClass("error");
    $this.siblings(".help-inline").css("display", "block");
    return false;
  }
}
// Email validate
function is_valid_email() {
  $this = $("#inputEmail");
  var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
  if(pattern.test($this.val())){ // valid
    if ($this.closest(".control-group").hasClass("error"))
      $this.closest(".control-group").removeClass("error");
    $this.siblings(".help-inline").css("display", "none");
    return true;
  } else { // error
    if (!$this.closest(".control-group").hasClass("error"))
      $this.closest(".control-group").addClass("error");
    $this.siblings(".help-inline").css("display", "block");
    return false;
  }
}
// Name validate
function is_valid_name() {
  $this = $("#inputName");
  if($this.val().length>0){ // valid
    if ($this.closest(".control-group").hasClass("error"))
      $this.closest(".control-group").removeClass("error");
    $this.siblings(".help-inline").css("display", "none");
    return true
  } else { // error
    if (!$this.closest(".control-group").hasClass("error"))
      $this.closest(".control-group").addClass("error");
    $this.siblings(".help-inline").css("display", "block");
    return false;
  }
}

// Form validate
function is_valid_form() {
  var ret = true;
  if (!is_valid_tel()) var ret = false;
  if (!is_valid_name()) var ret = false;
  if (!is_valid_email()) var ret = false;
  return ret;
}
