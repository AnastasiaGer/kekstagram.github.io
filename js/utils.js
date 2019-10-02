'use strict';

(function () {
  var keyCode = 27;

  var isKeydownEsc = function (evt, callback) {
    if (evt.keyCode === keyCode.ESC) {
      callback();
    }
  };

  var imageEditElement = document.querySelector('.img-upload__overlay');
  var imageSetupElement = document.querySelector('#upload-file');

  var getRandomPoint = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (arr) {
    var randomindex = Math.floor(Math.random() * arr.length);
    return arr[randomindex];
  };

  var showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  var hideElement = function (elem) {
    elem.classList.add('hidden');
  };

  window.utils = {
    isKeydownEsc: isKeydownEsc,
    imageEditElement: imageEditElement,
    imageSetupElement: imageSetupElement,
    getRandomPoint: getRandomPoint,
    getRandomElement: getRandomElement,
    showElement: showElement,
    hideElement: hideElement
  };
})();
