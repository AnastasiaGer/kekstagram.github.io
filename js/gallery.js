'use strict';

(function () {

  var PHOTOS_NUMBER = 25;

  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';

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
    for (var i = 0; i < PHOTOS_NUMBER; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesElement.appendChild(fragment);
  };

  window.backend.load(renderPhotosArr, window.backend.onRequestError, LOAD_URL);

})();
