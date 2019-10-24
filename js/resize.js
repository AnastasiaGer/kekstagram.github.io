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

  var getCurentSizeNumber = function () {
    return Number(sizeValueElement.value.slice(0, -1));
  };

  var sizeMinusHandler = function () {
    var newSizeNumber = getCurentSizeNumber() - STEP_RESIZE;
    sizeValueElement.value = newSizeNumber + '%';
    imagePreviewWrapperElement.style = 'transform: scale(' + (newSizeNumber / 100) + ')';
  };

  var sizePlusHandler = function () {
    var newSizeNumber = getCurentSizeNumber() + STEP_RESIZE;
    sizeValueElement.value = newSizeNumber + '%';
    imagePreviewWrapperElement.style = 'transform: scale(' + (newSizeNumber / 100) + ')';
  };

  resizeMinusElement.addEventListener('click', function () {
    if (getCurentSizeNumber() > MIN_RESIZE) {
      sizeMinusHandler();
    }
  });

  resizePlusElement.addEventListener('click', function () {
    if (getCurentSizeNumber() < MAX_RESIZE) {
      sizePlusHandler();
    }
  });

  window.resize = {
    setDefaultScale: setDefaultScale
  };
})();
