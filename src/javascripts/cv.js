// CV page behavior: inline PDF frame gating and the EN/VI language toggle.
(function () {
  'use strict';

  /* iOS and iPadOS Safari cannot render PDFs inside <object>, and trackpad
     iPads report a fine pointer, so the pointer:coarse media query misses
     them. The PDF data attribute is only assigned when inline rendering is
     viable, so touch devices and narrow viewports never download cv.pdf
     just to hide it. */
  var userAgent = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var coarseOrNarrow = window.matchMedia('(pointer: coarse), (max-width: 768px)');
  var pdfObject = document.querySelector('.pdf-frame object');

  if (pdfObject) {
    if (isIOS || coarseOrNarrow.matches) {
      document.documentElement.classList.add('inline-pdf-unsupported');
    } else {
      pdfObject.setAttribute('data', 'cv.pdf');
    }
  }

  /* Vietnamese text lives in data-text-* attributes; setLang swaps the
     visible text and flips the .show-when-en / .show-when-vi paragraphs. */
  var isVi = (navigator.language || '').substr(0, 2) === 'vi';

  function setLang() {
    var key = isVi ? 'textVi' : 'textEn';

    var i18nElements = document.getElementsByClassName('i18n');
    for (var i = 0; i < i18nElements.length; i++) {
      var element = i18nElements[i];
      if (key in element.dataset) {
        element.innerText = element.dataset[key];
      }
    }

    setClassDisplay('show-when-en', isVi ? 'none' : 'inherit');
    setClassDisplay('show-when-vi', isVi ? 'inherit' : 'none');
  }

  function setClassDisplay(className, value) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = value;
    }
  }

  var toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      isVi = !isVi;
      setLang();
    });
  }

  setLang();
})();
