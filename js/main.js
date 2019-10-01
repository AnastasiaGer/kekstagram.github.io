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

var HIDDEN_CLASS = 'hidden';

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
  img.src = 'img/avatar-' + getRandomPoint(1, 6) + '.svg';
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

// Загрузка изображения и показ формы редактирования
var uploadPopapElement = document.querySelector('.img-upload__overlay');
var uploadInputElement = document.querySelector('#upload-file');
var btnCloseUploadElement = uploadPopapElement.querySelector('.img-upload__cancel');
var textareaElement = uploadPopapElement.querySelector('.text__description');
var inputHashtagElement = uploadPopapElement.querySelector('.text__hashtags');
var formElement = document.querySelector('.img-upload__form');

var closeUploadOverlay = function () {
  uploadPopapElement.classList.add(HIDDEN_CLASS);
  btnCloseUploadElement.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onOverlayKeydownEsc);
  formElement.reset();
};

var onOverlayKeydownEsc = function (evt) {
  window.util.isKeydownEsc(evt, closeUploadOverlay);
};

var onUploadInputChange = function () {
  uploadPopapElement.classList.remove(HIDDEN_CLASS);
  btnCloseUploadElement.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', onOverlayKeydownEsc);
  makeDeafultFilter();
};

var onInputFocus = function () {
  document.removeEventListener('keydown', onOverlayKeydownEsc);
};

var onInputBlur = function () {
  document.addEventListener('keydown', onOverlayKeydownEsc);
};

uploadInputElement.addEventListener('change', onUploadInputChange);
inputHashtagElement.addEventListener('focus', onInputFocus);
inputHashtagElement.addEventListener('blur', onInputBlur);
textareaElement.addEventListener('focus', onInputFocus);
textareaElement.addEventListener('blur', onInputBlur);

// масштабирование редактируемого изображения
var MIN_RESIZE = 25;
var MAX_RESIZE = 100;
var STEP_RESIZE = 25;

var resize = document.querySelector('.scale__control--value');
var resizeSmaller = document.querySelector('.scale__control--smaller');
var resizeBigger = document.querySelector('.scale__control--bigger');

var getCurentSizeNumber = function () {
  return Number(resize.value.slice(0, -1));
};

var sizeMinusHandler = function () {
  var newSizeNumber = getCurentSizeNumber() - STEP_RESIZE;
  resize.value = newSizeNumber + '%';
  UPLOAD_PREVIEW.style = 'transform: scale(' + (newSizeNumber / 100) + ')';
};

var sizePlusHandler = function () {
  var newSizeNumber = getCurentSizeNumber() + STEP_RESIZE;
  resize.value = newSizeNumber + '%';
  UPLOAD_PREVIEW.style = 'transform: scale(' + (newSizeNumber / 100) + ')';
};

resizeSmaller.addEventListener('click', function () {
  if (getCurentSizeNumber() > MIN_RESIZE) {
    sizeMinusHandler();
  }
});

resizeBigger.addEventListener('click', function () {
  if (getCurentSizeNumber() < MAX_RESIZE) {
    sizePlusHandler();
  }
});

// наложение фильтров на редактируемоге изображение
var PinPosition = {
  MIN: 0,
  MAX: 450
};

var FilterCss = {
  none: {
    class: 'effects__preview--none'
  },
  chrome: {
    class: 'effects__preview--chrome',
    css: 'grayscale',
    max: 1,
    min: 0
  },
  sepia: {
    class: 'effects__preview--sepia',
    css: 'sepia',
    max: 1,
    min: 0
  },
  marvin: {
    class: 'effects__preview--marvin',
    css: 'invert',
    max: 100,
    min: 0,
    postFix: '%'
  },
  phobos: {
    class: 'effects__preview--phobos',
    css: 'blur',
    max: 3,
    min: 0,
    postFix: 'px'
  },
  heat: {
    class: 'effects__preview--heat',
    css: 'brightness',
    max: 3,
    min: 1
  }
};
var UPLOAD_PREVIEW = document.querySelector('.img-upload__preview');
var effectValueElement = document.querySelector('[name="effect-level"]');
var lineElement = document.querySelector('.effect-level__line');
var pinElement = document.querySelector('.effect-level__pin');
var lineDepthElement = document.querySelector('.effect-level__depth');
var blockPinElement = document.querySelector('.img-upload__effect-level');
var effectListElement = document.querySelector('.effects__list');

var makeValueFilter = function (value) {
  pinElement.style.left = value + 'px';
  lineElement.style.width = value + 'px';
  lineDepthElement.style.width = value + 'px';
};

