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
  };

  // функция заполнения поля с количеством комнат и гостей
  var fillCapacity = function (field, rooms, guests) {
    var roomsText = '';
    var guestsText = (guests === 1) ? ' гостя' : ' гостей';

    if (rooms === 1 || (rooms > 20 && rooms % 10 === 1)) {
      roomsText = ' комната для ';
    } else if (rooms > 1 && rooms < 5 || (rooms > 20 && (rooms % 10 > 1) && (rooms % 10 < 5))) {
      roomsText = ' комнаты для ';
    } else {
      roomsText = ' комнат для ';
    }

    field.textContent = fillField(field, rooms) + roomsText + fillField(field, guests) + guestsText;
  };

  // функция заполнения поля с заездом и выездом
  var fillTime = function (field, timeIn, timeOut) {
    field.textContent = 'Заезд после ' + fillField(field, timeIn) + ', выезд до ' + fillField(field, timeOut);
  };

  // функция заполнения поля с удобствами
  var fillFeatures = function (parent, selector, arr) {
    // удаляем все элементы из шаблона
    window.util.deleteDOMList(parent, selector);

    var fragment = document.createDocumentFragment();

    // добавляем только те, что есть в объявлении
    if (arr && arr.length > 0) {
      arr.forEach(function (item) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + item);
        parent.appendChild(feature);
      });
    } else {
      parent.style.display = 'none';
    }

    return fragment;
  };

  // функция вывода изображений объявления
  var renderPhotos = function (parent, selector, sources) {
    var fragment = document.createDocumentFragment();

    sources.forEach(function (pic) {
      var element = document.createElement('img');
      element.classList.add('popup__photo');
      element.setAttribute('src', pic);
      element.setAttribute('width', '45');
      element.setAttribute('height', '40');
      element.setAttribute('alt', 'Фотография жилья');
    });

    return fragment;
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var title = cardElement.querySelector('.popup__title');
    var address = cardElement.querySelector('.popup__text--address');
    var price = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');
    var time = cardElement.querySelector('.popup__text--time');
    var features = cardElement.querySelector('.popup__features');
    var description = cardElement.querySelector('.popup__description');
    var photos = cardElement.querySelector('.popup__photos');


    // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
    // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

    fillField(title, card.offer.title); // заголовок
    fillField(address, card.offer.address); // адрес
    fillPrice(price, card.offer.price); // цена
    fillType(type, card.offer.type); // тип жилья
    fillCapacity(capacity, card.offer.rooms, card.offer.guests); // количество комнат и гостей
    fillTime(time, card.offer.checkin, card.offer.checkout); // время заезда и выезда
    fillFeatures(features, '.popup__feature', card.offer.features);  // удобства
    fillField(description, card.offer.description);

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
