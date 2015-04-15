cj(function($) {

  var priceFields =  {
    EARLYREG: 'price_56',
    FULLREG: 'price_57',
    THURS: 'price_41\\[183\\]',
    FRI: 'price_42\\[184\\]',
    SAT: 'price_43\\[185\\]',
  };

  //testing:
  priceFields = {

  }

  var btnSubmit = $('#crm-submit-buttons .form-submit');

  btnSubmit.click(function(ev) {
    ev.preventDefault();

    if (verifyMinimumSelection()) {
      $('form').submit();
    } else {
      warnMinimumSelection();
    }
  });
  
});

function verifyMinimumSelection() {
  console.log('verifyMinimumSelection');
  return true;
}

function warnMinimumSelection() {
  CRM.confirm({}, {
      title: 'Error',
      message: 'You must select either a full registration or a single-day registration.'},
     'ok');
}

