$(document).ready(function() {
function checkForFlex(){
	var curAddress = window.location.toString(),
		targetAddress = "http://localhost:8080/zagl.html";
		console.log(curAddress,targetAddress)
	function NaiveFlexBoxSupport(d){
	  var f = "flex", e = d.createElement('b');
	  e.style.display = f;
	  return e.style.display == f;
	}

	if (NaiveFlexBoxSupport(document) == false && (targetAddress.toString() != curAddress)){
		console.log('redirect')
		window.location.replace(targetAddress);
	}else{
		console.log('nope')
	}
}checkForFlex();
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

	$(document).add('.out').on('scroll', function(){
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

	// function checkSimpleNavigation(currentTop) {
	// 		if (previousTop - currentTop > scrollDelta) {
	// 			mainHeader.removeClass('is-hidden');
	// 		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	// 			mainHeader.addClass('is-hidden');
	// 		}
	// }
	function checkSimpleNavigation(currentTop) {
		if (currentTop <= 110) {
			mainHeader.removeClass('is-hidden');
		} else {
			mainHeader.addClass('is-hidden');
		}
	}
})();
$(document).add('.out').scroll(function() { 
	var scroll = $(this).scrollTop(),
		hDoc = $('.page__wrapper').height(),
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
		$('html, body, .out').animate({
			scrollTop: 0
		}, 800);
	});


var sortItem = function(){
	var trigger = $('.js-select-item');

	trigger.each(function(){
		var _ = $(this),
			textCont = _.find('.value'),
			target = _.parent().find('.dropdown-target'),
			item = target.find('.sort-select-item a');
		_.on('click', function(){
			_.toggleClass('active');
		});	

		item.each(function(){
			var _ = $(this);

			_.on('click',function(e){
				var altLext = _.data('text');

				textCont.text(altLext);

				_.parent().addClass('active').siblings().removeClass('active');
				if(_.hasClass('program_change')){
					var sect_id = _.data('id');
					$.ajax({
						type: "POST",
						url: '/include/main_menu.php',
						data: 'sect_id=' + sect_id,
						dataType: "html",
						success: function(data){
							replace = $(data).find('.menu_reload').html();
							$('.menu_reload').html(replace);
							menu_reload();
						}
					});
				}
				e.preventDefault();
				setTimeout(function(){

					target.removeClass('active');
					trigger.removeClass('active');

				},300);
			});
		})

		$(document).on('mouseup', function (e){
			if (!trigger.is(e.target)
				&& trigger.has(e.target).length === 0) {
				trigger.removeClass('active');
			}
		});

	});
};
sortItem();

function stick(){

	var stickyElements = document.getElementsByClassName('js-sticky');
	if(stickyElements.length){
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
		$(window).on('resize',function(){
			stopStick();
			Stickyfill.rebuild('.js-sticky');
		});
		function stopStick(){
			if(window.matchMedia("(max-width: 991px)").matches){
				Stickyfill.stop('.js-sticky');
			}else{
				Stickyfill.init('.js-sticky');
			}
		}stopStick();
	} else return false
}stick();







function Accordeon(){
	if($('.js-accordion-trigger').length){
	var maintrigger = $('.js-accordion-trigger'),
		body = $('.js-accordion-body'),
		truetrigger = maintrigger;
		maintrigger.not('.active').siblings(body).hide();
		truetrigger.on('click',function(event){
			var parent = $(this).parent(),
				target = parent.find(body);
			if(parent.hasClass('active')){
				parent.removeClass('active').find(body).slideUp(300);
			}else{
				parent.addClass('active').find(body).slideDown(300, function(){
				});
			}
		});
	}
}Accordeon();

function mobileFilter(){
	var trigger = $('.mobile-dropdowm-trigger');

	trigger.on('click', function(){
		$(this).toggleClass('active');
	})
}mobileFilter();



function FocusI(){
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
} FocusI();

function sliderRange(){
	var slider = $(".rangeinput");
	if(slider.length){
		slider.each(function(){
			var _ = $(this);
			_.slider({
				animate: true,
				range: "min",
				value: 1,
				step: 1,
				dragAnimate: true,
				min: 1,
				max: 5,
				create: function( event, ui ) {
					calcWeek(ui.value,_)
				},
				slide: function(event, ui) {
					if(ui.value > 3 && ui.value <= 4){
						return false;
					}
					calcWeek(ui.value,_)
				},
				change: function( event, ui ) {
					
				}
			});
		});
	}
   
}
sliderRange();
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
function calcWeek(value,slider){
	var values = slider.parent().find('.js-slider-info'),
		totalSum = slider.parent().siblings().find('.form-total-count'),
		totalWeek = slider.parent().siblings().find('.form-total-week'),
		buy_btn = slider.parent().siblings().find('.addtocart'),
		one_click = slider.parent().siblings().find('.fastbuy');
	values.each(function(){
		var _ = $(this);
		_.text(!value ? _.data('index-1') : _.data('index-'+ value));
		if(_.hasClass('js-slider-week')){
			totalWeek.text(!value ? _.data('index-1') : _.data('index-'+ value))
		}
	});
	//var dayPrice = parseInt(slider.parent().find('.js-slider-price').text()),
	var	x = parseInt(slider.parent().find('.js-slider-x').text()),
		id = parseInt(slider.parent().find('.js-slider-id').text());
	buy_btn.data("id", id);
	one_click.data("id", id);
	totalSum.text(x +' ₽');
}


function subscribe(){
	if($('.js-subscribe').length){
		var parent = $('.js-subscribe'),
			trigger = parent.find('.select-u-item'),
			target = parent.find('.input-item'),
			targetType = target.data('type');

		trigger.each(function(){
			var _ = $(this);
			_.on('click', function(){
				parent.trigger('reinit');
			})
		})
		parent.on('reinit', function(){
			target.hide();
			var checked = trigger.find('input:checked');
				checked.each(function(){
					var _ = $(this),
						type = _.val();
					parent.find('[data-type='+ type +']').show();
				})
		});
		parent.trigger('reinit');
	}
}subscribe();
$(".js-scroll").on('click', function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    console.log(elementClick,destination );
    if(elementClick == '#zakaz'){
    	$("body:not(:animated), .out:not(:animated)").animate({scrollTop: 300}, 500);
    }else{
    	$("body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - 50}, 500);
    }
});
function FocusInput(){
var input = $('.js-focus');
	input.each(function(){
		var _ = $(this);
		_.on('focus',function(){
			var parent = _.parent();
			parent.addClass('in-focus');
			_.focusout(function(){
				parent.removeClass('in-focus')
			});
		});
	});
} FocusInput();
function compareHeight(){
	setTimeout(function(){
		$('.povor-item .povor-inner').matchHeight({
			 property: 'min-height'
		});
	},10)
}compareHeight();

if($('#map').length){

	ymaps.ready(init);
	function init() {

	    var myMap = new ymaps.Map("map", {
	            center: [55.73, 37.75],
	            zoom: 8,
	            controls: ['smallMapDefaultSet'],
	        }, {
	            
	            balloonMaxWidth: 200
	        });
	 		myMap.behaviors.disable(['rightMouseButtonMagnifier','ruler','scrollZoom']);
	        myMap.controls.remove('typeSelector');
	        myMap.controls.remove('searchControl');
	        myMap.controls.remove('GeolocationControl');

	    	// начало у петушков
	        var myPolygon3 = new ymaps.Polygon([
	        [
	            [55.937103, 39.441656],
	            [55.762506, 39.463629],
	            [55.579342, 39.458136],
	            [55.458575, 39.282355],
	            [55.347609, 39.138159],
	            [55.220189, 39.059016],
	            [55.095165, 38.788477],
	            [54.955524, 38.534418],
	            [54.858197, 38.034541],
	            [54.808839, 37.609703],
	            [54.826286, 37.170249],
	            [54.918153, 36.670372],
	            [54.983756, 36.355888],
	            [55.186994, 36.075737],
	            [55.364955, 35.915061],
	            [55.494587, 35.972740],
	            [55.591920, 35.906822],
	            [55.674269, 35.733787],
	            [55.851966, 35.877983],
	            [56.013854, 36.011192],
	            [56.349368, 36.379395],
	            [56.562283, 36.492005],
	            [56.665645, 36.683579],
	            [56.714765, 36.892319],
	            [56.663377, 37.142258],
	            [56.612674, 37.374345],
	            [56.683034, 38.115922],
	            [56.601314, 38.330155],
	            [56.536872, 38.606187],
	            [56.451793, 38.879471],
	            [56.306259, 39.169236],
	            [56.160166, 39.409562],
	            [56.046579, 39.402695],
	            [55.979651, 39.404069],

	        ],
	        // Координаты вершин внутреннего контура.
	        [
				[56.368403, 37.472914],
	            [56.408396, 37.490080],
	            [56.375643, 37.579344],
	            [56.405731, 37.647322],
	            [56.441501, 37.887648],
	            [56.377548, 38.081282],
	            [56.360781, 38.218611],
	            [56.221019, 38.504255],
	            [56.103775, 38.629225],
	            [56.095332, 38.675917],
	            [55.971541, 38.791273],
	            [55.883747, 38.860416],
	            [55.876028, 38.959293],
	            [55.791785, 38.966160],
	            [55.766244, 38.953800],
	            [55.749207, 38.937321],
	            [55.729064, 38.959293],
	            [55.695726, 38.945561],
	            [55.649937, 38.933201],
	            [55.622749, 38.941441],
	            [55.491981, 38.872776],
	            [55.349822, 38.718967],
	            [55.260515, 38.452549],
	            [55.133258, 38.249302],
	            [55.097837, 38.014469],
	            [55.071053, 37.791996],
	            [55.031632, 37.437687],
	            [54.973217, 37.407475],
	            [55.052135, 37.042179],
	            [55.226777, 36.550541],
	            [55.437783, 36.350143],
	            [55.546159, 36.383102],
	            [55.643022, 36.329544],
	            [55.701664, 36.201943],
	            [55.831731, 36.314553],
	            [55.893113, 36.427492],
	            [56.004281, 36.482057],
	            [56.077075, 36.499234],
	            [56.142300, 36.599484],
	            [56.332531, 36.696943],
	            [56.375229, 36.784834],
	            [56.388943, 36.861738],
	            [56.407221, 36.874098],
	            [56.423968, 36.972975],
	            [56.414073, 37.075972],
	            [56.441468, 37.181715],
	            [56.423968, 37.188582],
	            [56.379039, 37.325911],
	            [56.372943, 37.353377],
	            [56.375229, 37.464613],
	        ]
	    ], {
	    }, {

	        fillColor: '#ff980080',
	        strokeWidth: 0
	    });
	    // Добавляем многоугольник на карту.
	    myMap.geoObjects.add(myPolygon3);
	    var myPolygon2 = new ymaps.Polygon([
	        [
	            [56.368403, 37.472914],
	            [56.408396, 37.490080],
	            [56.375643, 37.579344],
	            [56.405731, 37.647322],
	            [56.441501, 37.887648],
	            [56.377548, 38.081282],
	            [56.360781, 38.218611],
	            [56.221019, 38.504255],
	            [56.103775, 38.629225],
	            [56.095332, 38.675917],
	            [55.971541, 38.791273],
	            [55.883747, 38.860416],
	            [55.876028, 38.959293],
	            [55.791785, 38.966160],
	            [55.766244, 38.953800],
	            [55.749207, 38.937321],
	            [55.729064, 38.959293],
	            [55.695726, 38.945561],
	            [55.649937, 38.933201],
	            [55.622749, 38.941441],
	            [55.491981, 38.872776],
	            [55.349822, 38.718967],
	            [55.260515, 38.452549],
	            [55.133258, 38.249302],
	            [55.097837, 38.014469],
	            [55.071053, 37.791996],
	            [55.031632, 37.437687],
	            [54.973217, 37.407475],
	            [55.052135, 37.042179],
	            [55.226777, 36.550541],
	            [55.437783, 36.350143],
	            [55.546159, 36.383102],
	            [55.643022, 36.329544],
	            [55.701664, 36.201943],
	            [55.831731, 36.314553],
	            [55.893113, 36.427492],
	            [56.004281, 36.482057],
	            [56.077075, 36.499234],
	            [56.142300, 36.599484],
	            [56.332531, 36.696943],
	            [56.375229, 36.784834],
	            [56.388943, 36.861738],
	            [56.407221, 36.874098],
	            [56.423968, 36.972975],
	            [56.414073, 37.075972],
	            [56.441468, 37.181715],
	            [56.423968, 37.188582],
	            [56.379039, 37.325911],
	            [56.372943, 37.353377],
	            [56.375229, 37.464613],
	        ],
	        // Координаты вершин внутреннего контура.
	        [
	            [56.208410, 37.530504],
	            [56.165525, 37.689806],
	            [56.057716, 38.123079],
	            [55.998889, 38.314653],
	            [55.947293, 38.390184],
	            [55.856833, 38.441339],
	            [55.823798, 38.423486],
	            [55.761129, 38.436533],
	            [55.739353, 38.455838],
	            [55.697881, 38.433522],
	            [55.632872, 38.360051],
	            [55.541482, 38.403310],
	            [55.429189, 38.303746],
	            [55.381523, 38.176717],
	            [55.333409, 37.695378],
	            [55.337322, 37.466039],
	            [55.388169, 37.357549],
	            [55.400675, 37.218846],
	            [55.526294, 36.975774],
	            [55.608781, 37.007359],
	            [55.660053, 36.967534],
	            [55.723661, 36.859044],
	            [55.928513, 36.946935],
	            [56.014766, 37.029332],
	            [56.111741, 37.186718],
	            [56.135520, 37.374859],
	            [56.137821, 37.492962],
	        ]
	    ], {
	    }, {

	        fillColor: '#e5ec0990',
	        strokeWidth: 0
	    });
	    // Добавляем многоугольник на карту.
	    myMap.geoObjects.add(myPolygon2);
	    // Создаем многоугольник, используя вспомогательный класс Polygon.
	    var myPolygon = new ymaps.Polygon([
	        // Указываем координаты вершин многоугольника.
	        // Координаты вершин внешнего контура.
	        [
	            [56.208410, 37.530504],
	            [56.164649, 37.708046],
	            [56.140444, 37.854132],
	            [56.165525, 37.689806],
	            [56.057716, 38.123079],
	            [55.998889, 38.314653],
	            [55.947293, 38.390184],
	            [55.856833, 38.441339],
	            [55.823798, 38.423486],
	            [55.761129, 38.436533],
	            [55.739353, 38.455838],
	            [55.697881, 38.433522],
	            [55.632872, 38.360051],
	            [55.541482, 38.403310],
	            [55.429189, 38.303746],
	            [55.381523, 38.176717],
	            [55.333409, 37.695378],
	            [55.337322, 37.466039],
	            [55.388169, 37.357549],
	            [55.400675, 37.218846],
	            [55.526294, 36.975774],
	            [55.608781, 37.007359],
	            [55.660053, 36.967534],
	            [55.723661, 36.859044],
	            [55.928513, 36.946935],
	            [56.014766, 37.029332],
	            [56.111741, 37.186718],
	            [56.135520, 37.374859],
	            [56.137821, 37.492962],
	        ],

	    ], {
	    }, {
	        fillColor: '#0fe84d80',
	        strokeWidth: 0
	    });
	    myMap.geoObjects.add(myPolygon);

	myMap.geoObjects.events.add('click', function(e) {

	   var target = e.get('target');
	   if(target.geometry.getType() === 'Polygon') {

	     console.log(e.getIndex)

	}

});

    // myMap.geoObjects.events.add('click', function (e) {
    // 	console.log(geoObjects.properties);
    //     if (!myMap.balloon.isOpen()) {
    //         var coords = e.get('coords');
    //         myMap.balloon.open(coords, {
    //             contentHeader:'Событие!',
    //             contentBody:'<p>Кто-то щелкнул по карте.</p>' +
    //                 '<p>Координаты щелчка: ' + [
    //                 coords[0].toPrecision(6),
    //                 coords[1].toPrecision(6)
    //                 ].join(', ') + '</p>',
    //             contentFooter:'<sup>Щелкните еще раз</sup>'
    //         });
    //     }
    //     else {
    //         myMap.balloon.close();
    //     }
    // });
} 

}

function stars(){
	var parent = $('.js-stars'),
		items = parent.find('.star-item');
// parent.closest('.input-wrapper').addClass('has-error');
items.click(function(e) {
	$(this).closest('.input-wrapper').removeClass('has-error').addClass('has-success');
	e.preventDefault();
	num = parseInt($(this).data("num"));
	i = 1;
	for (i = 1; i <= num; i++) {
		$("#rev-star-" + i).addClass('active');
	}
	for (i = num + 1; i <= 5; i++) {
		$("#rev-star-" + i).removeClass('active');
	}
	$(".rev-hidden").val(num);

	return false;
});
}stars()

$(".js-dropzone").dropzone({
	url: "/fileupl.php",
	dictFileTooBig : 'Файл слишком большой',
	dictResponseError : 'Сервер ответил с ошибкой',
	dictInvalidFileType: 'Неверный тип файла',
	acceptedFiles: ".jpeg,.jpg,.png,.gif",
	maxFilesize: '2',
	maxFiles: '1',
	init: function() {
		this.on("maxfilesexceeded", function(file) {
			this.removeAllFiles();
			this.addFile(file);
		});
		this.on('resetFiles', function() {
			this.removeAllFiles();
		});
		},
		addRemoveLinks: true
	});

//слайдер новостей
function newsSlider(){
     $(".news-inner-slider").each( function() {
        var _this = $(this);
        slidesCount(_this);
        _this.slick({
	        accessibility: true,
	        arrows: true,
	        draggable: false,
	        touchMove: false,
	        infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        appendArrows: _this.siblings('.i-arrows'),
	        nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css">.starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M0.5,0.5l6,5.6l-6,5.6"/></svg></div></button>',
	        prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css"> .starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M6.9,11.7l-6-5.6l6-5.6"/></svg></div></button>',
        }); 
    }); 
}

number();
newsSlider();
Menu();
ToClose();
isMobile();
AddBlock();
datepick();
addToBasket();
deleteProducts();
menu_reload();
validateForms();
popUpsInit();
initCustomSelectList();
AddressInput();
//end of document ready
});
//end of document ready

