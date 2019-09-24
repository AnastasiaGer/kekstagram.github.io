'use strict';

var showItem = function (item) {
  return item.classList.remove('hidden');
};

var hideItem = function (item) {
  return item.classList.add('visually-hidden');
};

var getRandomPoint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  return showBigPhoto;
};

var init = function () {
  showBigPhoto();
  showItem();
};

init();
