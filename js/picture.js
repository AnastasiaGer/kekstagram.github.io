'use strict';

(function () {
  var HIDDEN_CLASS = 'hidden';

  var showItem = function (item) {
    item.classList.remove(HIDDEN_CLASS);
  };

  var hideItem = function (item) {
    item.classList.add('visually-hidden');
  };

  var closeBigPhoto = function () {
    var bigPicElement = document.querySelector('.big-picture');
    document.querySelector('body').classList.remove('modal-open');
    bigPicElement.classList.add(HIDDEN_CLASS);
  };

  var createComments = function () {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.classList.add('social__text');
    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = 'img/avatar-' + window.utils.getRandomPoint(1, 6) + '.svg';
    img.alt = 'Автор комментария';
    img.width = 35;
    img.height = 35;
    comment.appendChild(img);
    return comment;
  };

  var showBigPhoto = function (data) {
    var bigPictureElement = document.querySelector('.big-picture');
    var commentsBox = bigPictureElement.querySelector('.social__comments');
    var closeButton = bigPictureElement.querySelector('#picture-cancel');
    showItem(bigPictureElement);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = data.url;
    bigPictureElement.querySelector('.likes-count').textContent = data.likes;
    bigPictureElement.querySelector('.comments-count').textContent = data.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = data.description;
    hideItem(bigPictureElement.querySelector('.social__comment-count'));
    hideItem(bigPictureElement.querySelector('.comments-loader'));
    closeButton.addEventListener('click', closeBigPhoto);
    commentsBox.appendChild(createComments());
  };

  showBigPhoto(window.gallery.photos[0]);

  window.picture = {
    showBigPhoto: showBigPhoto,
    showItem: showItem
  };

})();
