'use strict';

(function () {
  var PHOTOS_NUMBER = 10;
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var photoFilterElement = document.querySelector('.img-filters');
  var photoFilterFormElement = photoFilterElement.querySelector('.img-filters__form');
  var photoFiltersButtonElement = photoFilterElement.querySelectorAll('.img-filters__button');
  var photos = [];

  var removePhotos = function () {
    var photoBox = document.querySelector('.pictures');
    var photo = photoBox.querySelectorAll('.picture');
    photo.forEach(function (item) {
      photoBox.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    photoFiltersButtonElement.forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  var sortDiscussed = function () {
    return photos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };

  var sortRandom = function (data) {
    var newPhotoArray = data.slice();
    newPhotoArray.length = PHOTOS_NUMBER;
    var newPhotos = newPhotoArray;
    newPhotos = window.utils.getShuffled(newPhotos);
    return newPhotos;
  };

  var sortPhoto = function () {
    photoFilterElement.classList.remove('img-filters--inactive');
    photoFilterFormElement.addEventListener('click', window.debounce(function (evt) {
      removeActiveFilter();
      evt.target.classList.add('img-filters__button--active');
      removePhotos();
      if (evt.target.id === 'filter-random') {
        var randomPhotos = sortRandom(photos);
        window.gallery.renderPhotosArr(randomPhotos);
      } else if (evt.target.id === 'filter-popular') {
        window.gallery.renderPhotosArr(photos);
      } else if (evt.target.id === 'filter-discussed') {
        var discussedPhotos = sortDiscussed();
        window.gallery.renderPhotosArr(discussedPhotos);
      }
    }));
  };

  var onLoad = function (data) {
    photos = data;
    window.gallery.renderPhotosArr(photos);
    sortPhoto();
  };

  window.backend.load(onLoad, window.gallery.onRequestError, LOAD_URL);
})();
