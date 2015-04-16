cj(function($) {

  var priceFields =  {
    EARLYREG: 'price_56',
    FULLREG: 'price_57',
    THURS: 'price_41_183',
    FRI: 'price_42_184',
    SAT: 'price_43_185',
  };

 var btnSubmit = $('#crm-submit-buttons .form-submit');

  btnSubmit.click(function(ev) {
    ev.preventDefault();

    if (verifyMinimumSelection()) {
console.log('verified');
      $('form#Register').submit();
    } else {
console.log('warn');
      warnMinimumSelection();
    }
  });
  

function verifyMinimumSelection() {
  var anySelection = false;
  $.each(priceFields, function(index, item) {
    $el = $('#'+item);
   if (
      $el.length > 0  
      && (
      $el.is('select') && $el.val() !== ''
      || ($el.is('[type=radio]') || $el.is('[type=checkbox]'))
        && $el.is(':checked')
      )
    ) {
      anySelection = true;
    }
  });
  return anySelection;
} 

function warnMinimumSelection() {
  CRM.confirm({}, {
      title: 'Error',
      message: 'You must select either a full registration or a single-day registration.'},
     'ok');
}

});

