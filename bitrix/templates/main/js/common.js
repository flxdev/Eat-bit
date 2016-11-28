$(document).ready(function() {

// function scrollToTop (){
// 	var _isScrolling = false;
// 	// Append Button
// 	$('.out').append($('<a />').addClass('scroll-to-top').attr({'href': '#', 'id': 'top'}));
// 	$('.scroll-to-top').click(function(e){
// 		e.preventDefault();
// 		$('.out').animate({scrollTop : 0}, 500);
// 		return false;
// 	});
// 	// Show/Hide Button on Window Scroll event.
// 	$('.out').scroll(function(){
// 		if(!_isScrolling) {
// 			_isScrolling = true;
// 			if($('.out').scrollTop() > 100){
// 				$('.scroll-to-top').stop(true, true).addClass('visible');
// 				_isScrolling = false;
// 			}
// 			else{
// 				$('.scroll-to-top').stop(true, true).removeClass('visible');
// 				_isScrolling = false;
// 			}
// 			checkScrollToTop();
// 		}
// 	});
// } scrollToTop();

// checkScrollToTop = function(){
// 	var bottom = 50,
// 		scrollVal = $('.out').scrollTop(),
// 		windowHeight = $(window).height(),
// 		footerOffset = $('.page__footer').offset().top ,
// 		footer = $('.footer__footer').height() - 25;
// 		console.log(scrollVal,windowHeight,footerOffset)



// 	if(scrollVal > footerOffset){
// 		$('.scroll-to-top').css('bottom', footer);
// 	}
// 	else if(parseInt($('.scroll-to-top').css('bottom')) > bottom){
// 		$('.scroll-to-top').css('bottom', bottom);
// 	}
// }
// $(window).resize(function(){
// 	scrollToTop();
// });
(function(){

    var mainHeader = $('.out .cd-auto-hide-header'),
        secondaryNavigation = $('.cd-secondary-nav'),
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();
    
    var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 5,
        scrollOffset = 100;

    $(window).on('scroll', function(){
        if( !scrolling ) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });

    $(window).on('resize', function(){
        headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
        var currentTop = $(window).scrollTop();

        ( belowNavHeroContent.length > 0 ) 
            ? checkStickyNavigation(currentTop)
            : checkSimpleNavigation(currentTop);

            previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
            if (previousTop - currentTop > scrollDelta) {
                mainHeader.removeClass('is-hidden');
            } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                mainHeader.addClass('is-hidden');
            }
    }
})();
$('.out').scroll(function() { 
    var scroll = $(this).scrollTop(),
        hDoc = $('.page__outer').height(),
        hWind = $(window).height(),
        hFooter = $('.footer__footer').height(),
        scrolltop  = $('.scroll-to-top'),
        scroll_position = hDoc - hWind - hFooter;

    if (scroll > 100) {
        scrolltop.addClass('visible');
        $(window).resize(function() {
            wScroll();
        });
        function wScroll() {
        	 var hFooter = $('.footer__footer').height() - 20 ;
            if ($(window).width() <= 1920 ) {
                if (scroll >= scroll_position) {
                    scrolltop.css('bottom',hFooter);
                }else{
                    scrolltop.removeAttr('style');
                }
            }
            else {
                scrolltop.removeAttr('style');
            }
        } wScroll();
    }
    else{
        scrolltop.removeClass('visible');
    }
});
    $('.scroll-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

if($('.sort_wrapper').length){

    var sortItem = function(){
        var trigger = $('.js-select-item');

        trigger.on('click', function(){
            var _ = $(this);
            var textCont = _.find('.value');
            var target = _.parent().find('.dropdown-target');
            var item = target.find('.sort-select-item a');

            _.toggleClass('active');

            item.on('click',function(e){
                var _ = $(this),
                    altLext = _.data('text');

                textCont.text(altLext);

                _.parent().addClass('active').siblings().removeClass('active');
                e.preventDefault();
                setTimeout(function(){

                    target.removeClass('active');
                    trigger.removeClass('active');

                },300);
            });
        $(document).on('mouseup', function (e){
            if (!trigger.is(e.target)
                && trigger.has(e.target).length === 0) {
                trigger.removeClass('active');
            }
        });

        });
    };
    sortItem();
 } 

function Grid(){
    if(!$('.menu-grid').attr("style")){
        $('.menu-grid').isotope({
          layoutMode: 'fitRows',
          itemSelector: '.menu-item-wrap',
        });
    }

}
$(window).on('load resize', function(){
    if(window.matchMedia("(min-width: 545px)").matches){
        Grid();
        setTimeout(function(){
            $('.menu-grid').isotope('resize').isotope('layout');
        },10)
        
    }
     else{
        if($('.menu-grid').attr("style")){
            $('.menu-grid').isotope('destroy');
        }
    }
})
function stick(){
    // $(".white-box").Stickyfill();
    var stickyElements = document.getElementsByClassName('js-sticky');

    for (var i = stickyElements.length - 1; i >= 0; i--) {
        Stickyfill.add(stickyElements[i]);
    }
    $(window).on('resize',function(){
        if(window.matchMedia("(min-width: 991px)").matches){
            Stickyfill.stop('.js-sticky');
        }else{
            Stickyfill.init('.js-sticky');
        }
    })
}stick();
$(window).on('resize',function(){
    stopStick();
    Stickyfill.rebuild('.js-sticky');
})
function stopStick(){
    if(window.matchMedia("(max-width: 991px)").matches){
        Stickyfill.stop('.js-sticky');
    }else{
        Stickyfill.init('.js-sticky');
    }
}stopStick();
function validateForms(){
var form_form = $('.js-validate');
if (form_form.length) {
    form_form.each(function () {
        var form_this = $(this);
        $.validate({
            form : form_this,
            borderColorOnError : true,
            scrollToTopOnError : false,
        });
    });
};
}validateForms();
function FocusInput(){
    var input = $('.input-main');
        input.each(function(){
            var _ = $(this);
            _.on('focus',function(){
                var parent = _.parent();
                parent.addClass('in-focus');

                _.focusout(function(){
                    parent.removeClass('in-focus')
                })
            })
        })
} FocusInput();
function initCustomSelectList() {
    var _conf = {
            initClass: 'cs-active',
            f: {}
        },
        _items = $('.js-select-custom');

    $.each(_items, function () {
        var _select = $(this),
            _button = _select.find('button'),
            placeholder = _button.data('placeholder'),
            _list = _select.find('.select-list');

        _select.on('reinit', function() {
            var _active = _list.find('input:checked');

            if(_active.length) {
                _select.parent().hasClass('input-wrapper') ?_button.children('.btn-text').text(''+_active.siblings('span').text()+'').parent().addClass('is-checked') : _button.children('.btn-text').text(''+ _active.siblings('span').text()+'').parent().addClass('is-checked')
                
            }
            else {
                _button.children('.btn-text').text(_button.data('placeholder')).parent().removeClass('is-checked');
            }
        });

        _button.on('click', function() {
           _button.parent().toggleClass('active').siblings().removeClass('active');
            return(false);
        });

        _select.on('click', 'label', function() {
           var _label = $(this),
               _input = _label.find('input');

            _input.prop('checked', true);
            _select.trigger('reinit');
            _button.parent().removeClass('active');
        });
        _select.trigger('reinit');
        _select.addClass(_conf.initClass);

         $(document).on('mouseup', function (e){
            if (!_select.is(e.target)
                && _select.has(e.target).length === 0) {
                _select.removeClass('active');
            }
        });
    });

} initCustomSelectList() ;

//extends jquery-ui slider drag animation
(function( $, undefined ) {
    $.extend($.ui.slider.prototype.options, {
        dragAnimate: true
    });
    var _mouseCapture = $.ui.slider.prototype._mouseCapture;
    $.widget("ui.slider", $.extend({}, $.ui.slider.prototype, {
        _mouseCapture: function(event) {
            _mouseCapture.apply(this, arguments);
            this.options.dragAnimate ? this._animateOff = false : this._animateOff = true;
            return true;
        }
    }));
}(jQuery));
function sliderRange(){
    var slider = $("#rangeinput" );


    slider.slider({
        animate: true,
        range: "min",
        value: 1,
        step: 1,
        dragAnimate: true,
        min: 1,
        max: 5,
        create: function( event, ui ) {
            calcWeek(ui.value)
        },
        slide: function(event, ui) {
            if(ui.value > 3 && ui.value <= 4){
                return false;
            }
            calcWeek(ui.value)
        },
        change: function( event, ui ) {
            
        }
    });
}sliderRange();

function calcWeek(value){
    var values = $('.js-slider-info'),
        totalSum = $('.js-slider-wrap').parent().find('.form-total-count'),
        totalWeek = $('.js-slider-wrap').parent().find('.form-total-week');
    values.each(function(){
        var _ = $(this);
        _.text(!value ? _.data('index-1') : _.data('index-'+ value));
        if(_.hasClass('js-slider-week')){
            totalWeek.text(!value ? _.data('index-1') : _.data('index-'+ value))
        }
    });
    var dayPrice = parseInt($('.js-slider-price').text()),
        x = parseInt($('.js-slider-x').text());

    totalSum.text((dayPrice * x) +' ₽');
}
popUpsInit();
function FocusInput(){
var input = $('.js-focus');
    input.each(function(){
        var _ = $(this);
        _.on('focus',function(){
            var parent = _.parent();
            parent.addClass('in-focus');
            _.focusout(function(){
                parent.removeClass('in-focus')
            })
        })
    })
} FocusInput();
//end of document ready
});
//end of document ready
function reverse(elem){
    elem.on("afterChange breakpoint", function(event, slick, currentSlide) { 
        slidesShown = parseInt(slick.slickGetOption('slidesToShow'));
        // setTimeout(function(){
            if(window.matchMedia("(min-width: 544px)").matches ){
        //         console.log(1)
                if ((currentSlide + 1)  === slidesShown) { 
                        elem.slick("slickSetOption", "slidesToScroll", -1); 
                    } 
                if(currentSlide == 1){
                    elem.slick("slickSetOption", "slidesToScroll", 1);
                }
            }
        // },10)
    });
}
function slidesCount(elem){
	var container = elem.parent().find('.slider-counter'),
			curSlideCont = container.find('.slider-curr'),
			totatSlideCont= container.find('.slider-total'),
			pages;

	elem.on('init reInit breakpoint beforeChange', function (event, slick, currentSlide, nextSlide) {
		var slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
			slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
			slidesNext = parseInt(nextSlide),
			totalSlides = parseInt(slick.slideCount),
			totalPages = Math.ceil(totalSlides / slidesShown),
			curPage = event.type == 'init' || event.type == 'reInit' || event.type == 'breakpoint'? 0 : parseInt(slidesNext/slidesScroll);
			totatSlideCont.text(slidesShown == 1 ? totalSlides : totalPages)
			curSlideCont.text(curPage + 1)
	});
}
function ArrColor(elem){
    var cont = elem.parent().find('.i-arrows'),
        slides = elem.find('.slick-slide');
    elem.on('init reInit breakpoint afterChange', function (event, slick, currentSlide, nextSlide) {
        CheckSize();
    });
    $(window).on('resize',function(){
        CheckSize();
    });
    function CheckSize(){
        if (window.matchMedia("(max-width: 991px)").matches) {
                $('.slick-current').hasClass('white') ? cont.addClass('white') : cont.removeClass('white');  
        }else{
            cont.removeClass('white');
        }
    }
}
function popUpsInit() {
    var _this = {
        b: {
            open: $('.js-popup-button'),
        }, c: {
            popup: $('.js-popup-container'),
            body: $('body')
        }, f: {}, conf: {
            bodyClass: 'modal_open',
            popupClass: 'active',
            closeSelector: '.closePopup',
            initClass: 'init-popup'
        }
    };

    _this.f.openModal = function (_modal) {
        _modal.addClass(_this.conf.popupClass);
        _this.c.body.addClass(_this.conf.bodyClass);

        _this.f.initActions(_modal);
    };

    _this.f.initActions = function (_modal) {
        _modal.find(_this.conf.closeSelector).off('click.popup').on('click.popup', function () {
            _this.f.closeModal(_modal);

            return false;
        });
    };

    _this.f.closeModal = function (_modal) {
        _modal.removeClass(_this.conf.popupClass);
        _this.c.body.removeClass(_this.conf.bodyClass);
    };

    _this.b.open.off('click.popup').on('click.popup', function () {
        var _b = $(this),
            modalID = _b.data('modal'),
            _modal = _this.c.popup.filter('[data-modal="' + modalID + '"]');
 
        _this.f.openModal(_modal);
        return false;
    });
}