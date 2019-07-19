'use strict';

(function () {
  // var similarListElement = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  console.log(cardTemplate);

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  };


  // var renderPin = function (pin) {
  //   var pinElement = pinTemplate.cloneNode(true);
  //   var img = pinElement.querySelector('img');
  //
  //   img.setAttribute('src', pin.author.avatar);
  //   img.setAttribute('alt', 'Заголовок объявления');
  //   pinElement.style.left = pin.location.x + 'px';
  //   pinElement.style.top = pin.location.y + 'px';
  //
  //   return pinElement;
  // };

  // var clearPin = function () {
  //   var mapPins = document.querySelector('.map__pins');
  //   var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  //
  //   pins.forEach(function (pin) {
  //     mapPins.removeChild(pin);
  //   });
  // };
  

  window.card = {
    renderCard: function (cards) {
      var fragment = document.createDocumentFragment();

      window.pin.mapPinsList.appendChild(fragment);
    },
  };
})();
