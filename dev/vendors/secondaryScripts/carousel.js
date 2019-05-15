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
