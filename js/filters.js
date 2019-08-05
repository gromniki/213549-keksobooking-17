'use strict';

(function () {
  var mainFormFilters = document.querySelector('.map__filters-container');
  var mapFilters = document.querySelector('.map__filters');
  var typeFilter = mainFormFilters.querySelector('#housing-type');
  var pricesFilter = mainFormFilters.querySelector('#housing-price');
  var roomsFilter = mainFormFilters.querySelector('#housing-rooms');
  var guestsFilter = mainFormFilters.querySelector('#housing-guests');

  // фильтры удобств
  var wifi = mainFormFilters.querySelector('#filter-wifi');
  var dishwasher = mainFormFilters.querySelector('#filter-dishwasher');
  var parking = mainFormFilters.querySelector('#filter-parking');
  var washer = mainFormFilters.querySelector('#filter-washer');
  var elevator = mainFormFilters.querySelector('#filter-elevator');
  var conditioner = mainFormFilters.querySelector('#filter-conditioner');

  // сохраняем текущее значение выбранного фильтра
  var selectedTypeValue = typeFilter.value;
  var selectedPriceValue = pricesFilter.value;
  var selectedRoomValue = roomsFilter.value;
  var selectedGuestValue = guestsFilter.value;
  var defaultValue = 'any'; // значение фильтра не выбрано

  // массив для хранения отфильтрованного списка объявлений
  var filteredData = [];

  // функция отрисовки отфильтрованных объявлений
  var updateAdsList = function () {
    // window.pin.onRender();
    window.pin.onRender(filteredData.slice(0, window.pin.pinsMaxCount));
  };

  // console.log(updateAdsList());

  // Сохраняем в объект зависимости выбранного фильтра и функции, изменяющей соответствующую переменную
  var nameSelectedValue = {
    'housing-type': function (val) {
      selectedTypeValue = val;
    },
    'housing-price': function (val) {
      selectedPriceValue = val;
    },
    'housing-rooms': function (val) {
      selectedRoomValue = val;
    },
    'housing-guests': function (val) {
      selectedGuestValue = val;
    }

  };

  // Переводим значения фильтра "стоимость" в цифру
  var priceNumber = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': 50000
  };

  // функция сравнения типа жилья
  var checkTypeValue = function (it) {
    return (selectedTypeValue === defaultValue) || (it.offer.type === selectedTypeValue);
  };

  // функция сравнения стоимости жилья
  var checkPriceValue = function (it) {
    if (selectedPriceValue === defaultValue) {
      return true;
    } else if (selectedPriceValue === 'high') {
      return it.offer.price >= priceNumber[selectedPriceValue];
    }
    return it.offer.price >= priceNumber[selectedPriceValue].min
      && it.offer.price < priceNumber[selectedPriceValue].max;
  };

  // функция сравнения количества комнат
  var checkRoomValue = function (it) {
    return (selectedRoomValue === defaultValue) || (it.offer.rooms.toString() === selectedRoomValue);
  };

  // функция сравнения количества гостей
  var checkGuestValue = function (it) {
    return (selectedGuestValue === defaultValue) || (it.offer.guests.toString() === selectedGuestValue);
  };

  // функция, которая проверяет выбранные удобства
  var checkFeatures = function (input, it) {
    return (!input.checked) || (it.offer.features.indexOf(input.value) !== -1);
  };

  // функция, которая объединяет все предыдущие
  var checkTotal = function (it) {
    return checkTypeValue(it) &&
      checkPriceValue(it) &&
      checkRoomValue(it) &&
      checkGuestValue(it) &&
      checkFeatures(wifi, it) &&
      checkFeatures(dishwasher, it) &&
      checkFeatures(parking, it) &&
      checkFeatures(washer, it) &&
      checkFeatures(elevator, it) &&
      checkFeatures(conditioner, it);
  };


  // добавим обработчик события change на всю форму,
  // а выбранный фильтр будем отслеживать по evt.target
  mapFilters.addEventListener('change', function (evt) {
    // удалим карточку объявления
    window.card.removeCard();

    if (evt.target.name !== 'features') {
      // запишем значение выбранного фильтра в соответствующую переменную
      nameSelectedValue[evt.target.name](evt.target.value);
    }

    // отфильтруем данные
    filteredData = filteredData.filter(function (ad) {
      return checkTotal(ad);
    });

    console.log(filteredData);

    // запустим отрисовку отфильтрованных меток
    window.debounce(updateAdsList);

    console.log(updateAdsList());
  });

  // window.filters = {};
})();
