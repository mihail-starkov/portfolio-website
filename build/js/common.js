'use strict';

window.onload = function () {
  swipeMenu.init();
  menu.init();
  buttonScrollingPage.init();
  ButtonBurger.init();
  AnimateBg.init({
    canvasId: 'FlyingElements',
    colorsGradient: [{
      firstColor: '#ff2f96',
      secondColor: '#ff8f5a'
    }, {
      firstColor: '#ff8f5a',
      secondColor: '#ff2f96'
    }, {
      firstColor: '#7786ff',
      secondColor: '#1e46ff'
    }, {
      firstColor: '#ff2f96',
      secondColor: '#d700a0'
    }, {
      firstColor: '#ff8f0c',
      secondColor: '#ff96ae'
    }, {
      firstColor: '#ff001b',
      secondColor: '#ff6471'
    }]
  });
  var wow = new WOW({
    boxClass: 'wow',
    // animated element css class (default is wow)
    animateClass: 'animated',
    // animation css class (default is animated)
    offset: 0,
    // distance to the element when triggering the animation (default is 0)
    mobile: true,
    // trigger animations on mobile devices (default is true)
    live: true,
    // act on asynchronously loaded content (default is true)
    callback: function callback(box) {// the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window

  });
  wow.init();
  $('.Slick-carousel').slick({
    dotsClass: 'SwitchImages',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    arrows: true,
    prevArrow: '.Control_prev',
    nextArrow: '.Control_next',
    edgeFriction: false,
    customPaging: function customPaging(slider, i) {
      return $('<button type="button"  />').text('');
    },
    responsive: [{
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
        edgeFriction: false
      }
    }, {
      breakpoint: 780,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
        edgeFriction: false
      }
    }, {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        edgeFriction: false
      }
    }]
  });
};