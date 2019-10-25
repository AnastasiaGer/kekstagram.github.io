'use strict';

(function () {
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

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
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

  var cleanContainer = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
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
    hideElement: hideElement,
    showElement: showElement,
    setInvalidClass: setInvalidClass,
    unsetInvalidClass: unsetInvalidClass,
    checkInvalidClass: checkInvalidClass,
    cleanContainer: cleanContainer,
    getShuffled: getShuffled
  };
})();
