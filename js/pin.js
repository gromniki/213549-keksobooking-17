'use strict';

(function () {
  var PINS_MAX_COUNT = 5;

  var similarListElement = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('#housing-type');
  var housingPriceFilter = mapFilters.querySelector('#housing-price');
  var housingRoomFilter = mapFilters.querySelector('#housing-rooms');
  var housingGuestFilter = mapFilters.querySelector('#housing-guests');
  var housingFeatureFilter = mapFilters.querySelector('#housing-features');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsCache = [];

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

  // функция отрисовки и изменения характеристик одного пина
  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    img.setAttribute('src', pin.author.avatar);
    img.setAttribute('alt', pin.offer.title);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.onRender(pin);
      pinElement.classList.add('map__pin--active');
    });

    return pinElement;
  };

  // функция очистки пинов с карты, при добавлении нового объявления
  var clearPins = function () {
    var mapPins = document.querySelector('.map__pins');
    window.util.removeNodeList(mapPins, '.map__pin:not(.map__pin--main)');
  };

  // функция отрисовки необходимого количества пинов
  var getRenderedPins = function (pins, count) {
    return pins.slice(0, count); // режем первые N
  };

  // функция фильтрации по типам жилья
  var filterByHousingType = function () {
    var pins = pinsCache.slice(0); // копируем массив
    var type = housingTypeFilter.value; // берем значение фильтра

    if ((type && type === 'any') || !type) { // проверяем, если выбрано всё, то возвращаем изначальный массив
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.type === type;
    }); // если нет, то фильтруем по типу
  };

  // функция фильтрации по цене
  var filterByHousingPrice = function () {
    var pins = filterByHousingType();
    var price = housingPriceFilter.value;

    if ((price && price === 'any') || !price) {
      return pins;
    }

    return pins.filter(function (pin) {
      if (price === 'high') {
        return pin.offer.price >= priceNumber[price];
      }

      return pin.offer.price >= priceNumber[price].min
        && pin.offer.price < priceNumber[price].max;
    });
  };

  // функция фильтрации по количеству комнат
  var filterByHousingRoom = function () {
    var pins = filterByHousingPrice();
    var room = housingRoomFilter.value;

    if ((room && room === 'any') || !room) {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.rooms === parseInt(room, 10);
    });
  };

  // функция фильтрации по количеству гостей
  var filterByHousingGuest = function () {
    var pins = filterByHousingRoom();
    var guest = housingGuestFilter.value;

    if ((guest && guest === 'any') || !guest) {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.guests === parseInt(guest, 10);
    });
  };


  // функция фильтрации по удобствам
  var filterByHousingFeature = function () {
    var pins = filterByHousingGuest();
    var activeFeatures = []; // массив для хранения выбранных удобств
    var features = housingFeatureFilter.querySelectorAll('input[name=features]');

    features.forEach(function (feature) {
      if (feature.checked) {
        activeFeatures.push(feature.value); // заносим в массив выбранные удобства
      }
    });

    var isContains = function (where, what) {
      for (var i = 0; i < what.length; i++) {
        if (where.indexOf(what[i]) === -1) {
          return false;
        }
      }

      return true;
    };

    return pins.filter(function (pin) {
      return isContains(pin.offer.features, activeFeatures);
    });
  };

  // функция отрисовки пинов на карте
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var filteredPins = filterByHousingFeature(); // Фильтруем все пины
    var pins = getRenderedPins(filteredPins, PINS_MAX_COUNT); // берем первые 5

    pins.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });

    clearPins();
    window.card.removeCard();
    similarListElement.appendChild(fragment);
  };

  mapFilters.addEventListener('change', renderPins); // обработчик всей формы с фильтрами

  window.pin = {
    onRender: function (array) {
      pinsCache = array; // сохраняем полученные с сервера пины в переменную
      window.debounce(renderPins()); // рендерим
    },
    clearPin: clearPins,
    mapPins: similarListElement,
  };
})();
