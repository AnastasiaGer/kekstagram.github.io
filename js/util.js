'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  var getRandomValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var isKeydownEsc = function (evt, callback) {
    if (evt.keyCode === keyCode.ESC) {
      callback();
    }
  };

  var isKeydownEnter = function (evt, callback) {
    if (evt.keyCode === keyCode.ENTER) {
      callback();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomValue: getRandomValue,
    isKeydownEsc: isKeydownEsc,
    isKeydownEnter: isKeydownEnter,
  };
})();
