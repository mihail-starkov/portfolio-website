'use strict';

window.onload = () => {
  swipeMenu.init();
  menu.init();
  buttonScrollingPage.init();
  ButtonBurger.init();
  let animateBg = new AnimateBg();
  animateBg.init({
    canvasId: 'FlyingElements',
    amountElements: {
      min: 5,
      max: 15,
    },
    arrCoeffs: [0.8, -0.8, 0.2, -0.2],
    arrObjsColors: [
      {
        firstColor: '#ff2f96',
        secondColor: '#ff8f5a',
      },
      {
        firstColor: '#FF0000',
        secondColor: '#ff5a5b',
      },
    ],
  });
  let animateBg2 = new AnimateBg();
  animateBg2.init({
    canvasId: 'FlyingElements2',
    amountElements: {
      min: 10,
      max: 15,
    },
    arrCoeffs: [0.8, -0.8, 0.2, -0.2],
    arrObjsColors: [
      {
        firstColor: '#dae3ff',
        secondColor: '#dae3ff',
      },
    ],
    arrWords: [
      '<DIV>', '{ }', '</>', '#', 'JS', 'Json', 'Html',
      'CSS', 'Pug', 'Sass', 'Gulp', 'Scss',
      'SVG', 'Less', 'PHP',
    ],
  });
  popup.init();
  mainTitle.init();
  
  const wow = new WOW({
    boxClass: 'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 0,          // distance to the element when triggering the animation (default is 0)
    mobile: true,       // trigger animations on mobile devices (default is true)
    live: true,       // act on asynchronously loaded content (default is true)
    callback: function (box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null, // optional scroll container selector, otherwise use window
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
    customPaging: function (slider, i) {
      return $('<button type="button"  />').text('');
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
          edgeFriction: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
          edgeFriction: false,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          edgeFriction: false,
        },
      },
    ],
  });
};