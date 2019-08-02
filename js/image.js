'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDefault = avatarPreview.src;
  var imageUploadChooser = document.querySelector('.ad-form__upload input[type=file]');
  var imageUploadPreview = document.querySelector('.ad-form__photo');
  var isAttachedFiles = true;

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  imageUploadChooser.addEventListener('change', function () {
    var file = imageUploadChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var img = document.createElement('img');
      imageUploadPreview.appendChild(img);

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
        img.width = 65;
        img.height = 65;
        img.alt = 'Фотография жилья';
      });

      reader.readAsDataURL(file);
    }
  });

  // аватарка по дефолту
  var clearAvatar = function () {
    avatarPreview.src = avatarDefault;
  };

  // функция очистки превью фотографий жилья
  var clearPreviewImages = function () {
    var previewImages = Array.from(imageUploadPreview.querySelectorAll('img'));

    previewImages.forEach(function (item) {
      item.remove();
    });
  };

  window.image = {
    clearAvatar: clearAvatar,
    clearPreview: clearPreviewImages
  };
})();