function reverse(elem){
	elem.on("afterChange breakpoint", function(event, slick, currentSlide) { 
		slidesShown = parseInt(slick.slickGetOption('slidesToShow'));
			if(window.matchMedia("(min-width: 544px)").matches ){
				if ((currentSlide + 1)  === slidesShown) { 
						elem.slick("slickSetOption", "slidesToScroll", -1); 
					} 
				if(currentSlide == 1){
					elem.slick("slickSetOption", "slidesToScroll", 1);
				}
			}
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
function povor(){
	$(".povor-slider").each( function() {
		var _this = $(this);
		slidesCount(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			touchMove: false,
			fade: true,
			speed: 500,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: _this.find('.i-arrows'),
			nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css">.starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M0.5,0.5l6,5.6l-6,5.6"/></svg></div></button>',
			prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css"> .starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M6.9,11.7l-6-5.6l6-5.6"/></svg></div></button>',
		}); 
		var arrows = _this.find('.slick-arrow');
		arrows.on('click', function(){
			var _ = $(this);
			_.hasClass('carousel-prev') ? _this.slick('slickPrev') : _this.slick('slickNext');
		})
	});

}
function NewsGrid(){
	$('.js-news').isotope({
	  layoutMode: 'fitRows',
	  itemSelector: '.news-item-wrap',
	});

}
function Menu() {
	var trigger = $('.js-menu'),
		triggerInner = trigger.find('.hamburger-inner'),
		target = $('.header__menu--wrap');
		body = $('body'),
		OpenClass = 'open';
	trigger.add(target).on('click', function(){
		if(!trigger.hasClass('anim')){
			trigger.addClass('anim');
			trigger.add(target).toggleClass(OpenClass);
			body.toggleClass('modal_open');
			setTimeout(function(){
				trigger.removeClass('anim')
			},500);
		}


	})
	$('.header__menu--cont').click(function(e){
	  e.stopPropagation();
	});
}
function ToClose(){
	var target = $('.header__hamburger'),
		clas = 'toclose';
		target.on('mouseenter', function(){
			var _ = $(this);
			if(_.hasClass('open')){
				_.addClass(clas);
			}
		});
		target.on('mouseleave', function(){
			var _ = $(this);
				_.removeClass(clas);
		});		
}
function news(){
	$( ".index-slider").each( function() {
		var _this = $(this);
		slidesCount(_this);
		ArrColor(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			touchMove: false,
			asNavFor:_this.siblings().find('.index-add'),
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: _this.siblings().find('.i-arrows'),
			nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css">.starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M0.5,0.5l6,5.6l-6,5.6"/></svg></div></button>',
			prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css"> .starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M6.9,11.7l-6-5.6l6-5.6"/></svg></div></button>',
		}); 

		_this.siblings().find('.index-add').slick({
			arrows: false,
			draggable: false,
			asNavFor: _this,
			touchMove: false,
			vertical: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	}); 
}
function isMobile()
	{
	   return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) );
	}
function GridorSlider(){
	$( ".menu-grid").each(function(){
		var _this = $(this);
			isMobile() ? gridslider(_this) : Grid(_this)
	});
}
function Grid(item){
	if(!item.attr("style")){
		item.isotope({
		  layoutMode: 'fitRows',
		  itemSelector: '.menu-item-wrap',
		});
		setTimeout(function(){
			item.isotope('resize').isotope('layout');
		},10)

	}
}
function gridslider(item){
	if(!item.hasClass('slick-initialized')){
		slidesCount(item);
		item.slick({
				accessibility: true,
				arrows: true,
				draggable: true,
				touchMove: false,
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth: false,
				// centerMode: true,
				mobileFirst: true,
				appendArrows: item.siblings('.i-arrows'),
				nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css">.starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M0.5,0.5l6,5.6l-6,5.6"/></svg></div></button>',
				prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css"> .starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M6.9,11.7l-6-5.6l6-5.6"/></svg></div></button>',
				responsive: [
					{
						breakpoint: 544,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
					},
					{
						breakpoint: 768,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3
			      }
					},
				]
			});
	}
}
function reviews(){
	$(".review-slider").each( function() {
		var _this = $(this);
		slidesCount(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			touchMove: false,
			fade: true,
			speed: 500,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: _this.siblings('.i-arrows'),
			nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css">.starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M0.5,0.5l6,5.6l-6,5.6"/></svg></div></button>',
			prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css"> .starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M6.9,11.7l-6-5.6l6-5.6"/></svg></div></button>',
		}); 
	}); 
} 
function insta(){
	$( ".instagram-wrapper").each( function() {
		var _this = $(this);
		slidesCount(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			touchMove: false,
			infinite: false,
			autoplay: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			autoplaySpeed: !0,
			speed: 10000,
			cssEase: 'linear',
			slidesToShow: 6,
			slidesToScroll: 1,
			appendArrows: _this.siblings().find('.i-arrows'),
			nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css">.starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M0.5,0.5l6,5.6l-6,5.6"/></svg></div></button>',
			prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7.4 12.1" style="enable-background:new 0 0 7.4 12.1;" xml:space="preserve"><style type="text/css"> .starr{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#2D2D2D;stroke-width:1.2;stroke-miterlimit:10;}</style><path class="starr" d="M6.9,11.7l-6-5.6l6-5.6"/></svg></div></button>',
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 5
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 543,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						speed: 300,
						autoplaySpeed: 4500,
						cssEase: 'ease-in',
					}
				}
			]
		}); 
		reverse(_this);
	}); 
} 
function number() {
	var number = $('.js-number');
	number.each(function(){
		if(!$(this).hasClass('init')){
			var max_number = +($(this).attr('data-max-number'));
			var min_number = +($(this).attr('data-min-number'));
			var input = $(this).find("input");
			var plus = $(this).find(".js-plus-number");
			var minus = $(this).find(".js-minus-number");
			var add = $(this).parent().find('.js-add');
			var timeout;
			var countbasketid = input.attr('id');
			plus.on("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false;
				}
				else {
					val += 1;
					input.val(val);
				};
				input.trigger('input');
				return false;
			});
			minus.on("click", function(){
				var val = +(input.val());
				if (val > min_number) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val(min_number);
					return false;
				}
				input.trigger('input');
				return false;
			});
			input.on("input", function(){
				var val = +$(this).val();
				if ( val == '' || val < min_number) {
					input.val(min_number);
				}
				if (val > max_number) {
					val = max_number;
					input.val(val);
				}
				if(input.hasClass('in_cart')){
					clearTimeout(timeout);
					timeout = setTimeout(function() {
						BX.showWait();
						var countbasketcount = input.val();
						var ajaxcount = countbasketid + '&ajaxbasketcount=' + countbasketcount;
						ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area");
					}, 500);
				}
			});
			// input.on("paste", function(event){
			// 	event.preventDefault();
			// });
			input.keypress(function(event){
				var key, keyChar;
				if(!event) var event = window.event;
				if (event.keyCode) key = event.keyCode;
				else if(event.which) key = event.which;
				if(key==null || key==0 || key==8 || key==13 || key==9 || key==37 || key==39 ) return true;
				keyChar=String.fromCharCode(key);
				if(!/\d/.test(keyChar))	return false;
			});
			$(this).addClass('init');
		} else {
			return;
		}
	});
}

