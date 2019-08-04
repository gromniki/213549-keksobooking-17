'use strict';

(function () {
  var mainFormFilters = document.querySelector('.map__filters-container');
  var typeFilter = mainFormFilters.querySelector('#housing-type');
  var pricesFilter = mainFormFilters.querySelector('#housing-price');
  var roomsFilter = mainFormFilters.querySelector('#housing-rooms');
  var guestsFilter = mainFormFilters.querySelector('#housing-guests');
  // var featuresFilter = mainFormFilters.querySelector('#housing-features');

  // фильтры удобств
  var wifi = mainFormFilters.querySelector('#filter-wifi');
  var dishwasher = mainFormFilters.querySelector('#filter-dishwasher');
  var parking = mainFormFilters.querySelector('#filter-parking');
  var washer = mainFormFilters.querySelector('#filter-washer');
  var elevator = mainFormFilters.querySelector('#filter-elevator');
  var conditioner = mainFormFilters.querySelector('#filter-conditioner');

  // переменные для хранения текущего значения выбранного фильтра
  // зададим "стартовое" значение
  var selectedTypeValue = typeFilter.value;
  var selectedPriceValue = pricesFilter.value;
  var selectedRoomValue = roomsFilter.value;
  var selectedGuestValue = guestsFilter.value;
  var unselectedValue = 'any'; // значение "невыбранного" фильтра

  // массив для хранения отфильтрованного списка объявлений
  var filteredData = [];

  window.filters = {
  };
})();
