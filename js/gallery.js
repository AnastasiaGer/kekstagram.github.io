'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var renderPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.addEventListener('click', function () {
      window.picture.showBigPhoto(photo);
    });
    pictureElement.addEventListener('keydown', function () {
      window.picture.showBigPhoto(photo);
    });
    return pictureElement;
  };

  var renderPhotosArr = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesElement.appendChild(fragment);
  };

  var onRequestError = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var uploadPopapElement = document.querySelector('.img-upload__overlay');
    window.utils.hideElement(uploadPopapElement);
    var uploadErrorElement = errorMessageTemplate.cloneNode(true);
    document.body.appendChild(uploadErrorElement);
    window.utils.showElement(uploadErrorElement);

    var requestErrorMessageElement = document.querySelector('.error');
    var btnCloseOnRequestErrorElement = requestErrorMessageElement.querySelectorAll('.error__button');

    var onDocumentBodyClick = function () {
      document.body.removeChild(requestErrorMessageElement);
      document.body.removeEventListener('click', onDocumentBodyClick);
    };

    document.body.addEventListener('click', onDocumentBodyClick);

    var onDocumentBodyKeydown = function (evt) {
      window.utils.performCallbackIfKeydownEsc(evt, function () {
        document.body.removeChild(requestErrorMessageElement);
        document.body.removeEventListener('keydown', onDocumentBodyKeydown);
      });
    };

    document.addEventListener('keydown', onDocumentBodyKeydown);

    btnCloseOnRequestErrorElement.addEventListener('click', function () {
      document.body.removeChild(requestErrorMessageElement);
    });
  };

  window.gallery = {
    renderPhotosArr: renderPhotosArr,
    onRequestError: onRequestError
  };
})();
