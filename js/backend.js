'use strict';

(function () {
  var UrlData = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var REQUEST_TIMEOUT = 10000; // 10s

  var ResponseCodes = {
    OK: 200
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ResponseCodes.OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', UrlData.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', UrlData.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
