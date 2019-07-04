'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Функция вывода сообщения об успешной отправке данных
  var onSuccess = function (onClose) {
    var successElement = successTemplate.cloneNode(true);

    var onClick = function () {
      close();
    };

    var onKey = function (evt) {
      if (evt.keyCode === window.util.KeyCodes.ESC) {
        close();
      }
    };

    var close = function () {
      main.removeChild(successElement);
      successElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      onClose();
    };

    successElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    main.insertAdjacentElement('afterbegin', successElement);
  };

  // Функция вывода ошибки
  var onError = function (errorStatus, onClose) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    // var errorButton = errorElement.querySelector('.error__button');
    errorMessage.textContent = errorStatus;

    var onClick = function () {
      close();
    };

    var onKey = function (evt) {
      if (evt.keyCode === window.util.KeyCodes.ESC) {
        close();
      }
    };

    var close = function () {
      main.removeChild(errorElement);
      errorElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      onClose();
    };

    errorElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    main.insertAdjacentElement('afterbegin', errorElement);
  };

  window.message = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
