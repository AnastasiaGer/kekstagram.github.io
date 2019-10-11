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
    document.removeEventListener('keydown', onModalKeydownEsc);
  };

  var onModalKeydownEsc = function (evt) {
    window.utils.performCallbackIfKeydownEsc(evt, closeModal);
  };

  bigPictureCancelElement.addEventListener('click', function () {
    closeModal();
  });

  bigPictureCancelElement.addEventListener('keydown', function () {
    closeModal();
  });

  var onpictureElementKeydowEnter = function (evt) {
    window.utils.performCallbackIfKeydownEnter(evt, showBigPhoto);
  };

  bigPictureElement.addEventListener('keydown', function () {
    showBigPhoto();
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
    var commentsBox = bigPictureElement.querySelector('.social__comments');
    window.utils.showElement(bigPictureElement);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = data.url;
    bigPictureElement.querySelector('.likes-count').textContent = data.likes;
    bigPictureElement.querySelector('.comments-count').textContent = data.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = data.description;
    hideItem(bigPictureElement.querySelector('.social__comment-count'));
    hideItem(bigPictureElement.querySelector('.comments-loader'));
    document.querySelector('body').classList.add(MODAL_OPEN_CLASS);
    document.addEventListener('keydown', onpictureElementKeydowEnter);
    document.addEventListener('keydown', onModalKeydownEsc);
    commentsBox.appendChild(createComments());
  };

  window.picture = {
    showBigPhoto: showBigPhoto
  };
})();
