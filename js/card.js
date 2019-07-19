'use strict';

(function () {
  // var similarListElement = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  console.log(cardTemplate);

  // Объект наименования в объявлении в соответствии с типом жилья
  var typesOnMap = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // функция заполнения поля текстовой информацией
  var fillField = function (field, text) {
    if (text) {
      field.textContent = text;
    } else {
      field.style.display = 'none';
    }
    return field.textContent;
  };

  // функция заполнения поля с типом жилья
  var fillType = function (field, text) {
    field.textContent = typesOnMap[fillField(field, text)];
  };

  // функция заполнения поля с ценой
  var fillPrice = function (field, number) {
    field.textContent = fillField(field, number) + '₽/ночь';
  };


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
