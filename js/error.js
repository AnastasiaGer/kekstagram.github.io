'use strict';

(function () {
  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var mainElement = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var uploadPopapElement = document.querySelector('.img-upload__overlay');
  var uploadErrorElement = errorMessageTemplate.cloneNode(true);

  var closeRequestError = function () {
    uploadErrorElement.remove();
    document.removeEventListener('keydown', onDocumentBodyKeydown);
    uploadErrorElement.querySelector('.error__button').removeEventListener('click', onBtnCloseOnRequestErrorClickOne);
    uploadErrorElement.querySelector('.error__button').removeEventListener('click', onBtnCloseOnRequestErrorClickTwo);
    document.removeEventListener('click', onDocumentBodyClick);
  };

  var onDocumentBodyClick = function () {
    closeRequestError();
  };

  var onDocumentBodyKeydown = function (evt) {
    window.utils.performCallbackIfKeydownEsc(evt, closeRequestError);
  };

  var onBtnCloseOnRequestErrorClickOne = function () {
    window.backend.save(new FormData(window.form.formElement), window.success.onSuccess, onSaveRequestError, SAVE_URL);
    closeRequestError();
    window.form.formElement.reset();
  };

  var onBtnCloseOnRequestErrorClickTwo = function () {
    window.backend.load(window.filters.onLoad, onLoadRequestError, LOAD_URL);
    closeRequestError();
  };

  var onLoadRequestError = function () {
    window.utils.hideElement(uploadPopapElement);
    mainElement.appendChild(uploadErrorElement);

    uploadErrorElement.querySelector('.error__button').addEventListener('click', onBtnCloseOnRequestErrorClickTwo);

    document.body.addEventListener('click', onDocumentBodyClick);
    document.addEventListener('keydown', onDocumentBodyKeydown);
  };

  var onSaveRequestError = function () {
    window.utils.hideElement(uploadPopapElement);
    mainElement.appendChild(uploadErrorElement);

    uploadErrorElement.querySelector('.error__button').addEventListener('click', onBtnCloseOnRequestErrorClickOne);

    document.body.addEventListener('click', onDocumentBodyClick);
    document.addEventListener('keydown', onDocumentBodyKeydown);
  };

  window.error = {
    onLoadRequestError: onLoadRequestError,
    onSaveRequestError: onSaveRequestError
  };

})();
