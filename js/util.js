'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (array) {
      return array[this.getRandomNumber(0, array.length)];
    }
  };

  console.log('init util');
})();
