'use strict';

(function () {
  var makeXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    return xhr;
  };

  var onRequestError = function () {
    window.utils.hideElement(window.form.uploadPopapElement);
    var errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
    var uploadErrorElement = errorMessageTemplateElement.cloneNode(true);
    document.body.appendChild(uploadErrorElement);
    window.utils.showElement(uploadErrorElement);

    document.body.addEventListener('click', function () {
      document.body.removeChild(uploadErrorElement);
    });
  };

  window.backend = {
    load: function (onSuccess, onError, url) {
      var xhr = makeXHR(onSuccess, onError);
      xhr.open('GET', url);
      xhr.send();
    },
    save: function (data, onSuccess, onError, url) {
      var xhr = makeXHR(onSuccess, onError, url);
      xhr.open('POST', url);
      xhr.send(data);
    },
    onRequestError: onRequestError
  };
})();
