'use strict';

(function () {
  var KeyCodes = {
    ENTER: 13,
    ESC: 27
  };

  window.util = {
    KeyCodes: KeyCodes,
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ENTER) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ESC) {
        action();
      }
    },
    setDisabled: function (array, isDisabled) {
      for (var i = 0; i < array.length; i++) {
        if (isDisabled) {
          array[i].removeAttribute('disabled', '');
        } else {
          array[i].setAttribute('disabled', '');
        }
      }

      return array;
    },
    removeNodeList: function (parentElement, selectors) {
      var domArray = parentElement.querySelectorAll(selectors);
      domArray.forEach(function (list) {
        list.remove();
      });
    },
  };
})();
