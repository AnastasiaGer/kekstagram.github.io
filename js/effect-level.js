'use strict';

(function () {
  // наложение фильтров на редактируемоге изображение
  var UPLOAD_PREVIEW = 'img-upload__preview';
  var PinPosition = {
    MIN: 0,
    MAX: 450
  };

  var FilterCss = {
    none: {
      class: 'effects__preview--none'
    },
    chrome: {
      class: 'effects__preview--chrome',
      css: 'grayscale',
      max: 1,
      min: 0
    },
    sepia: {
      class: 'effects__preview--sepia',
      css: 'sepia',
      max: 1,
      min: 0
    },
    marvin: {
      class: 'effects__preview--marvin',
      css: 'invert',
      max: 100,
      min: 0,
      postFix: '%'
    },
    phobos: {
      class: 'effects__preview--phobos',
      css: 'blur',
      max: 3,
      min: 0,
      postFix: 'px'
    },
    heat: {
      class: 'effects__preview--heat',
      css: 'brightness',
      max: 3,
      min: 1
    }
  };

  var previewElement = document.querySelector('.img-upload__preview');
  var effectValueElement = document.querySelector('[name="effect-level"]');
  var lineElement = document.querySelector('.effect-level__line');
  var pinElement = document.querySelector('.effect-level__pin');
  var lineDepthElement = document.querySelector('.effect-level__depth');
  var blockPinElement = document.querySelector('.img-upload__effect-level');
  var effectListElement = document.querySelector('.effects__list');

  var makeValueFilter = function (value) {
    pinElement.style.left = value + 'px';
    lineElement.style.width = value + 'px';
    lineDepthElement.style.width = value + 'px';
  };

  var filterChange = function (max, min, filter, position, filterPostfix) {
    var postFix = filterPostfix || '';
    var value = (max - min) * (position / PinPosition.MAX) + min;
    var change = '' + filter + '(' + value + postFix + ')';

    previewElement.style.filter = change;
    effectValueElement.value = value;
  };

  pinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var selectedFilter = document.querySelector('input[type="radio"]:checked').value;
    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var position = pinElement.offsetLeft - shift;
      startCoords = moveEvt.clientX;

      if (position <= PinPosition.MIN) {
        position = PinPosition.MIN;
      }

      if (position > PinPosition.MAX) {
        position = PinPosition.MAX;
      }

      makeValueFilter(position);
      filterChange(FilterCss[selectedFilter].max, FilterCss[selectedFilter].min, FilterCss[selectedFilter].css, position, FilterCss[selectedFilter].postFix);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var cheskScaleShow = function (elem) {
    if (elem.value === 'none') {
      window.utils.hideElement(blockPinElement);
    } else {
      window.utils.showElement(blockPinElement);
    }
  };

  effectListElement.addEventListener('click', function (evt) {
    var toggler = evt.target.closest('input');
    if (toggler) {
      makeValueFilter(PinPosition.MAX);
      previewElement.classList = UPLOAD_PREVIEW;
      previewElement.removeAttribute('style');
      previewElement.classList.add(FilterCss[toggler.value].class);
      cheskScaleShow(toggler);
    }
  });

  var makeDeafultFilter = function () {
    makeValueFilter(PinPosition.MAX);
    previewElement.removeAttribute('style');
    window.utils.hideElement(blockPinElement);
    previewElement.classList = UPLOAD_PREVIEW;
  };
  window.makeDeafultFilter = makeDeafultFilter;
})();
