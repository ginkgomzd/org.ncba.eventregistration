cj(function($) {
  // by default, hide the following fields, identified by the field name (e.g.,
  // <input name="xyz">)
  var hiddenByDefault = [
    'discountcode',
    'price_2',
//    'price_103\\[457\\]',
//    'price_103\\[458\\]',
//    'price_103\\[459\\]'
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
//    {
//      name:'price_94',
//      value:'425', // Passport
//      dependents:['price_97', 'price_98']
//    },
    {
      name:'discountcode',
      value:'',
      dependents:[]
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
    alert(fieldName);
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