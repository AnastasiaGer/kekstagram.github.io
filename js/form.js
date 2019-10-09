'use strict';
(function () {
  var HashtagData = {
    START_POSITION: 0,
    MAX_COUNT: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  /* var SAVE_URL = 'https://js.dump.academy/kekstagram';*/

  // Загрузка изображения и показ формы редактирования
  var uploadPopapElement = document.querySelector('.img-upload__overlay');
  var uploadInputElement = document.querySelector('#upload-file');
  var btnCloseUploadElement = uploadPopapElement.querySelector('.img-upload__cancel');
  var textareaElement = uploadPopapElement.querySelector('.text__description');
  var inputHashtagElement = uploadPopapElement.querySelector('.text__hashtags');
  var formElement = document.querySelector('.img-upload__form');

  var submitButtonElement = document.querySelector('#upload-submit');

  var closeUploadOverlay = function () {
    window.utils.hideElement(uploadPopapElement);
    btnCloseUploadElement.removeEventListener('click', closeUploadOverlay);
    document.removeEventListener('keydown', onOverlayKeydownEsc);
    inputHashtagElement.removeEventListener('invalid', hashTagsInvalidHandler);
    inputHashtagElement.removeEventListener('input', hashTagsInvalidHandler);
    formElement.reset();
  };

  var onOverlayKeydownEsc = function (evt) {
    window.utils.isKeydownEsc(evt, closeUploadOverlay);
  };

  var onUploadInputChange = function () {
    window.utils.showElement(uploadPopapElement);
    btnCloseUploadElement.addEventListener('click', closeUploadOverlay);
    document.addEventListener('keydown', onOverlayKeydownEsc);
    inputHashtagElement.addEventListener('invalid', hashTagsInvalidHandler);
    inputHashtagElement.addEventListener('input', hashTagsInvalidHandler);
    window.makeDeafultFilter();
  };

  var onInputFocus = function () {
    document.removeEventListener('keydown', onOverlayKeydownEsc);
  };

  var onInputBlur = function () {
    document.addEventListener('keydown', onOverlayKeydownEsc);
  };

  uploadInputElement.addEventListener('change', onUploadInputChange);
  inputHashtagElement.addEventListener('focus', onInputFocus);
  inputHashtagElement.addEventListener('blur', onInputBlur);
  textareaElement.addEventListener('focus', onInputFocus);
  textareaElement.addEventListener('blur', onInputBlur);

  // Валидация строки с хэш-тегами

  var showInvalidHashTags = function (message) {
    var invalidBorder = 'border-color: #ff4d4d';
    inputHashtagElement.setCustomValidity(message);
    inputHashtagElement.setAttribute('style', invalidBorder);
  };

  var hashTagsInvalidHandler = function () {
    var tags = inputHashtagElement.value.trim().toLowerCase().split(' ');

    if (inputHashtagElement.value.toLowerCase().trim() === '') {
      return;
    }

    if (tags.length > HashtagData.MAX_COUNT) {
      showInvalidHashTags('Нельзя указать больше' + HashtagData.MAX_COUNT + 'хэш-тегов ');
      return;
    }

    var isTagWithoutHash = tags.some(function (item) {
      return item[0] !== '#';
    });

    if (isTagWithoutHash) {
      showInvalidHashTags('Хэш-тег должен начинается с символа #');
      return;
    }

    var isTagContainOnlyHash = tags.some(function (item) {
      return item === '#';
    });

    if (isTagContainOnlyHash) {
      showInvalidHashTags('Хеш-тег не может состоять только из #');
      return;
    }

    var isTagVeryLong = tags.some(function (item) {
      return item.length > HashtagData.MAX_LENGTH;
    });

    if (isTagVeryLong) {
      showInvalidHashTags('Максимальная длина одного хэш-тега 20 символов, включая #');
      return;
    }

    var checkIfArrayIsUnique = function (arr) {
      var myArray = arr.sort();
      for (var i = 0; i < myArray.length; i++) {
        if (myArray.indexOf(myArray[i]) !== myArray.lastIndexOf(myArray[i])) {
          return true;
        }
      }
      return false;
    };

    if (checkIfArrayIsUnique(tags)) {
      showInvalidHashTags('Нельзя дублировать хэш-тег');
      return;
    }

    inputHashtagElement.setCustomValidity('');
    inputHashtagElement.removeAttribute('style');
  };

  /* var onSuccess = function () {
    window.utils.hideElement(uploadPopapElement);
    closeUploadOverlay();
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onSuccess, window.backend.onRequestError, SAVE_URL);
  };*/

  inputHashtagElement.addEventListener('input', hashTagsInvalidHandler);
  submitButtonElement.addEventListener('click', hashTagsInvalidHandler);
  /* formElement.addEventListener('submit', formSubmitHandler);*/

  window.form = {
    uploadPopapElement: uploadPopapElement
  };
})();
