'use strict';

(function () {
  var PINS_MAX_COUNT = 5;

  var similarListElement = document.querySelector('.map__pins');
  var housingTypeFilter = document.querySelector('#housing-type');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsCache = [];

  // функция отрисовки и изменения характеристик одного пина
  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    img.setAttribute('src', pin.author.avatar);
    img.setAttribute('alt', 'Заголовок объявления');
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    return pinElement;
  };

  // функция очистки пинов с карты, при добавлении нового объявления
  var clearPins = function () {
    var mapPins = document.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  // функция отрисовки необходимого количества пинов
  var getRenderedPins = function (pins, count) {
    return pins.slice(0, count); // режем первые N
  };

  // функция фильтрации по типам жилья
  var filterByHousingType = function () {
    var pins = pinsCache.slice(0); // копируем массив
    var type = housingTypeFilter.value; // берем значение фильтра

    if ((type && type === 'any') || !type) { // проверяем если выбрано все
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.type === type;
    }); // если нет фильтруем по типу
  };


  // функция отрисовки пинов на карте
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var filteredPins = filterByHousingType(); // Фильтруем все пины по типу

    console.log('фильтр по типу: ' + filteredPins);

    var pins = getRenderedPins(filteredPins, PINS_MAX_COUNT); // берем первые 5

    console.log('Первые 5: ' + pins);

    pins.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });

    clearPins();
    similarListElement.appendChild(fragment);
  };

  housingTypeFilter.addEventListener('change', renderPins); // то же самое при изменении значения фильтра

  window.pin = {
    onRender: function (array) {
      pinsCache = array; // сохраняем полученные с сервера пины в переменную
      renderPins(); // рендерим
      console.log(pinsCache);
    },
    clearPin: clearPins,
  };
})();
