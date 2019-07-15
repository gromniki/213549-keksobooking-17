'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mainFormFilters = document.querySelector('.map__filters');
  var typesFilter = mainFormFilters.querySelector('#housing-type');
  var pricesFilter = mainFormFilters.querySelector('#housing-price');
  var roomsFilter = mainFormFilters.querySelector('#housing-rooms');
  var guestsFilter = mainFormFilters.querySelector('#housing-guests');
  var featuresFilter = mainFormFilters.querySelector('#housing-features');
  var mapFilters = document.querySelectorAll('.map__filter');
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

  // Выводить на карту не более 5 меток. Установка фильтра по количеству должна происходить сразу после получения данных с сервера.
  // Запрограммировать фильтр «Тип жилья». Помните, независимо от того сколько объявлений соответствует фильтру «Тип жилья» на карте не должно отображаться больше пяти объявлений.
  typesFilter.addEventListener('change', function () {
    var valueType = typesFilter.value;
    console.log(valueType);
  });

  // var resetForm = function (evt) {
  //
  // };

  window.form = {
    adForm: adForm,
    mapFilters: mapFilters,
    fieldsetsForm: fieldsetsForm,
    setAddressValue: function (width, height) {
      var topMainPin = parseInt(window.map.mainPin.style.top, 10) + height;
      var leftMainPin = parseInt(window.map.mainPin.style.left, 10) + width;

      fieldAddress.value = leftMainPin + ', ' + topMainPin;
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      window.message.onSuccess();
      window.pin.clearPin();
    }, function () {
      window.message.onError();
    });
  });
})();
