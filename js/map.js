'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  window.map = {
    map: map,
    mainPin: mainPin,
  };

  // Коллбэк активации карты
  var onActivatePage = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.setDisabled(window.form.mapFilters, true);
    window.form.setDisabled(window.form.fieldsetsForm, true);
    window.pin.renderPins(window.pin.generatePinsData());
    mainPin.removeEventListener('keydown', onActivatePage);
  };

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onActivatePage);
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      onActivatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    // Функция перемещения главного пина по карте
    var moveMainPin = function (mouseEvt) {
      var shift = {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY,
      };

      startCoords = {
        x: mouseEvt.clientX,
        y: mouseEvt.clientY,
      };

      var mainPinTop = mainPin.offsetTop - shift.y;
      var mainPinLeft = mainPin.offsetLeft - shift.x;

      if (mainPinTop > window.data.CONFIG.height.min - window.data.MainPin.HEIGHT_MOVE && mainPinTop < window.data.CONFIG.height.max) {
        mainPin.style.top = mainPinTop + 'px';
      }

      if (mainPinLeft > window.data.CONFIG.width.min - window.data.MainPin.WIDTH && mainPinLeft < map.offsetWidth - window.data.MainPin.WIDTH_MOVE) {
        mainPin.style.left = mainPinLeft + 'px';
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      moveMainPin(moveEvt);
      window.form.setAddressValue(window.data.MainPin.WIDTH_MOVE, window.data.MainPin.HEIGHT_MOVE);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      moveMainPin(upEvt);
      window.form.setAddressValue(window.data.MainPin.WIDTH_MOVE, window.data.MainPin.HEIGHT_MOVE);

      mainPin.removeEventListener('mouseup', onActivatePage);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form.setDisabled(window.form.mapFilters, false);
  window.form.setDisabled(window.form.fieldsetsForm, false);

  window.form.setAddressValue(window.data.MainPin.WIDTH, window.data.MainPin.HEIGHT);
})();
