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
    var pins = getRenderedPins(filteredPins, PINS_MAX_COUNT); // берем первые 5

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
    },
    clearPin: clearPins,
    mapPins: similarListElement,
  };
})();
