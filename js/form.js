'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelectorAll('.map__filter');
  var fieldsetsForm = document.querySelectorAll('fieldset');
  var fieldAddress = document.querySelector('#address');
  var types = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  // При изменении поля select, изменять значение плэйсхолдера в поле price
  // в соответствии с типом жилья
  types.addEventListener('change', function () {
    var valueType = types.value;
    price.setAttribute('placeholder', window.data.MIN_PRICES[valueType]);
    price.setAttribute('min', window.data.MIN_PRICES[valueType]);
  });

  var onTimeChange = function (evt) {
    var select = evt.target === timeIn ? timeOut : timeIn;
    select.value = evt.target.value;
  };

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  // var setDisabled = function (array, isDisabled) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (isDisabled) {
  //       array[i].removeAttribute('disabled', '');
  //     } else {
  //       array[i].setAttribute('disabled', '');
  //     }
  //   }
  //
  //   return array;
  // };
  //
  // var setAddressValue = function (width, height) {
  //   var topMainPin = parseInt(mainPin.style.top, 10) + height;
  //   var leftMainPin = parseInt(mainPin.style.left, 10) + width;
  //
  //   fieldAddress.value = leftMainPin + ', ' + topMainPin;
  // };

  window.form = {
    mapFilters: mapFilters,
    fieldsetsForm: fieldsetsForm,
    setDisabled: function (array, isDisabled) {
      for (var i = 0; i < array.length; i++) {
        if (isDisabled) {
          array[i].removeAttribute('disabled', '');
        } else {
          array[i].setAttribute('disabled', '');
        }
      }

      return array;
    },
    setAddressValue: function (width, height) {
      var topMainPin = parseInt(mainPin.style.top, 10) + height;
      var leftMainPin = parseInt(mainPin.style.left, 10) + width;

      fieldAddress.value = leftMainPin + ', ' + topMainPin;
    }
  };

  console.log('init form');
})();
