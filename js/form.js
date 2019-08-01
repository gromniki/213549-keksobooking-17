'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mainFormFilters = document.querySelector('.map__filters-container');
  // var housingTypeFilter = mainFormFilters.querySelector('#housing-type');
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
  var room = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var resetBtn = adForm.querySelector('button[type=reset]');

  // При изменении поля select, изменять значение плэйсхолдера в поле price
  // в соответствии с типом жилья
  var onTypesChange = function () {
    var valueType = types.value;
    price.setAttribute('placeholder', window.data.MIN_PRICES[valueType]);
    price.setAttribute('min', window.data.MIN_PRICES[valueType]);
  };

  onTypesChange(); // если пользователь не меняет значение полей

  types.addEventListener('change', onTypesChange);

  // Синхронизация времени заезда и выезда
  var onTimeChange = function (evt) {
    var select = evt.target === timeIn ? timeOut : timeIn;
    select.value = evt.target.value;
  };

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  // Вывод сообщений о выборе комнат в соответствии с количеством гостей
  var getValidityMessageCapacity = function () {
    var validityText = '';

    if (room.value !== 100) {
      validityText = (capacity.value !== 0 && capacity.value <= room.value) ? '' : 'Укажите количество мест отличное от 0, но не более ' + room.value;
    } else {
      validityText = (capacity.value !== 0) ? 'Для выбранного количества комнат возможное количество гостей - 0' : '';
    }

    capacity.setCustomValidity(validityText);
  };

  getValidityMessageCapacity(); // если пользователь не меняет значение полей

  // Вывод сообщений о выборе комнат в соответствии с количеством гостей при изменении полей
  room.addEventListener('change', getValidityMessageCapacity);
  capacity.addEventListener('change', getValidityMessageCapacity);


  // var resetForm = function (evt) {
  //
  // };

  window.form = {
    adForm: adForm,
    mapFilters: mapFilters,
    fieldsetsForm: fieldsetsForm,
    fieldAddress: fieldAddress,
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

  // коллбэк-функция очистки формы
  var onResetForm = function () {
    adForm.reset(); // очистка всех полей формы
    window.pin.clearPin(); // очистка всех меток с карты
    window.card.removeCard(); // удаление открытой карточки объявления
    window.image.clearAvatar(); // очистка загруженной аватарки
    window.map.setDeactivatePage(); // перевод страницы в неактивное состояние
    window.map.movePinToOriginal(); // главный маркер на центр


  };

  resetBtn.addEventListener('click', onResetForm);
})();
