cj(function($) {

  var fieldMap = {
          CDFYESNO: 'custom_28',
          DISCOUNT: 'discountcode',
          EARLYREG: 'price_56',
          FULLREG: 'price_57',
          THURS: 'price_41\\[183\\]',
          FRI: 'price_42\\[184\\]',
          SAT: 'price_43\\[185\\]',
          YOUNGPROF: 'price_48\\[190\\]',
          TOUR: 'price_49\\[191\\]',
          OPENPARTY: 'price_50\\[192\\]',
          AWRDLUNCH: 'price_51\\[193\\]',
          BLOCKPARTY: 'price_52\\[194\\]',
        };

  // by default, hide the following fields, identified by the field _NAME_ (e.g.,
  // <input name="xyz">)
  var hiddenByDefault = [
    // always hide discount code and the "I am ..attending CDF..." only applies to Annual Confer.
    fieldMap.DISCOUNT, fieldMap.CDFYESNO,
    //hide the special events:
    fieldMap.YOUNGPROF, fieldMap.TOUR, fieldMap.OPENPARTY, fieldMap.AWRDLUNCH, fieldMap.BLOCKPARTY,
//    'price_xx\\[xx\\]',
  ];

  /*
   * We use an array of objects to define our show/hide rules, to make it easier
   * to manage these. Each object has the following structure:
   *
   * {
   *   name:'custom_77',
   *   value:'1',
   *   dependents:['custom_82', 'custom_99']
   * }
   *
   * This means, "If the field with the name custom_77 has a value of 1,
   * then show the fields with the names custom_82 and custom_99."
   *
   * TODO: The value property should be an array of values (like dependents)
   * rather than a single value to reduce repetition in declaring rules. At
   * minimum this would require changes to showHideObj's toggle method. This
   * should be straightforward except for the case of advanced multiselects.
   */
  var showHideRules = [
    {
      name: fieldMap.EARLYREG,
      value:'',
      dependents:[fieldMap.THURS, fieldMap.FRI, fieldMap.SAT]
    },
    {
      name: fieldMap.FULLREG,
      value:'',
      dependents:[fieldMap.THURS, fieldMap.FRI, fieldMap.SAT]
    },
    {
      name: fieldMap.THURS,
      value:'1',
      dependents:[fieldMap.AWRDLUNCH, fieldMap.BLOCKPARTY]
    },
    {
      name: fieldMap.FRI,
      value:'1',
      dependents:[fieldMap.YOUNGPROF, fieldMap.TOUR, fieldMap.OPENPARTY, fieldMap.AWRDLUNCH, fieldMap.BLOCKPARTY]
    },
    {
      name: fieldMap.SAT,
      value:'1',
      dependents:[fieldMap.YOUNGPROF, fieldMap.TOUR, fieldMap.OPENPARTY]
    }
  ];

  // a quick bit of styling
  $('div#priceset .crm-section').css('margin-bottom', '10px');
  $('div#priceset .crm-section').css('padding-bottom', '10px');
  $('div#priceset .crm-section').not('#pricesetTotal').css('border-bottom', '1px solid #e4e7f2');

  ////////////////////////////////////////////////
  // you shouldn't need to edit below this line //
  ////////////////////////////////////////////////

  // hide dependent fields by default
  $.each(hiddenByDefault, function(index, fieldName) {
    setFieldDisplay(fieldName, 0);
  });

  // parse show/hide rules
  var showHideObjArr = {};
  $.each(showHideRules, function(index, obj) {
    // register triggers for each dependent
    $.each(obj.dependents, function(i, dependentName) {
      if (!showHideObjArr.hasOwnProperty(dependentName)) {
        showHideObjArr[dependentName] = new showHideObj(dependentName);
      }
      showHideObjArr[dependentName].registerTrigger(obj.name, obj.value);
    });

    // wire up the fields that trigger the show/hide behavior
    var el = $('[name="' + obj.name + '"]');

    // special case for advanced multiselects
    if(el.is('select[multiple=multiple]')) {
      el.bind('DOMNodeInserted', function(){
        $.each(obj.dependents, function(i, dep) {
          showHideObjArr[dep].toggle();
        });
      });
      el.bind('DOMNodeRemoved', function(e){
        var removedEl = e.target;
        $.each(obj.dependents, function(i, dep) {
          showHideObjArr[dep].toggle($(removedEl).attr('value'));
        });
      });
    } else {
      el.change(function() {
        $.each(obj.dependents, function(i, dep) {
          showHideObjArr[dep].toggle();
        });
      });
    }
  });

  function setFieldDisplay(name, t) {
    var el = $('[name="' + name + '"]').first().closest('.crm-section');
    if (name === 'discountcode') { //CiviDiscount Exception... grr
      el = $('[name="' + name + '"]').first().closest('table');
    }

    if (t === 1) {
      el.show();
    } else {
      el.hide();
    }
  }
});