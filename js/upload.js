'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserElement = document.querySelector('#upload-file');
  var uploadPreviewElement = document.querySelector('.img-upload__preview img');

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
