'use strict';

(function () {
  // масштабирование редактируемого изображения
  var MIN_RESIZE = 25;
  var MAX_RESIZE = 100;
  var STEP_RESIZE = 25;
  var resizeMinusElement = document.querySelector('.scale__control--smaller');
  var resizePlusElement = document.querySelector('.scale__control--bigger');
  var imagePreviewWrapperElement = document.querySelector('.img-upload__preview');
  var sizeValueElement = document.querySelector('.scale__control--value');

  var setDefaultScale = function () {
    sizeValueElement.value = 100 + '%';
    imagePreviewWrapperElement.style = '';
  };

  var setPhotoScale = function (value) {
    var currentScale = parseInt(sizeValueElement.value, 10);
    currentScale += STEP_RESIZE * value;
    if (currentScale >= MIN_RESIZE && currentScale <= MAX_RESIZE) {
      sizeValueElement.value = currentScale + '%';
      imagePreviewWrapperElement.style.transform = 'scale(' + currentScale / 100 + ')';
    }
    return currentScale;
  };

  resizeMinusElement.addEventListener('click', function () {
    setPhotoScale(-1);
  });

  resizePlusElement.addEventListener('click', function () {
    setPhotoScale(1);
  });

  window.resize = {
    setDefaultScale: setDefaultScale
  };
})();