var filterChange = function (max, min, filter, position, filterPostfix) {
  var postFix = filterPostfix || '';
  var value = (max - min) * (position / PinPosition.MAX) + min;
  var change = '' + filter + '(' + value + postFix + ')';

  UPLOAD_PREVIEW.style.filter = change;
  effectValueElement.value = value;
};

pinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var selectedFilter = document.querySelector('input[type="radio"]:checked').value;
  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    var position = pinElement.offsetLeft - shift;
    startCoords = moveEvt.clientX;

    if (position <= PinPosition.MIN) {
      position = PinPosition.MIN;
    }

    if (position > PinPosition.MAX) {
      position = PinPosition.MAX;
    }

    makeValueFilter(position);
    filterChange(FilterCss[selectedFilter].max, FilterCss[selectedFilter].min, FilterCss[selectedFilter].css, position, FilterCss[selectedFilter].postFix);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var cheskScaleShow = function (elem) {
  if (elem.value === 'none') {
    blockPinElement.classList.add(HIDDEN_CLASS);
  } else {
    blockPinElement.classList.remove(HIDDEN_CLASS);
  }
};

effectListElement.addEventListener('click', function (evt) {
  var toggler = evt.target.closest('input');
  if (toggler) {
    makeValueFilter(PinPosition.MAX);
    UPLOAD_PREVIEW.classList = 'img-upload__preview';
    UPLOAD_PREVIEW.removeAttribute('style');
    UPLOAD_PREVIEW.classList.add(FilterCss[toggler.value].class);
    cheskScaleShow(toggler);
  }
});

var makeDeafultFilter = function () {
  makeValueFilter(PinPosition.MAX);
  UPLOAD_PREVIEW.removeAttribute('style');
  blockPinElement.classList.add(HIDDEN_CLASS);
  UPLOAD_PREVIEW.classList = 'img-upload__preview';
};

// Валидация строки с хэш-тегами
var submitButtonElement = document.querySelector('#upload-submit');

var HashtagData = {
  START_POSITION: 0,
  MAX_COUNT: 5,
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  VALID_POSITION: 1
};

var Message = {
  HASHTAG_START: 'Хэш-тег начинается с символа #',
  HASHTAG_MIN_SYMBOL: 'Хеш-тег не может состоять только из одной решётки',
  HASHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ',
  HASHTAG_VALUE_INCLUSIVE: ' имволов, включая решётку',
  HASHTAG_NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  HASHTAG_MAX_NUMBER: 'Хэштегов может быть максимум ',
  HASHTAG_SEPARATOR: 'Хэш-теги разделяются пробелами'
};

var validateHashtag = function (hashtag) {
  if (hashtag[HashtagData.START_POSITION] !== '#') {
    inputHashtagElement.setCustomValidity(Message.HASHTAG_START);
    return false;
  } else if (hashtag.length < HashtagData.MIN_LENGTH) {
    inputHashtagElement.setCustomValidity(Message.HASHTAG_MIN_SYMBOL);
    return false;
  } else if (hashtag.length > HashtagData.MAX_LENGTH) {
    inputHashtagElement.setCustomValidity(Message.HASHTAG_MAX_LENGTH + HashtagData.MAX_LENGTH + Message.HASHTAG_VALUE_INCLUSIVE);
    return false;
  } else if (hashtag.indexOf('#', HashtagData.VALID_POSITION) > 0) {
    inputHashtagElement.setCustomValidity(Message.HASHTAG_SEPARATOR);
    return false;
  }
  return true;
};

var onSubmitButtonClick = function (evt) {
  if (inputHashtagElement.value !== '') {
    var hashtagArray = inputHashtagElement.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtagArray.length; i++) {
      var isHashtagValid = validateHashtag(hashtagArray[i]);
      if (!isHashtagValid) {
        break;
      }
      var positionNextHashtag = i + 1;
      if (hashtagArray.indexOf(hashtagArray[i], positionNextHashtag) > 0) {
        inputHashtagElement.setCustomValidity(Message.HASHTAG_NO_REPEAT);
        break;
      }
    }
    if (hashtagArray.length > HashtagData.MAX_COUNT) {
      inputHashtagElement.setCustomValidity(Message.HASHTAG_MAX_NUMBER + HashtagData.MAX_COUNT);
    }
  }

  if (!inputHashtagElement.validationMessage) {
    evt.preventDefault();
  }
};

var onHashtagInput = function () {
  inputHashtagElement.setCustomValidity('');
};

submitButtonElement.addEventListener('click', onSubmitButtonClick);
inputHashtagElement.addEventListener('input', onHashtagInput);

var init = function () {
  var photos = getPhotos(PHOTOS_NUMBER);
  var picturesElements = renderPhotosArr(photos);
  pictures.appendChild(picturesElements);
  showBigPhoto(photos[0]);
};

init();
