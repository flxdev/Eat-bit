$(document).ready(function() {

function scrollToTop (){
	var _isScrolling = false;
	// Append Button
	$('.out').append($('<a />').addClass('scroll-to-top').attr({'href': '#', 'id': 'top'}));
	$('.scroll-to-top').click(function(e){
		e.preventDefault();
		$('.out').animate({scrollTop : 0}, 500);
		return false;
	});
	// Show/Hide Button on Window Scroll event.
	$('.out').scroll(function(){
		if(!_isScrolling) {
			_isScrolling = true;
			if($('.out').scrollTop() > 100){
				$('.scroll-to-top').stop(true, true).addClass('visible');
				_isScrolling = false;
			}
			else{
				$('.scroll-to-top').stop(true, true).removeClass('visible');
				_isScrolling = false;
			}
			checkScrollToTop();
		}
	});
} scrollToTop();

checkScrollToTop = function(){
	var bottom = 50,
		scrollVal = $('.out').scrollTop(),
		windowHeight = $(window).height(),
		footerOffset = $('.page__footer').offset().top + 500 ,
		footer = $('.footer__footer').height() - 25;
		console.log(scrollVal,windowHeight,footerOffset)



	if(scrollVal > footerOffset){
		$('.scroll-to-top').css('bottom', footer);
	}
	else if(parseInt($('.scroll-to-top').css('bottom')) > bottom){
		$('.scroll-to-top').css('bottom', bottom);
	}
}
$(window).resize(function(){
	scrollToTop();
});
//end of document ready
});
//end of document ready
