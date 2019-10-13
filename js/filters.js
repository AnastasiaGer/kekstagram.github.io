'use strict';

(function () {
  var PHOTOS_NUMBER = 10;
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var photoFilterElement = document.querySelector('.img-filters');
  var photoFilterFormElement = photoFilterElement.querySelector('.img-filters__form');
  var photoFiltersButtonElement = photoFilterElement.querySelectorAll('.img-filters__button');
  var photos = [];

  var removePhoto = function () {
    var photoBox = document.querySelector('.pictures');
    var photo = photoBox.querySelectorAll('.picture__link');
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

  var sortPopular = function () {
    window.gallery.renderPhotosArr(photos.slice().sort(function (left, right) {
      return right.likes - left.likes;
    }));
  };

  var sortDiscussed = function () {
    window.gallery.renderPhotosArr(photos.slice().sort(function (left, right) {
      return right.comments - left.comments;
    }));
  };

  var sortRandom = function () {
    window.gallery.renderPhotosArr(photos.slice().sort(function () {
      return window.utils.getRandomPoint(0, 100) - window.utils.getRandomPoint(0, 100);
    }));
  };

  var photoSorting = function () {
    photoFilterElement.classList.remove('img-filters--inactive');
    photoFilterFormElement.addEventListener('click', window.debounce(function (evt) {
      removeActiveFilter();
      evt.target.classList.add('img-filters__button--active');
      removePhoto();
      if (evt.target.id === 'filter-random') {
        var randomPhotos = sortRandom(photos, PHOTOS_NUMBER);
        window.gallery.renderPhotosArr(randomPhotos);
      } else if (evt.target.id === 'filter-popular') {
        var popularPhotos = sortPopular(photos);
        window.gallery.renderPhotosArr(popularPhotos);
      } else if (evt.target.id === 'filter-discussed') {
        var discussedPhotos = sortDiscussed(photos);
        window.gallery.renderPhotosArr(discussedPhotos);
      }
    }));
  };

  var onLoad = function (data) {
    photos = data;
    window.gallery.renderPhotosArr(photos);
    photoSorting();
  };

  window.backend.load(onLoad, window.gallery.onRequestError, LOAD_URL);
})();
