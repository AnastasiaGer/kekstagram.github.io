'use strict';

(function () {
  // наложение фильтров на редактируемоге изображение
  var UPLOAD_PREVIEW_CLASS = 'img-upload__preview';
  var PinPosition = {
    MIN: 0,
    MAX: 450
  };

  var FilterCss = {
    none: {
      CLASS: 'effects__preview--none'
    },
    chrome: {
      CLASS: 'effects__preview--chrome',
      CSS: 'grayscale',
      MAX: 1,
      MIN: 0
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      CSS: 'sepia',
      MAX: 1,
      MIN: 0
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      CSS: 'invert',
      MAX: 100,
      MIN: 0,
      UNIT: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      CSS: 'blur',
      MAX: 3,
      MIN: 0,
      UNIT: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      CSS: 'brightness',
      MAX: 3,
      MIN: 1
    }
  };
  var uploadElement = document.querySelector('.img-upload');
  var previewElement = document.querySelector('.img-upload__preview img');

  var effectLevelElement = uploadElement.querySelector('.effect-level');
  var effectListElement = uploadElement.querySelector('.effects__list');

  var effectValueElement = effectLevelElement.querySelector('.effect-level__value');
  var pinElement = effectLevelElement.querySelector('.effect-level__pin');
  var lineDepthElement = effectLevelElement.querySelector('.effect-level__depth');

  var blockPinElement = uploadElement.querySelector('.img-upload__effect-level');
  var makeValueFilter = function (value) {
    pinElement.style.left = value + 'px';
    lineDepthElement.style.width = value + 'px';
  };

  var filterChange = function (max, min, filter, position, filterPostfix) {
    var postFix = filterPostfix || '';
    var value = (max - min) * (position / PinPosition.MAX) + min;
    var change = '' + filter + '(' + value + postFix + ')';

    previewElement.style.filter = change;
    effectValueElement.value = Math.round(value * 100);
  };

  pinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var selectedFilter = document.querySelector('.effects__radio:checked').value;
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
      filterChange(FilterCss[selectedFilter].MAX, FilterCss[selectedFilter].MIN, FilterCss[selectedFilter].CSS, position, FilterCss[selectedFilter].UNIT);
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
      previewElement.className = UPLOAD_PREVIEW_CLASS;
      previewElement.removeAttribute('style');
      previewElement.classList.add(FilterCss[toggler.value].CLASS);
      cheskScaleShow(toggler);
      window.resize.setDefaultScale();
    }
  });

  var makeDeafultFilter = function () {
    makeValueFilter(PinPosition.MAX);
    previewElement.removeAttribute('style');
    window.utils.hideElement(blockPinElement);
    previewElement.className = UPLOAD_PREVIEW_CLASS;
  };
  window.effects = {
    makeDeafultFilter: makeDeafultFilter,
  };
})();
