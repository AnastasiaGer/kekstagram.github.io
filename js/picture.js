'use strict';

(function () {
  var hideItem = function (item) {
    item.classList.add('visually-hidden');
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.isKeydownEsc) {
      document.body.classList.remove('modal-open');
      window.utils.hideElement(bigPictureElement);
    }
  });

  bigPictureCancelElement.addEventListener('click', function () {
    document.body.classList.remove('modal-open');
    window.utils.hideElement(bigPictureElement);
  });

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

  window.picture = {
    showBigPhoto: showBigPhoto,
  };

})();
