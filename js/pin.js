'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var main = document.querySelector('main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    img.setAttribute('src', pin.author.avatar);
    img.setAttribute('alt', 'Заголовок объявления');
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    return pinElement;
  };

  // Функция вывода сообщения об успешной отправке
  var renderSuccess = function () {
    return successTemplate.cloneNode(true);
    //var successElement = successTemplate.cloneNode(true);
    //var successMessage = successElement.querySelector('.success__message');

    //successMessage.textContent = message;

    //return successElement;
  };

  console.log(renderSuccess());

  // Функция вывода ошибки
  var renderError = function (errorStatus) {
    var error = document.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');

    errorMessage.textContent = errorStatus;
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      main.removeChild(error);
    });

    return errorElement;
  };

  window.pin = {
    onSuccess: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderPin(array[i]));
      }
      similarListElement.appendChild(fragment);
    },
    onSuccessMessage: function () {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(renderSuccess());
      main.appendChild(fragment);
    },
    onError: function (errorMessage) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(renderError(errorMessage));
      main.appendChild(fragment);
    }
  };
})();
