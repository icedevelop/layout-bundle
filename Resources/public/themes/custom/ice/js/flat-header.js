/**
 * @file
 * Flat header JS file.
 *
 * @see ice.libraries.yml for 'global' library definition.
 */
jQuery.noConflict();
(function ($) {

    var header = $('header.Header');
    var main = $('main#main');
    var header_h = $(header).outerHeight();

    // Make the body page start at the end of the header height.
    $(main).css('padding-top', header_h);

    $(window).on('scroll', function () {
        var cssClass = 'flat';
        var body = $('body');

        if ($(this).scrollTop() > 80    ) {
            header.addClass(cssClass);
            body.addClass(cssClass);
        } else {
            header.removeClass(cssClass);
            body.removeClass(cssClass);
        }
    });

})(jQuery);