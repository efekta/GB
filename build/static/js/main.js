"use strict";

$(document).ready(function () {
  svg4everybody({}); // Scrollify

  $(function () {
    $.scrollify({
      section: ".section"
    });
  });
  $.scrollify({
    section: ".section",
    sectionName: "section-name",
    interstitialSection: "",
    easing: "easeOutExpo",
    scrollSpeed: 800,
    offset: 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
    touchScroll: true,
    before: function before() {},
    after: function after() {},
    afterResize: function afterResize() {},
    afterRender: function afterRender() {}
  }); // video

  $('.btn-video').on('click', function () {
    $('.box-video').addClass('show');
  });
  $('.video-close').on('click', function () {
    $('.box-video').removeClass('show');
  });
}); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}