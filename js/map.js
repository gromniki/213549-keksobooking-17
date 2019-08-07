'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  // Функция начальных координат метки в поле адреса
  var setOriginalCoordinate = function () {
    window.form.fieldAddress.value = (window.map.MainPinOriginal.X + Math.round(window.data.mainPinSize.width)) + ', ' + (window.map.MainPinOriginal.Y + Math.round(window.data.mainPinSize.height));
  };

  // Деактивация карты
  var setDeactivatePage = function () {
    // добавляем класс map--faded, если его нет
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }
    // добавляем класс ad-form--disabled, если его нет
    if (!window.form.adForm.classList.contains('ad-form--disabled')) {
      window.form.adForm.classList.add('ad-form--disabled');
    }

    // заблокируем фильтры и форму
    window.util.setDisabled(window.form.mapFilters, false);
    window.util.setDisabled(window.form.fieldsetsForm, false);

    // передадим изначальные координаты метки в поле адреса
    setOriginalCoordinate();
  };

  window.map = {
    map: map,
    mainPin: mainPin,
    MainPinOriginal: {
      X: mainPin.offsetLeft,
      Y: mainPin.offsetTop,
    },
    movePinToOriginal: function () {
      mainPin.style.top = window.map.MainPinOriginal.Y + 'px';
      mainPin.style.left = window.map.MainPinOriginal.X + 'px';
    },
    setDeactivatePage: setDeactivatePage,
  };

  // Коллбэк активации карты
  var onActivatePage = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.util.setDisabled(window.form.mapFilters, true);
    window.util.setDisabled(window.form.fieldsetsForm, true);

    // генерация пинов
    window.backend.load(window.pin.onRender, window.message.onError);
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

      if (mainPinTop > window.data.CONFIG.HEIGHT_MIN - window.data.mainPinSize.heightMove && mainPinTop < window.data.CONFIG.HEIGHT_MAX) {
        mainPin.style.top = mainPinTop + 'px';
      }

      if (mainPinLeft > window.data.CONFIG.WIDTH_MIN - window.data.mainPinSize.width && mainPinLeft < map.offsetWidth - window.data.mainPinSize.widthMove) {
        mainPin.style.left = mainPinLeft + 'px';
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      moveMainPin(moveEvt);
      window.form.setAddressValue(window.data.mainPinSize.widthMove, window.data.mainPinSize.heightMove);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      moveMainPin(upEvt);
      window.form.setAddressValue(window.data.mainPinSize.widthMove, window.data.mainPinSize.heightMove);

      mainPin.removeEventListener('mouseup', onActivatePage);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.util.setDisabled(window.form.mapFilters, false);
  window.util.setDisabled(window.form.fieldsetsForm, false);

  window.form.setAddressValue(window.data.mainPinSize.width, window.data.mainPinSize.height);
})();
