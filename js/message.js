'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Функция вывода сообщения об успешной отправке данных
  var onSuccess = function () {
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
    };

    successElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    return successElement;
  };

  // Функция вывода ошибки
  var onError = function (errorStatus) {
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
      errorElement.classList.add('hidden');
      //main.removeChild(errorElement);
      errorElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };

    errorElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    return errorElement;

    //return main.insertAdjacentElement('afterbegin', errorElement);
  };

  var renderMessage = function (getMessageElement) {
    var message = getMessageElement();
    message.classList.add('hidden');
    main.insertAdjacentElement('afterbegin', message);
  };

  renderMessage(onSuccess);
  renderMessage(onError);

  var showMessage = function () {

  };

  window.message = {
    onSuccess: onSuccess,
    //onError: renderMessage(onError)
  };
})();
