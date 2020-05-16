/**
 * @file
 * Carousel adapter.
 */

(function ($, Drupal) {
  'use strict';

  $(document).ready(function () {

    var iceCarousel = $('.owl-carousel.ice-carousel-slide-hp');

    iceCarousel.owlCarousel({
      nav: false,
      margin: 50,
      dots: true,
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      smartSpeed: 1100
    });

    // Keyboard navigation.
    $(document).on('keydown', function (event) {
      if (event.keyCode == 37) {
        iceCarousel.trigger('prev.owl.carousel');
      } else if (event.keyCode == 39) {
        iceCarousel.trigger('next.owl.carousel');
      }
    });

    $('.play').on('click', function () {
      iceCarousel.trigger('play.owl.autoplay', [1000])
    });
    $('.stop').on('click', function () {
      iceCarousel.trigger('stop.owl.autoplay')
    });

    // Make carousel dots accessible by keybord.
    $(iceCarousel)
      .find('.owl-dots')
      .find('.owl-dot')
      .each(function (i, element) {
        // Removing span.
        $(element).children('span').remove();
        // Attaching button element to make possible navigation by keyboard.
        var button = '<button class="dot-button" aria-controls="multimedia-carousel-hp"></button>';
        $(element).html(button);
      });

  });

})(window.jQuery, window.Drupal);
