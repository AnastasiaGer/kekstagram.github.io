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

  var getShuffled = function (array) {
    var j;
    var x;

    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
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
    getShuffled: getShuffled,
    isKeydownEsc: isKeydownEsc,
    isKeydownEnter: isKeydownEnter,
  };
})();
