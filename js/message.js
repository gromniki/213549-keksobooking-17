'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Функция вывода сообщения об успешной отправке данных
  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    var successBlock = main.querySelector('.success');

    successBlock.addEventListener('click', function () {
      main.remove(successBlock);
    });

    return successElement;
  };

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

  window.message = {
    onSuccess: function () {
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
