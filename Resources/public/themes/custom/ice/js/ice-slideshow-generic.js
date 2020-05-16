/**
 * @file
 * Carousel adapter.
 */

(function ($, Drupal) {
  'use strict';

  $(document).ready(function () {

    var iceCarousel = $('.owl-carousel.ice-carousel-slide-1');

    iceCarousel.owlCarousel({
      nav: false,
      margin: 50,
      dots: false,
      items: 1
    });

    iceCarousel.ready(function () {
      responsiveImage(iceCarousel);
    });
    $(window).resize(function () {
      responsiveImage(iceCarousel);
    });

    // Keyboard navigation.
    $(document).on('keydown', function (event) {
      if (event.keyCode == 37) {
        iceCarousel.trigger('prev.owl.carousel');
      } else if (event.keyCode == 39) {
        iceCarousel.trigger('next.owl.carousel');
      }
    });

  });

  function responsiveImage(parent) {
    var parentWidth = parent.width();
    // Assumed an arbitrary ratio based on width 800px for height 500px.
    var maxHeight = (5 * parentWidth) / 8;

    $(parent).find('img.ice-slide-image').each(function (index, image) {
      var width = image.naturalWidth;
      var height = image.naturalHeight;
      var ratio = 0;

      // Uniforms height of every slide to the max eight.
      $(image).parent().parent().parent().height(maxHeight);

      var slideMaxHeight = maxHeight;
      if ($(image).parent().parent().children('figcaption').length) {
        // 86px of elaborated height for a max of 100characters text.
        slideMaxHeight = maxHeight - 86;
      }

      // Uniforms height of every wrapper-image.
      $(image).parent().height(slideMaxHeight);

      ratio = slideMaxHeight / height;
      var scaledWidth = (width * ratio);
      if (scaledWidth > parentWidth) {
        ratio = parentWidth / scaledWidth;
        scaledWidth = parentWidth;
        slideMaxHeight = slideMaxHeight * ratio;
      }
      $(image)
        .height(slideMaxHeight)
        .removeClass('u-sizeFull')
        .css('width', scaledWidth);
    });
  }

})(window.jQuery, window.Drupal);
