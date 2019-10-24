'use strict';

(function () {
  var COMMENT_STEP = 5;
  var MODAL_OPEN_CLASS = 'modal-open';

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
  var commentTemplate = document.querySelector('.social__comment');
  var btnLoadMore = bigPictureElement.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsList = bigPictureElement.querySelector('.social__comments');

  var closeModal = function () {
    document.body.classList.remove(MODAL_OPEN_CLASS);
    window.utils.hideElement(bigPictureElement);
    document.removeEventListener('keydown', onModalKeydownEsc);
    btnLoadMore.removeEventListener('click', loadComments);
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

  var showCommentsCount = function (comments) {
    var displayedComments = bigPictureElement.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCountElement = displayedComments + ' из ' + '<span class="comments-count">' + comments.length + '</span>' + ' комментариев';
    commentsCount.innerHTML = commentsCountElement;
  };

  var loadComments = function () {
    var commentElements = bigPictureElement.querySelectorAll('.social__comment.visually-hidden');
    var countHiddenElment = commentElements.length > COMMENT_STEP ? COMMENT_STEP : commentElements.length;
    for (var i = 0; i < countHiddenElment; i++) {
      commentElements[i].classList.remove('visually-hidden');
    }
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      btnLoadMore.classList.add('visually-hidden');
    } else {
      btnLoadMore.classList.remove('visually-hidden');
    }
  };

  var createComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var renderComments = function (comments) {
    window.utils.cleanContainer(commentsList);
    var fragment = document.createDocumentFragment();
    comments.forEach(function (currentItem, index) {
      var comment = createComment(currentItem);
      if (index >= COMMENT_STEP) {
        comment.classList.add('visually-hidden');
      }
      fragment.appendChild(comment);
    });
    commentsList.appendChild(fragment);
  };

  var showBigPhoto = function (photo) {
    window.utils.showElement(bigPictureElement);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    document.querySelector('body').classList.add(MODAL_OPEN_CLASS);
    renderComments(photo.comments);
    showCommentsCount(photo.comments);
    btnLoadMore.addEventListener('click', function () {
      loadComments();
      showCommentsCount(photo.comments);
    });
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length >= 1) {
      btnLoadMore.classList.remove('visually-hidden');
    } else {
      btnLoadMore.classList.add('visually-hidden');
    }
    document.addEventListener('keydown', onModalKeydownEsc);
  };

  window.picture = {
    showBigPhoto: showBigPhoto
  };
})();
