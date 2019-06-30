'use strict';

(function () {
  var MainPin = {
    WIDTH: 65 / 2,
    HEIGHT: 65 / 2,
    WIDTH_MOVE: 65 / 2,
    HEIGHT_MOVE: 65 + 22,
  };

  var TYPES = [
    'Bungalo',
    'Flat',
    'House',
    'Palace'
  ];

  var MIN_PRICES = {
    Bungalo: 0,
    Flat: 1000,
    House: 5000,
    Palace: 10000
  };

  var CONFIG = {
    width: {
      min: 0,
      max: 1200
    },
    height: {
      min: 130,
      max: 630
    }
  };

  var PINS_NUMBER = 8;

  window.data = {
    MainPin: MainPin,
    TYPES: TYPES,
    MIN_PRICES: MIN_PRICES,
    CONFIG: CONFIG,
    PINS_NUMBER: PINS_NUMBER
  };
})();
