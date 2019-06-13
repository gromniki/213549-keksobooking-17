'use strict';

var map = document.querySelector('.map');

var pinTemplate = document.querySelector('#pin').content.querySelector('button');

console.log(pinTemplate);

map.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var renderPins = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').getAttribute('src') = pin.author.avatar;

  return pinElement;
};

// {
//   "author": {
//   "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png,
//     где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
// },
//   "offer": {
//   "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
// },
//
//   "location": {
//     "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//     "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }
