'use strict';

(function () {
  var COMMENT_TOTAL = 5;
  var MODAL_OPEN_CLASS = 'modal-open';
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
  var commentsBox = bigPictureElement.querySelector('.social__comments');
  var socialCommentElement = document.querySelector('.social__comment');
  var newComments = [];

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

  var removeCommentList = function () {
    commentsBox.innerHTML = '';
  };

  var loadMoreComments = function (callback) {
    var btnLoadMore = bigPictureElement.querySelector('.social__loadmore');
    btnLoadMore.addEventListener('click', window.debounce(function () {
    }));
    callback();
  };

  var createComments = function (photo) {
    var commentsArrayLength = photo.comments.length > COMMENT_TOTAL ? COMMENT_TOTAL : photo.comments.length;
    for (var i = 0; i < commentsArrayLength; i++) {
      var comment = socialCommentElement.cloneNode(true);
      comment.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomPoint(1, 6) + '.svg';
      comment.querySelector('.social__text').textContent = photo.comments[i];

      newComments.push(comment);
    }

    return newComments;
  };

  var showBigPhoto = function (photo) {
    window.utils.showElement(bigPictureElement);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    document.querySelector('body').classList.add(MODAL_OPEN_CLASS);
    document.addEventListener('keydown', onpictureElementKeydowEnter);
    document.addEventListener('keydown', onModalKeydownEsc);
    removeCommentList();
    createComments(photo);
    loadMoreComments(createComments(photo));
  };

  window.picture = {
    showBigPhoto: showBigPhoto
  };
})();
