'use strict';
(function () {
  var mainElement = document.querySelector('main');
  var uploadPopapElement = document.querySelector('.img-upload__overlay');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var uploadSuccessElement = successMessageTemplate.cloneNode(true);

  var closeSuccess = function () {
    uploadSuccessElement.remove();
    document.removeEventListener('keydown', onDocumentBodyKeydown);
    document.removeEventListener('click', onBtnCloseOnSuccessElementClick);
    document.removeEventListener('click', onDocumentBodyClick);
  };

  var onDocumentBodyClick = function () {
    closeSuccess();
  };

  var onDocumentBodyKeydown = function (evt) {
    window.utils.performCallbackIfKeydownEsc(evt, closeSuccess);
  };

  var onBtnCloseOnSuccessElementClick = function () {
    closeSuccess();
  };

  var onSuccess = function () {
    window.utils.hideElement(uploadPopapElement);
    mainElement.appendChild(uploadSuccessElement);

    uploadSuccessElement.querySelector('.success__button').addEventListener('click', onBtnCloseOnSuccessElementClick);
    document.body.addEventListener('click', onDocumentBodyClick);
    document.addEventListener('keydown', onDocumentBodyKeydown);

    window.form.formElement.reset();
  };

  window.success = {
    onSuccess: onSuccess
  };

})();
