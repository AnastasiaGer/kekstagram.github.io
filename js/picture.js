'use strict';

(function () {

  var MODAL_OPEN_CLASS = 'modal-open';
  var hideItem = function (item) {
    item.classList.add('visually-hidden');
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

  var closeModal = function () {
    document.body.classList.remove(MODAL_OPEN_CLASS);
    window.utils.hideElement(bigPictureElement);
  };

  document.addEventListener('keydown', function (evt) {
    window.utils.isKeydownEsc(evt, closeModal);
  });

  bigPictureCancelElement.addEventListener('click', function () {
    closeModal();
  });

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
    window.utils.showElement(bigPictureElement);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = data.url;
    bigPictureElement.querySelector('.likes-count').textContent = data.likes;
    bigPictureElement.querySelector('.comments-count').textContent = data.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = data.description;
    var commentsBox = bigPictureElement.querySelector('.social__comments');
    hideItem(bigPictureElement.querySelector('.social__comment-count'));
    hideItem(bigPictureElement.querySelector('.comments-loader'));
    document.body.classList.add('modal-open');
    commentsBox.appendChild(createComments());
  };

  showBigPhoto(window.gallery.photos[0]);

  window.picture = {
    showBigPhoto: showBigPhoto,
  };

})();
