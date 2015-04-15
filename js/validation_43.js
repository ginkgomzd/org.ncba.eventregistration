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
    two: 'CIVICRM_QFID_3_4',
    one: 'CIVICRM_QFID_2_2',
    three: 'CIVICRM_QFID_4_6',
    select: 'price_3',
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
  

function verifyMinimumSelection() {
  var anySelection = false;
  $.each(priceFields, function(index, item) {
    $el = $('#'+item);
    if (
      $el.length > 0 && (
        $el.is(':selected') ||
        $el.is(':checked')  ||
        $el.val() !== ''
    )) {
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