function popUpsInit() {
	var _this = this;
	_this.b = {open: $('.js-popup-button')};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body')
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed'
	};
	_this.f.initModalActions = function (_popup) {
		/**
		 * Close buttons.
		 */
		_popup.find(_this.conf.close_selector).off('click.popup').on('click.popup', function () {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function (_popup) {
		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class);
	};
	_this.f.openPopup = function (_popup) {
		_popup.addClass(_this.conf.active_class);
		_this.c.body.addClass(_this.conf.body_class);
	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function () {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function () {
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
			if(_b.hasClass('fastbuy')){
				var id = _b.data('id'),
					name = _b.data('program');
				$.ajax({
					type: "POST",
					url: "/include/form/oneclick.php",
					data: 'name='+ name +'&id=' + id,
					dataType: "html",
					success: function(filter){
						$('.oneclick_reload').html(filter);
						validateForms();
					}
				});
			}
		_this.f.openPopup(_popup);
		return false;
	});
}

function ajaxpostshow(urlres, datares, wherecontent, form){
	$.ajax({
		type: "POST",
		url: urlres,
		data: datares,
		dataType: "html",
		success: function(fillter){
			$(wherecontent).html(fillter);
			validateForms();
			if( $("div").is('.js-subscribe') ){
				subscribe();
			}
		}
	});
}

function ajaxpost(urlres, datares, wherecontent, callback){
	$.ajax({
		type: "POST",
		url: urlres,
		data: datares,
		dataType: "html",
		success: function(fillter){
			$(wherecontent).html(fillter);
			BX.closeWait();
			number();
			deleteProducts();
			popUpsInit();
			if (!(callback && callback instanceof Function && typeof callback === 'function')) {
				return false;
			}
			callback(fillter);
		}
	});
}

function ajaxpostshow1(urlres, datares, popup, form){
	$.ajax({
		type: "POST",
		url: urlres,
		data: datares,
		dataType: "html",
		success: function(fillter){
			$('.js-popup-container').filter('[data-modal="' + popup + '"]').addClass('active');
			$('body').addClass('modal_open');
			$(form)[0].reset();
			JS_ClearDropZone();
			$('.star-item').removeClass('active');
		}
	});
}

function ajaxSubmit(form){
	var formsubscrube = $(form).serialize(),
		target_block = $(form).data('block'),
		target_php = $(form).data('php'),
		target_popup = $(form).data('success'),
		formsubscrube = formsubscrube + '&action=ajax';
	if(target_popup === undefined){
		ajaxpostshow(target_php, formsubscrube, target_block, form);
	}else{
		ajaxpostshow1(target_php, formsubscrube, target_popup, form);
	}
	return false;
}

function addToBasket(){
	var b_ = $('.addtocart');
	b_.each(function(){
		$(this).on('click', function(){
			var $this = $(this),
				ajaxaddid = $(this).data('id'),
				timeout;
			$.ajax({
				type: "POST",
				url: "/include/small_basket.php",
				data: 'ajaxaction=add' + '&ajaxaddid=' + ajaxaddid,
				dataType: "html",
				success: function(filter){
					$('.header__navs--cart-inner').html(filter);
					if($this.parents('form').hasClass('modal-form')){
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							BX.showWait();
							ajaxpost("/include/basket.php", "", ".ajax-cart__area");
						}, 10);
					}
				}
			});
			return false;
		});
	});
}

