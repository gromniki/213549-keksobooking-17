'use strict';

var MAIN_PIN_WIDTH = 65 / 2;
var MAIN_PIN_HEIGHT = 65 / 2;

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var PINS_NUMBER = 8;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = map.querySelectorAll('.map__filter');
var fieldsetsForm = document.querySelectorAll('fieldset');
var fieldAddress = document.querySelector('#address');

// var setDisabled = function (array) {
//   for (var i = 0; i < array.length; i++) {
//     array[i].setAttribute('disabled', '');
//   }
//
//   return array;
// };
//
// var delDisabled = function (array) {
//   for (var i = 0; i < array.length; i++) {
//     array[i].removeAttribute('disabled', '');
//   }
//
//   return array;
// };

var defineDisabled = function (array, isDisabled) {
  for (var i = 0; i < array.length; i++) {
    if (isDisabled) {
      array[i].removeAttribute('disabled', '');
    } else {
      array[i].setAttribute('disabled', '');
    }
  }

  return array;
};

defineDisabled(mapFilters, false);
defineDisabled(fieldsetsForm, false);

var topMainPin = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
var leftMainPin = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH;

var setCoords = function () {
  fieldAddress.value = leftMainPin + ', ' + topMainPin;
};

setCoords();

mainPin.addEventListener('click', function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  defineDisabled(mapFilters, true);
  defineDisabled(fieldsetsForm, true);

  renderPins(generatePinsData());
});

var similarListElement = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        type: getRandomElement(TYPES),
      },
      location: {
        x: getRandomNumber(0, 1200),
        y: getRandomNumber(130, 630),
      },
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
