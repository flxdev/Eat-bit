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
$('.menu-grid').isotope({
  layoutMode: 'fitRows',
  itemSelector: '.menu-item-wrap'
});
}Grid();

//end of document ready
});
//end of document ready
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
			totatSlideCont.text(totalPages)
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