function deleteProducts(){
	$('.table-delete').each(function() {
		var this_  	= $(this),
			btn 	= this_.find('.close');
		btn.on('click', function() {
			// removal imitation
			var parent 	= $(this).parents('.table-row');
			parent.remove();
			BX.showWait();
			var data = $(this).data("link");
			var ajaxcount = data;
			ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area");
		});
	});
}
function updateToSelectMenu() {
	$('.ui-datepicker-title select').selectmenu({
	select: function(e) {
	  $(this).trigger('change');
	  updateToSelectMenu();
	}
  });
  $('.ui-datepicker-title').append($('.ui-selectmenu-menu'));
}



function datepick(){

var item = $( ".datepicker" );
	item.each(function(){

		var _ = $(this);
		_.datepicker({
			changeMonth: true,
			changeYear: true,
			dayNamesMin: ["Вс" , "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			monthNamesShort: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			minDate: 0,
			beforeShow: function() {
				setTimeout(function() {
					updateToSelectMenu()
				},0);
			},
			onChangeMonthYear: function() {
				setTimeout(function() {
					updateToSelectMenu()
				},0);
		   }
		});
		_.datepicker('refresh');
	})
$("body").add('.out').add('.page__outer').scroll(function() {
  item.datepicker('hide');
  $('.datepicker').blur();
});

$(window).resize(function() {
  item.datepicker('hide');
  $('.datepicker').blur();
});
}
$('#zakaz .input-fake').on('click', function () {
	var input = $(this).parent().find('.input-real'),
		val = input.val();
	$.ajax({
		type: "POST",
		url: location.href,
		data: 'ajaxaction=change' + '&item=' + val,
		dataType: "html",
		success: function(data){
			replace = $(data).find('.order_inner').html();
			$('.order_inner').html(replace);
			sliderRange();
			addToBasket();
			if(!$(data).find('form').hasClass('modal-form')){
				popUpsInit();
			}
		}
	});
});
$('.program_menu .input-fake').on('click', function () {
	var _ = $(this),
		parent = _.parent(),
		sect_id = parent.data('id');
		$('.program_menu .checkbox-outer').removeClass('active')
		parent.addClass('active');
	$.ajax({
		type: "POST",
		url: location.href,
		data: 'sect_id=' + sect_id,
		dataType: "html",
		success: function(data){
			replace = $(data).find('.menu_reload').html();
			$('.menu_reload').html(replace);
			menu_reload();
		}
	});
	return false;
});
function menu_reload(){
	$('.menu-nav .m-nav-link').each(function(){
		var _ = $(this);
		if ($('.sort-select-item').is(':visible')) {
			var sect_id = $('.sort-select-item.active a').data('id');
		}else if($('.program_menu').is(':visible')){
			var sect_id = $('.program_menu .checkbox-outer.active').data('id');
		}
		_.on('click', function(){
			if( $(this).attr('href') !== undefined ){
				var link = $(this).attr('href');
				$.get(link, {sect_id: sect_id}, function(data){
					replace = $(data).find('.menu_reload').html();
					$('.menu_reload').html(replace);
					menu_reload();
				});
				return false;
			}
		});
	});
}
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
			
			if($(this).parents('.input-item').length){
				if(_active.length){
					var item = $(this).closest('.input-item'),
						next = item.next('.input-item').find('.select-check');
						next.removeClass('disabled').find('input').prop('checked', false);
						next.trigger('reinit');
				}else{
					var item = $(this).closest('.input-item'),
						next = item.next('.input-item').find('.select-check');
						next.addClass('disabled').find('input').prop('checked', false);
						next.trigger('reinit');
				}
			}
			if(_active.length) {
				_select.parent().hasClass('input-wrapper') ?_button.children('.btn-text').text(''+_active.siblings('span').text()+'').parent().addClass('is-checked') : _button.children('.btn-text').text(''+ _active.siblings('span').text()+'').parent().addClass('is-checked')
			}
			else {
				_button.children('.btn-text').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			CheckForSelect($(this).parents('form'));
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
			_button.parent().removeClass('active').removeClass('error');
			if(_select.hasClass('certificate_programs')){
				var program_id = _input.val(),
					program_text = _label.text().trim();
				$('.sertificat-total').css('visibility', 'hidden');
				$("input[name='RATION").val(program_text);
				$.ajax({
					type: "POST",
					url: "/include/form/backend/certificate_period_sku.php",
					data: 'program_id=' + program_id,
					dataType: "html",
					success: function(data){
						$('.period_reload').html(data);
						$('.certificate_programs').trigger('reinit');
					}
				});
				return false;
			}
			if(_select.hasClass('certificate_period')){
				var price = _input.data('price'),
					period_text = _label.text().trim();
				$("input[name='PERIOD").val(period_text);
				$('.form-total-count').html(price + ' ₽');
				$('.sertificat-total').css('visibility', 'visible');
			}
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
}

function validateForms(){
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function () {
			var form_this = $(this);
			$.validate({
				form : form_this,
				borderColorOnError : true,
				scrollToTopOnError : false,
				onSuccess : function($form) {
					ajaxSubmit($form);
					return false;
				},
				onValidate : function($form) {
					CheckForSelect(form_this);
					checkStars(form_this);
				},
			});
		});
	};
}
function CheckForSelect(form){
	if(form.find('.select-check').length){
		var wrap = form.find('.select-check');
		wrap.each(function(){
			var _ = $(this),
				btn = _.find('.selects'),
				option = _.find('.option.has-error');
			if(option.length){
				_.addClass('error');
				
			}else{
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true
	}
}
function checkStars(form){
	if(form.find('.star-item').length){
		var stars = $('.js-stars');
		if(stars.hasClass('has-success')){
			return true
		}else{
			stars.addClass('has-error');
			return false
		}
	}
}
function AddBlock(){
	if($('.js-add-block-btn').length){
		var btnAdd = $('.js-add-block-btn'),
			btnRemove = $('.js-remove-block-btn'),
			form = btnAdd.parents('form'),
			mainParent = form.parent(),
			blockFirst = mainParent.find('.more-block'),
			inClass = 'form-in',
			addedClass = 'more-block',
			checkClass = 'block-loaded',
			deletedName = 'DELETE_ADDRESS[]',
			target = mainParent.find('.is-hide .form-in');

		form.each(function(){
			//добавление блока
			$(this).on('click','.js-add-block-btn',function(){
				var _ = $(this);
				setTimeout(function(){
					validateForms();
				}, 100);
				//для блоков в форме заказа
				if(target.hasClass('white-box')){
					var cont = form.find('.more-block').last(),
						daters = mainParent.find('.datepicker'),
						blockAddbtn = cont.find(btnAdd);

					ChangeInputsGroup(cont,target);
					$('.datepicker').removeAttr('id').datepicker('destroy');
					target.clone().insertAfter(cont).addClass(addedClass).removeClass(inClass).prevAll('.'+addedClass).addClass(inClass);
					datepick();
					$('.datepicker').datepicker('refresh');
					AddressInput();
					return false;
				}
				//для инпута соц сетей в отзывах
				if(target.hasClass('input-item')){
					var cont = form.find('.inputs-cont');
					target.clone().appendTo(cont).addClass(addedClass).removeClass(inClass).prevAll('.'+addedClass).addClass(inClass);
					return false;
				}
		
			});
			$(this).on('click','.js-remove-block-btn',function(){
				var _ = $(this),
					block =  _.parents('.'+addedClass);
				if(block.hasClass(checkClass)){
					var controlInput = block.find('input[type="hidden"]');
					controlInput.attr('name',deletedName).detach().appendTo(form);
				}
				if(!block.hasClass(inClass)){
					block.prev().removeClass(inClass);
					block.remove();
				}else{
					block.remove();
				}
			});
			//меняем послежднюю цифру инпута
			function ChangeInputsGroup(elem,block){
					if(block.find('.checkbox-wrap:not(.day-check)').find('input[type=radio]').length){
					var inputsPrev = block.find('.checkbox-wrap:not(.day-check)').find('input[type=radio]').attr('name'),
						inputsNew = elem.find('.checkbox-wrap:not(.day-check)').find('input[type=radio]').attr('name'),
						inputsPrevId = +inputsPrev.charAt(inputsPrev.length -1),
						inputsNewId = +inputsNew.charAt(inputsNew.length -1);

						var newRes = inputsNew.slice(0, -1) + incrementId(inputsPrevId,inputsNewId);;
						block.find('input[type=radio]').each(function(){
							$(this)[0].setAttribute('name', newRes);
						});
					}
				}
			function incrementId(gpold,gpnew){
				gpnew <= gpold ? gpnew = gpold + 1 :  gpnew;
				return gpnew
				
			}
		});
	}
};
function JS_ClearDropZone(){
	if($("div").is(".js-dropzone")){
		var objDZ = Dropzone.forElement(".js-dropzone");
		objDZ.emit("resetFiles");
	}
}
function AddressInput(){
	if(window.suggestions != 'undefined'){
		var addresBlock = $('.more-block'),
			serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
			token = "c1dfceac2bc6837d11061b8e48f5e6abcaf72adb",
			type = "ADDRESS";

		addresBlock.each(function(){
			var _ = $(this),
				$region = _.find(".address-region"),
				$city   = _.find(".address-city"),
				$street = _.find(".address-street"),
				$house  = _.find(".address-house"),
				area =  [
					// Москва
					{
						locations: { region: 'Москва' },
						deletable: true
					},
					// Московская область
					{
						// label: 'МО',
						locations: { kladr_id: '50' },
						deletable: true
					}
				];
			$region.suggestions({
			  serviceUrl: serviceUrl,
			  token: token,
			  type: type,
			  hint: false,
			  bounds: "region-area",
			  constraints: area
			});
			// город и населенный пункт
			$city.suggestions({
				serviceUrl: serviceUrl,
				token: token,
				type: type,
				hint: false,
				preventBadQueries: true,
				bounds: "city-settlement",
				constraints: $region,
			});
			// улица
			$street.suggestions({
				serviceUrl: serviceUrl,
				token: token,
				type: type,
				hint: false,
				preventBadQueries: true,
				bounds: "street",
				constraints: $city,
			});
			//дом
			$house.suggestions({
				serviceUrl: serviceUrl,
				token: token,
				type: type,
				hint: false,
				bounds: "house",
				constraints: $street
			});
			//обнуляем регионы если ввод начинается заново
			$($city).on('input',function(){
				var val = $(this).val();
				val.length === 0 ? $region.suggestions('clear') : false
			});
		});
	}
}