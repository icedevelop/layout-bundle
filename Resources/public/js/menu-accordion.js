/**
 * @file
 * Menu Accordion component Javascript logic.
 */

/**
 * jQuery wrapper.
 */
$( function() {
    var $accordion_title = $('.js-menu-accordion .js-menu-accordion__title');
    var $accordion_items = $('.js-menu-accordion .js-menu-accordion__items');
    $accordion_title.each(function(i, element){
        $(element).click(function(e){
            $($accordion_items[i]).toggleClass('close');
        });
    });
} );
