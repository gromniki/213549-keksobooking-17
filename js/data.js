'use strict';

(function () {
  var mainPinSize = {
    width: 65 / 2,
    height: 65 / 2,
    widthMove: 65 / 2,
    heightMove: 65 + 22,
  };

  var TYPES = [
    'Bungalo',
    'Flat',
    'House',
    'Palace'
  ];

  var MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var Config = {
    WIDTH_MIN: 0,
    WIDTH_MAX: 1200,
    HEIGHT_MIN: 130,
    HEIGHT_MAX: 630
  };

  var PINS_NUMBER = 8;

  window.data = {
    mainPinSize: mainPinSize,
    TYPES: TYPES,
    MIN_PRICES: MIN_PRICES,
    CONFIG: Config,
    PINS_NUMBER: PINS_NUMBER,
  };
})();
