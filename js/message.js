'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // определяем типы сообщений, чтоб уменьшить дублирование, так как они имеют похожие классы
  var MessageTypes = {
    ERROR: 'error',
    SUCCESS: 'success',
  };

  // функция принимает шаблон и тупо его рендерит
  var renderMessage = function (template) {
    var message = template.cloneNode(true);
    message.classList.add('hidden');
    main.insertAdjacentElement('afterbegin', message);
  };

  renderMessage(successTemplate);
  renderMessage(errorTemplate); // на старте приложения рендерим и прячем

  // общая функция для показа сообщения, всё навешивается здесь, чтобы скрытые сообщения были без подписок
  var showDialog = function (type, text) {
    var message = document.querySelector('.' + type);
    var messageText = message.querySelector('.' + type + '__message'); // по типу получаем текст и сам элемент

    if (text) {
      messageText.textContent = text;
    }

    var onClick = function () {
      close();
    };

    var onKey = function (evt) {
      if (evt.keyCode === window.util.KeyCodes.ESC) {
        close();
      }
    };

    var close = function () {
      message.classList.add('hidden');
      message.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };

    message.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);

    message.classList.remove('hidden'); // показываем ее
  };

  // функция обертки, которая принимает текст и вызывают функцию показа
  var onSuccess = function (text) {
    showDialog(MessageTypes.SUCCESS, text);
  };

  var onError = function (text) {
    showDialog(MessageTypes.ERROR, text);
  };

  window.message = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
