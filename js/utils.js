'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomPoint = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (arr) {
    var randomindex = Math.floor(Math.random() * arr.length);
    return arr[randomindex];
  };

  var imageEditElement = document.querySelector('.img-upload__overlay');
  var imageSetupElement = document.querySelector('#upload-file');

  window.utils = {
    getRandomPoint: getRandomPoint,
    getRandomElement: getRandomElement,
    isKeydownEsc: ESC_KEYCODE,
    isKeydownEnter: ENTER_KEYCODE,
    imageEditElement: imageEditElement,
    imageSetupElement: imageSetupElement
  };
})();
