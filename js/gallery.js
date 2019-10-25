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

    var onRenderPhotoKeydown = function (evt) {
      window.utils.performCallbackIfKeydownEnter(evt, function () {
        window.picture.showBigPhoto(photo);
        document.body.removeEventListener('keydown', onRenderPhotoKeydown);
      });
    };

    pictureElement.addEventListener('keydown', onRenderPhotoKeydown);

    return pictureElement;
  };

  var renderPhotosArr = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesElement.appendChild(fragment);
  };

  window.gallery = {
    renderPhotosArr: renderPhotosArr
  };
})();
