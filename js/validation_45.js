cj(function($) {

  var priceFields =  {
    EARLYREG: 'price_53',
    FULLREG: 'price_54',
    MON: 'price_44_186',
    TUES: 'price_45_187',
    WED: 'price_46_188',
    RECEPTION: 'price_47_189',
  };

  $('form#Register').submit(function(ev) {
    if (!verifyMinimumSelection()) {
console.log('warn');
      ev.preventDefault();
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


