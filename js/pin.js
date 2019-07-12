'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    img.setAttribute('src', pin.author.avatar);
    img.setAttribute('alt', 'Заголовок объявления');
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    return pinElement;
  };

  var clearPin = function () {
    var mapPins = document.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  window.pin = {
    onRender: function (array) {
      var fragment = document.createDocumentFragment();

      array.forEach(function (pin) {
        fragment.appendChild(renderPin(pin));
        // if (pin.offer.type === 'bungalo') {
        //   console.log(pin.offer.type);
        // }
      });

      similarListElement.appendChild(fragment);
    },
    clearPin: clearPin,
  };
})();
