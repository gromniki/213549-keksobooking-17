'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');


  var similarListElement = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');



  // form.js


  // pin.js
  var generatePinsData = function () {
    var pins = [];

    for (var i = 1; i <= window.data.PINS_NUMBER; i++) {
      pins.push({
        author: {
          avatar: 'img/avatars/user0' + i + '.png',
        },
        offer: {
          type: window.util.getRandomElement(window.data.TYPES),
        },
        location: {
          x: window.util.getRandomNumber(window.data.CONFIG.width.min, window.data.CONFIG.width.max),
          y: window.util.getRandomNumber(window.data.CONFIG.height.min, window.data.CONFIG.height.max),
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

  // map.js
// Коллбэк активации карты
  var onActivatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setDisabled(mapFilters, true);
    setDisabled(fieldsetsForm, true);
    renderPins(generatePinsData());
    mainPin.removeEventListener('keydown', onActivatePage);
  };

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onActivatePage);
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      onActivatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    // Функция перемещения главного пина по карте
    var moveMainPin = function (mouseEvt) {
      var shift = {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY,
      };

      startCoords = {
        x: mouseEvt.clientX,
        y: mouseEvt.clientY,
      };

      var mainPinTop = mainPin.offsetTop - shift.y;
      var mainPinLeft = mainPin.offsetLeft - shift.x;

      if (mainPinTop > window.data.CONFIG.height.min - window.data.MainPin.HEIGHT_MOVE && mainPinTop < window.data.CONFIG.height.max) {
        mainPin.style.top = mainPinTop + 'px';
      }

      if (mainPinLeft > window.data.CONFIG.width.min - window.data.MainPin.WIDTH && mainPinLeft < map.offsetWidth - window.data.MainPin.WIDTH_MOVE) {
        mainPin.style.left = mainPinLeft + 'px';
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      moveMainPin(moveEvt);
      setAddressValue(window.data.MainPin.WIDTH_MOVE, window.data.MainPin.HEIGHT_MOVE);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      moveMainPin(upEvt);
      setAddressValue(window.data.MainPin.WIDTH_MOVE, window.data.MainPin.HEIGHT_MOVE);

      mainPin.removeEventListener('mouseup', onActivatePage);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setDisabled(mapFilters, false);
  setDisabled(fieldsetsForm, false);

  setAddressValue(window.data.MainPin.WIDTH, window.data.MainPin.HEIGHT);

})();
