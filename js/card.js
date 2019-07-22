'use strict';

(function () {
  // var similarListElement = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  console.log('шаблон карточки ' + cardTemplate);

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

  // функция заполнения поля с ценой
  var fillPrice = function (field, number) {
    field.textContent = fillField(field, number) + '₽/ночь';
  };

  // функция заполнения поля с типом жилья
  var fillType = function (field, text) {
    field.textContent = typesOnMap[fillField(field, text)];
    field.textContent = typesOnMap.fillField(field, text);
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');

    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.

    fillField(title, card.offer.title); // заголовок
    fillField(address, card.offer.address); // адрес
    fillPrice(price, card.offer.price); // цена
    fillType(type, card.offer.type); // тип жилья

    return cardElement;
  };

  var renderCards = function () {
    var fragment = document.createDocumentFragment();

    window.backend.load(window.pin.onRender).forEach(function (card) {
      fragment.appendChild(renderCard(card));
    });


    window.pin.mapPinsList.insertAdjacentElement('afterend', fragment);
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


  window.card = {
    renderCard: renderCards,
  };
})();
