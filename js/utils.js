'use strict';

(function () {
  var HIDDEN_CLASS = 'hidden';
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var performCallbackIfKeydownEsc = function (evt, callback) {
    if (evt.keyCode === KeyCode.ESC) {
      callback();
    }
  };

  var performCallbackIfKeydownEnter = function (evt, callback) {
    if (evt.keyCode === KeyCode.ENTER) {
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
    elem.classList.remove(HIDDEN_CLASS);
  };

  var hideElement = function (elem) {
    elem.classList.add(HIDDEN_CLASS);
  };

  var setInvalidClass = function (element) {
    element.classList.add('invalid');
  };

  var unsetInvalidClass = function (element) {
    element.classList.remove('invalid');
  };

  var checkInvalidClass = function (element) {
    return element.classList.contains('invalid');
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

  window.utils = {
    performCallbackIfKeydownEsc: performCallbackIfKeydownEsc,
    performCallbackIfKeydownEnter: performCallbackIfKeydownEnter,
    imageEditElement: imageEditElement,
    imageSetupElement: imageSetupElement,
    getRandomPoint: getRandomPoint,
    getRandomElement: getRandomElement,
    showElement: showElement,
    hideElement: hideElement,
    setInvalidClass: setInvalidClass,
    unsetInvalidClass: unsetInvalidClass,
    checkInvalidClass: checkInvalidClass,
    getShuffled: getShuffled
  };
})();
