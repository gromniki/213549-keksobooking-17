'use strict';

var MAIN_PIN_WIDTH = 65 / 2;
var MAIN_PIN_HEIGHT = 65 / 2;

var TYPES = [{
  bungalo: {
    price: {
      min: 0
    }
  },
  flat: {
    price: {
      min: 1000
    }
  },
  house: {
    price: {
      min: 5000
    }
  },
  palace: {
    price: {
      min: 10000
    }
  }
}];

var CONFIG = {
  width: {
    min: 0,
    max: 1130
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

  switch (valueType) {
    case 'bungalo':
      price.setAttribute('placeholder', TYPES[0].bungalo.price.min);
      price.setAttribute('min', TYPES[0].bungalo.price.min);
      break;
    case 'flat':
      price.setAttribute('placeholder', TYPES[0].flat.price.min);
      price.setAttribute('min', TYPES[0].flat.price.min);
      break;
    case 'house':
      price.setAttribute('placeholder', TYPES[0].house.price.min);
      price.setAttribute('min', TYPES[0].house.price.min);
      break;
    case 'palace':
      price.setAttribute('placeholder', TYPES[0].palace.price.min);
      price.setAttribute('min', TYPES[0].palace.price.min);
      break;
    default:
      price.setAttribute('placeholder', TYPES[0].house.price.min);
      price.setAttribute('min', TYPES[0].house.price.min);
      break;
  }
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

function onMapPinMainClick() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  setDisabled(mapFilters, true);
  setDisabled(fieldsetsForm, true);

  renderPins(generatePinsData());

  mainPin.removeEventListener('click', onMapPinMainClick);
}

mainPin.addEventListener('click', onMapPinMainClick);

setDisabled(mapFilters, false);
setDisabled(fieldsetsForm, false);

setAddressValue();
