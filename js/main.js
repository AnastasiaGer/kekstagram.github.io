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

var closeBigPhoto = function () {
  var bigPic = document.querySelector('.big-picture');
  document.querySelector('body').classList.remove('modal-open');
  return bigPic.classList.add('hidden');
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
  var closeButton = bigPicture.querySelector('#picture-cancel');
  showItem(bigPicture);
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  hideItem(bigPicture.querySelector('.social__comment-count'));
  hideItem(bigPicture.querySelector('.comments-loader'));
  closeButton.addEventListener('click', closeBigPhoto);
  commentsBox.appendChild(createComments());
};

// Загрузка изображения и показ формы редактирования
var uploadPopap = document.querySelector('.img-upload__overlay');
var uploadInput = document.querySelector('#upload-file');
var btnCloseUpload = uploadPopap.querySelector('.img-upload__cancel');
var textarea = uploadPopap.querySelector('.text__description');
var inputHashtag = uploadPopap.querySelector('.text__hashtags');
var form = document.querySelector('.img-upload__form');

var closeUploadOverlay = function () {
  uploadPopap.classList.add('hidden');
  btnCloseUpload.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onOverlayKeydownEsc);
  form.reset();
};

var onOverlayKeydownEsc = function (evt) {
  window.util.isKeydownEsc(evt, closeUploadOverlay);
};

var onUploadInputChange = function () {
  uploadPopap.classList.remove('hidden');
  btnCloseUpload.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', onOverlayKeydownEsc);
  makeDeafultFilter();
};

var onInputFocus = function () {
  document.removeEventListener('keydown', onOverlayKeydownEsc);
};

var onInputBlur = function () {
  document.addEventListener('keydown', onOverlayKeydownEsc);
};

uploadInput.addEventListener('change', onUploadInputChange);
inputHashtag.addEventListener('focus', onInputFocus);
inputHashtag.addEventListener('blur', onInputBlur);
textarea.addEventListener('focus', onInputFocus);
textarea.addEventListener('blur', onInputBlur);

// масштабирование редактируемого изображения
var MIN_RESIZE = 25;
var MAX_RESIZE = 100;
var STEP_RESIZE = 25;

var uploadImg = document.querySelector('.img-upload__preview');
var resize = document.querySelector('.scale__control--value');
var resizeSmaller = document.querySelector('.scale__control--smaller');
var resizeBigger = document.querySelector('.scale__control--bigger');

var getCurentSizeNumber = function () {
  return Number(resize.value.slice(0, -1));
};

var sizeMinusHandler = function () {
  var newSizeNumber = getCurentSizeNumber() - STEP_RESIZE;
  resize.value = newSizeNumber + '%';
  uploadImg.style = 'transform: scale(' + (newSizeNumber / 100) + ')';
};

var sizePlusHandler = function () {
  var newSizeNumber = getCurentSizeNumber() + STEP_RESIZE;
  resize.value = newSizeNumber + '%';
  uploadImg.style = 'transform: scale(' + (newSizeNumber / 100) + ')';
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
var pinPosition = {
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

var preview = document.querySelector('.img-upload__preview');
var effectValue = document.querySelector('[name="effect-level"]');
var line = document.querySelector('.effect-level__line');
var pin = document.querySelector('.effect-level__pin');
var blockPin = document.querySelector('.img-upload__effect-level');
var effectList = document.querySelector('.effects__list');

var makeValueFilter = function (value) {
  pin.style.left = value + 'px';
  line.style.width = value + 'px';
};

var filterChange = function (max, min, filter, position, filterPostfix) {
  var postFix = filterPostfix || '';
  var value = (max - min) * (position / pinPosition.MAX) + min;
  var change = '' + filter + '(' + value + postFix + ')';

  preview.style.filter = change;
  effectValue.value = value;
};

pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var selectedFilter = document.querySelector('input[type="radio"]:checked').value;
  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    var position = pin.offsetLeft - shift;
    startCoords = moveEvt.clientX;

    if (position <= pinPosition.MIN) {
      position = pinPosition.MIN;
    }

    if (position > pinPosition.MAX) {
      position = pinPosition.MAX;
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
  return elem.value !== 'none' ? blockPin.classList.remove('hidden') : blockPin.classList.add('hidden');
};

effectList.addEventListener('click', function (evt) {
  var toggler = evt.target.closest('input');
  if (toggler) {
    makeValueFilter(pinPosition.MAX);
    preview.classList = 'img-upload__preview';
    preview.removeAttribute('style');
    preview.classList.add(FilterCss[toggler.value].class);
    cheskScaleShow(toggler);
  }
});

var makeDeafultFilter = function () {
  makeValueFilter(pinPosition.MAX);
  preview.removeAttribute('style');
  blockPin.classList.add('hidden');
  preview.classList = 'img-upload__preview';
};

// Валидация строки с хэш-тегами
var submitButton = document.querySelector('#upload-submit');

var HestagData = {
  START_POSITION: 0,
  MAX_COUNT: 5,
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  VALID_POSITION: 1
};

var Message = {
  HESTAG_START: 'Хэш-тег начинается с символа #',
  HESTAG_MIN_SYMBOL: 'Хеш-тег не может состоять только из одной решётки',
  HESTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ',
  HESTAG_VALUE_INCLUSIVE: ' имволов, включая решётку',
  HESTAG_NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
  HESTAG_MAX_NUMBER: 'Хэштегов может быть максимум ',
  HESTAG_SEPARATOR: 'Хэш-теги разделяются пробелами'
};

var validateHashtag = function (hashtag) {
  if (hashtag[HestagData.START_POSITION] !== '#') {
    inputHashtag.setCustomValidity(Message.HESTAG_START);
    return false;
  } else if (hashtag.length < HestagData.MIN_LENGTH) {
    inputHashtag.setCustomValidity(Message.HESTAG_MIN_SYMBOL);
    return false;
  } else if (hashtag.length > HestagData.MAX_LENGTH) {
    inputHashtag.setCustomValidity(Message.HESTAG_MAX_LENGTH + HestagData.MAX_LENGTH + Message.HESTAG_VALUE_INCLUSIVE);
    return false;
  } else if (hashtag.indexOf('#', HestagData.VALID_POSITION) > 0) {
    inputHashtag.setCustomValidity(Message.HESTAG_SEPARATOR);
    return false;
  }
  return true;
};

var onSubmitButtonClick = function (evt) {
  if (inputHashtag.value !== '') {
    var hashtagArray = inputHashtag.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtagArray.length; i++) {
      var isHashtagValid = validateHashtag(hashtagArray[i]);
      if (!isHashtagValid) {
        break;
      }
      var positionNextHashtag = i + 1;
      if (hashtagArray.indexOf(hashtagArray[i], positionNextHashtag) > 0) {
        inputHashtag.setCustomValidity(Message.HESTAG_NO_REPEAT);
        break;
      }
    }
    if (hashtagArray.length > HestagData.MAX_COUNT) {
      inputHashtag.setCustomValidity(Message.HESTAG_MAX_NUMBER + HestagData.MAX_COUNT);
    }
  }

  if (!inputHashtag.validationMessage) {
    evt.preventDefault();
  }
};

var onInputInput = function () {
  inputHashtag.setCustomValidity('');
};

submitButton.addEventListener('click', onSubmitButtonClick);
inputHashtag.addEventListener('input', onInputInput);

var init = function () {
  var photos = getPhotos(PHOTOS_NUMBER);
  var picturesElements = renderPhotosArr(photos);
  pictures.appendChild(picturesElements);
  showBigPhoto(photos[0]);
  closeUploadOverlay();
  makeDeafultFilter();
};

init();
