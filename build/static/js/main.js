"use strict";

var makeData = function makeData(elements) {
  var data = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.type !== 'radio' && item.type !== 'submit' && item.type !== 'checkbox') {
        data[item.name] = "".concat($(item).attr('placeholder'), ": ").concat($(item).val());
      }

      if (item.type === 'radio' && $(item).is(':checked')) {
        data[item.name] = $(item).attr('aria-valuetext');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return data;
};

var sendMsg = function sendMsg(data, idElemMsg) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3002/send-email',
    data: data,
    success: function success() {
      var msg = $(idElemMsg);
      msg.addClass('success');
      msg.show();
      msg.text(function () {
        return 'Успешно отправлено !';
      });
      console.log('Успешно отправлено !');
    },
    error: function error() {
      var msg = $(idElemMsg);
      msg.removeClass('success');
      msg.addClass('error');
      msg.show();
      msg.text(function () {
        return 'Ошибка';
      });
      console.log('Ошибка !');
    }
  });
};

var isDisableButton = function isDisableButton(elem, btn) {
  if (!$(elem).is(':checked')) {
    $(btn).prop('disabled', true);
  } else {
    $(btn).prop('disabled', false);
  }
};

$(document).ready(function () {
  svg4everybody({});
  $('#ya').on('click', function () {
    isDisableButton('#ya', '#btn-contacts');
  });
  $('#ya-float').on('click', function () {
    isDisableButton('#ya-float', '#btn-contacts-float');
  });
  $('.form-end-page').submit(function (e) {
    e.preventDefault();
    var data = makeData(e.target.elements);
    sendMsg(data, '#msg');
  });
  $('.form-float').submit(function (e) {
    e.preventDefault();
    var data = makeData(e.target.elements);
    sendMsg(data, '#msg-float');
  });
  var $status = $('.pagingInfo');
  var $slickElement = $('.courusel-project');
  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + ' из ' + slick.slideCount);
  });
  var $statusCourusel = $('.pagingInfo-courusel');
  var $slickElementCourusel = $('.courusel');
  $slickElementCourusel.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $statusCourusel.text(i + ' из ' + slick.slideCount);
  }); // slider

  $('.courusel').slick({
    dots: false,
    arrow: true,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: '<svg class="slick-arrow slick-next svg-inline--fa fa-arrow-right fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fal" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>',
    prevArrow: '<svg class="slick-arrow slick-prev svg-inline--fa fa-arrow-left fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fal" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 590,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  $('.courusel-project').slick({
    dots: false,
    arrow: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<svg class="slick-arrow slick-next svg-inline--fa fa-arrow-right fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fal" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>',
    prevArrow: '<svg class="slick-arrow slick-prev svg-inline--fa fa-arrow-left fa-w-14" aria-hidden="true" data-fa-processed="" data-prefix="fal" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  }); // Scrollify

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
    // start custom properties
    heightPaginationString: $('.pagination-list__item.active').height(),
    // end custom properties
    before: function before() {},
    after: function after() {
      var _this = this;

      var heightSection = $('.section').height();
      var scrollPosition = $(window).scrollTop(); // increase num pagination

      $('.count-slider').text(function () {
        return Math.round(scrollPosition / Number(heightSection) + 1);
      }); // increase height pagination string

      $('.pagination-list__item.active').height(function () {
        return _this.heightPaginationString * (scrollPosition / Number(heightSection) + 1);
      });
    },
    afterResize: function afterResize() {},
    afterRender: function afterRender() {}
  });
  $('.pagination-nav__item.prev').on('click', function (event) {
    event.preventDefault();
    $.scrollify.previous();
  });
  $('.pagination-nav__item.next').on('click', function (event) {
    event.preventDefault();
    $.scrollify.next();
  }); // video

  $('.btn-video').on('click', function () {
    $('.box-video').addClass('show');
  });
  $('.video-close').on('click', function () {
    $('.box-video').removeClass('show');
  });
}); // end ready
// form modal

$('.contact').on('click', function (event) {
  event.preventDefault();
  $('.site-wrapp').addClass('open');
});
$('.form-close-wrapp').on('click', function () {
  $('.site-wrapp').removeClass('open');
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