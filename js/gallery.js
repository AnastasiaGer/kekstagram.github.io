'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTIONS = [
    'Товарищи! консультация с широким активом способствует подготовки и реализации систем массового участия.',
    'Повседневная практика показывает, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач.',
    'Повседневная практика показывает, что сложившаяся структура организации позволяет оценить значение форм развития.',
    'Задача организации, в особенности же начало повседневной работы по формированию позиции играет важную роль в формировании систем массового участия.',
    'Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.',
    'Не следует, однако забывать, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям.'
  ];

  var PHOTOS_NUMBER = 25;
  var Likes = {
    MIN: 15,
    MAX: 200
  };
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var getPhotos = function (photosNumber) {
    var photos = [];
    for (var i = 0; i < photosNumber; i++) {
      photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utils.getRandomPoint(Likes.MIN, Likes.MAX),
        comments: window.utils.getRandomElement(COMMENTS),
        description: window.utils.getRandomElement(DESCRIPTIONS)
      };
    }
    return photos;
  };

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
    return fragment;
  };

  var onLoad = function (data) {
    window.gallery.photos = data.slice(0);
    renderPhotosArr(window.gallery.photos);
  };

  window.backend.load(onLoad, window.backend.onRequestError, LOAD_URL);

  var init = function () {
    var photos = getPhotos(PHOTOS_NUMBER);
    var picturesElements = renderPhotosArr(photos);
    picturesElement.appendChild(picturesElements);
  };

  init();

  window.gallery = {
    photos: []
  };

})();
