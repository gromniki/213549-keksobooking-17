'use strict';

var MAIN_PIN_WIDTH = 65 / 2;
var MAIN_PIN_HEIGHT = 65 / 2;

// var MAIN_PIN_WIDTH_MOVE = MAIN_PIN_WIDTH;
// var MAIN_PIN_HEIGHT_MOVE = 65 + 22;

var TYPES = [
  'Bungalo',
  'Flat',
  'House',
  'Palace'
];

var MIN_PRICES = {
  Bungalo: 0,
  Flat: 1000,
  House: 5000,
  Palace: 10000
};

var CONFIG = {
  width: {
    min: 0,
    max: 1200
  },
  height: {
    min: 130,
    max: 630
  }
};

var PINS_NUMBER = 8;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = map.querySelectorAll('.map__filter');
var fieldsetsForm = document.querySelectorAll('fieldset');
var fieldAddress = document.querySelector('#address');

var similarListElement = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var types = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

// При изменении поля select, изменять значение плэйсхолдера в поле price
// в соответствии с типом жилья
types.addEventListener('change', function () {
  var valueType = types.value;
  price.setAttribute('placeholder', MIN_PRICES[valueType]);
  price.setAttribute('min', MIN_PRICES[valueType]);
});

var onTimeChange = function (evt) {
  var select = evt.target === timeIn ? timeOut : timeIn;
  select.value = evt.target.value;
};

timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);

var setDisabled = function (array, isDisabled) {
  for (var i = 0; i < array.length; i++) {
    if (isDisabled) {
      array[i].removeAttribute('disabled', '');
    } else {
      array[i].setAttribute('disabled', '');
    }
  }

  return array;
};

var setAddressValue = function () {
  var topMainPin = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
  var leftMainPin = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH;

  fieldAddress.value = leftMainPin + ', ' + topMainPin;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var generatePinsData = function () {
  var pins = [];

  for (var i = 1; i <= PINS_NUMBER; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: getRandomElement(TYPES)
      },
      location: {
        x: getRandomNumber(CONFIG.width.min, CONFIG.width.max),
        y: getRandomNumber(CONFIG.height.min, CONFIG.height.max)
      }
    });
  }

  return pins;
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');

  img.setAttribute('src', pin.author.avatar);
  img.setAttribute('alt', 'Заголовок объявления');
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

  return pinElement;
};

var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  similarListElement.appendChild(fragment);
};

// function onMapPinMainClick() {
//   map.classList.remove('map--faded');
//   adForm.classList.remove('ad-form--disabled');
//
//   setDisabled(mapFilters, true);
//   setDisabled(fieldsetsForm, true);
//
//   renderPins(generatePinsData());
//
//   mainPin.removeEventListener('click', onMapPinMainClick);
// }
//
// mainPin.addEventListener('click', onMapPinMainClick);

// Функция для задания границ карты
var setMapLimitCoords = function (min, max, n) {
  if (n < min) {
    n = min;
  } else if (n > max) {
    n = max;
  }
  return n;
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: setMapLimitCoords(CONFIG.height.min, CONFIG.height.max, evt.clientY)
  };

  // Функция перемещения главного пина по карте
  var moveMainPin = function (mouseEvt) {
    var shift = {
      x: startCoords.x - mouseEvt.clientX,
      y: setMapLimitCoords(CONFIG.height.min, CONFIG.height.max, startCoords.y - mouseEvt.clientY)
    };
    startCoords = {
      x: mouseEvt.clientX,
      y: setMapLimitCoords(CONFIG.height.min, CONFIG.height.max, mouseEvt.clientY)
    };
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    // console.log(mainPin.offsetTop - shift.y);
    // console.log(mainPin.offsetLeft - shift.x);
  };

  var dragged = false;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    moveMainPin(moveEvt);
    setAddressValue();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setDisabled(mapFilters, true);
    setDisabled(fieldsetsForm, true);
    renderPins(generatePinsData());

    if (dragged) {
      moveMainPin(upEvt);
      setAddressValue();
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

setDisabled(mapFilters, false);
setDisabled(fieldsetsForm, false);

setAddressValue();

// var MAP_PIN_WIDTH = mainPin.offsetWidth;
// var MAP_PIN_X = mainPin.offsetLeft;
// var MAP_PIN_Y = mainPin.offsetTop;
// var MAP_PIN_HEIGHT = mainPin.offsetHeight;

// console.log('Размер пина ' + MAP_PIN_WIDTH);
// console.log('Размер пина ' + MAP_PIN_HEIGHT);
// console.log('Размер пина по X ' + MAP_PIN_X);
// console.log('Размер пина по Y ' + MAP_PIN_Y);
//
// console.log('Карта. Start X: ' + map.style.top);
// console.log('Карта. Start Y: ' + map.style.left);
