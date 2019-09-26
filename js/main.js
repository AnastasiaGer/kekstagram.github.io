'use strict';

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

var Likes = {
  MIN: 15,
  MAX: 200
};

var PHOTOS_NUMBER = 25;

var templateElement = document.querySelector('#picture').content;
var pictures = document.querySelector('.pictures');

var getRandomPoint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  var randomindex = Math.floor(Math.random() * arr.length);
  return arr[randomindex];
};

var getPhotos = function (photosNumber) {
  var photos = [];
  for (var i = 0; i < photosNumber; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomPoint(Likes.MIN, Likes.MAX),
      comments: getRandomElement(COMMENTS),
      description: getRandomElement(DESCRIPTIONS)
    };
  }
  return photos;
};

var renderPhoto = function (photo) {
  var pictureElement = templateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  return pictureElement;
};

var renderPhotosArr = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  return fragment;
};

var showItem = function (item) {
  item.classList.remove('hidden');
};

var hideItem = function (item) {
  item.classList.add('visually-hidden');
};

var createComments = function () {
  var comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.classList.add('social__text');
  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + getRandomPoint(1, 6) + '.svg';
  img.alt = 'Автор комментария';
  img.width = 35;
  img.height = 35;
  comment.appendChild(img);
  return comment;
};

var showBigPhoto = function (data) {
  var bigPicture = document.querySelector('.big-picture');
  var commentsBox = bigPicture.querySelector('.social__comments');
  showItem(bigPicture);
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  hideItem(bigPicture.querySelector('.social__comment-count'));
  hideItem(bigPicture.querySelector('.comments-loader'));
  commentsBox.appendChild(createComments());
};

var init = function () {
  var photos = getPhotos(PHOTOS_NUMBER);
  var picturesElements = renderPhotosArr(photos);
  pictures.appendChild(picturesElements);
  showBigPhoto(photos[0]);
};

init();
