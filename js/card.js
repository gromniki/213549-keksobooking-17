'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Объект наименования в объявлении в соответствии с типом жилья
  var typesOnMap = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  // Характеристики фотографий жилья
  var Photo = {
    CLASS: 'popup__photo',
    WIDTH: 45,
    HEIGHT: 40,
    ALT: 'Фотография жилья',
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
  var fillFeatures = function (parent, selector, features) {
    // удаляем все элементы из шаблона
    window.util.removeNodeList(parent, selector);

    // добавляем только те, что есть в объявлении
    if (features && features.length > 0) {
      features.forEach(function (item) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + item);
        parent.appendChild(feature);
      });
    } else {
      parent.style.display = 'none';
    }
  };

  // функция вывода изображений объявления
  var fillPhotos = function (parent, selector, sources) {
    // удаляем все фото из шаблона
    window.util.removeNodeList(parent, selector);

    sources.forEach(function (pic) {
      var img = document.createElement('img');
      img.classList.add(Photo.CLASS);
      img.setAttribute('src', pic);
      img.setAttribute('width', Photo.WIDTH);
      img.setAttribute('height', Photo.HEIGHT);
      img.setAttribute('alt', Photo.ALT);
      parent.appendChild(img);
    });
  };

  // функция добавления аватара
  var fillAvatar = function (field, source) {
    field.src = source;
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    var activeCard = window.map.map.querySelector('.popup');
    var activeClass = window.map.map.querySelector('.map__pin--active');
    if (activeCard && activeClass) {
      activeCard.remove();
      activeClass.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  // удаляем карточку из разметки, если она создана
  var removeCard = function () {
    var activeCard = window.map.map.querySelector('.popup');
    if (activeCard) {
      closePopup();
    }
  };

  var renderCard = function (card) {
    removeCard();

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
    var avatar = cardElement.querySelector('.popup__avatar');
    var closeButton = cardElement.querySelector('.popup__close');

    // вывод данных в необходимые поля
    fillField(title, card.offer.title); // заголовок
    fillField(address, card.offer.address); // адрес
    fillPrice(price, card.offer.price); // цена
    fillType(type, card.offer.type); // тип жилья
    fillCapacity(capacity, card.offer.rooms, card.offer.guests); // количество комнат и гостей
    fillTime(time, card.offer.checkin, card.offer.checkout); // время заезда и выезда
    fillFeatures(features, '.popup__feature', card.offer.features); // удобства
    fillField(description, card.offer.description); // описание
    fillPhotos(photos, '.popup__photo', card.offer.photos); // фотографии жилья
    fillAvatar(avatar, card.author.avatar); // замена дефолтной аватарки

    document.addEventListener('keydown', closePopup);

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopup();
    });

    // window.pin.mapPins.insertAdjacentElement('afterend', cardElement);
    return cardElement;
  };

  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();

    renderCard(cards);

    window.pin.mapPins.insertAdjacentElement('afterend', fragment);
  };

  window.card = {
    onRender: renderCards,
  };
})();
