'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');

    img.setAttribute('src', pin.author.avatar);
    img.setAttribute('alt', 'Заголовок объявления');
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    return pinElement;
  };

  var clearPin = function () {
    var mapPins = document.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };


  var mainFormFilters = document.querySelector('.map__filters');
  var typesFilter = mainFormFilters.querySelector('#housing-type');

  window.pin = {
    onRender: function (array) {
      var fragment = document.createDocumentFragment();

      // array.forEach(function (pin) {
      //   fragment.appendChild(renderPin(pin));
      //   // if (pin.offer.type === 'bungalo') {
      //   //   console.log(pin.offer.type);
      //   // }
      // });

      // debugger;
      // array.filter(x=> ...).slice(0, 5)

      // var arrayPins = array;
      //
      // var updatePins = function () {
      //   var types = wizards.filter(function (it) {
      //     return it.colorCoat === coatColor;
      //   });
      //
      //   window.render(sameCoatWizards);
      // };

      var arrayPins = array;

      console.log(arrayPins);

      // debugger;
      var filterByType = function () {
        return arrayPins.filter(function (pin) {
          console.log(pin.offer.type);
          // if (pin.offer.type === typesFilter.value) {
          //   console.log(pin);
          //   // fragment.appendChild(renderPin(pin));
          // }
        }).slice(0, 5);
      };

      console.log(filterByType());



      var onTypeChange = function () {
        var valueType = typesFilter.value;

        // typesFilter.removeEventListener('change', onTypeChange);
        console.log(valueType);
      };

      typesFilter.addEventListener('change', onTypeChange);

      // arrayPins.forEach(function (pin) {
      //   fragment.appendChild(renderPin(pin));
      // });


      // var arrayPins = array.slice(0, 5).filter(function (it) {
      //   if (typesFilter.value === it.offer.type) {
      //     console.log(it);
      //   }
      //
      //
      //   // typesFilter.addEventListener('change', function () {
      //   //   var valueType = typesFilter.value;
      //   //   console.log(valueType);
      //   // });
      //   //
      //   // console.log(it.offer.type);
      // });

      // console.log(arrayPins);

      similarListElement.appendChild(fragment);
    },
    clearPin: clearPin,
  };
})();
