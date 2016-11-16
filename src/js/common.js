$(document).ready(function() {
// document.body.addEventListener('touchmove',function(e){
//       e.preventDefault();
//   });
// $('.out').bind('touchmove', function(e){
//   e.stopPropagation();
// });
// var selScrollable = '.out';
// // Uses document because document will be topmost level in bubbling
// $(document).on('touchmove',function(e){
//   e.preventDefault();
// });
// // Uses body because jQuery on events are called off of the element they are
// // added to, so bubbling would not work if we used document instead.
// $('html').on('touchstart', selScrollable, function(e) {
//   if (e.currentTarget.scrollTop === 0) {
//     e.currentTarget.scrollTop = 1;
//   } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
//     e.currentTarget.scrollTop -= 1;
//   }
// });
// Stops preventDefault from being called on document if it sees a scrollable div
// $('html').on('touchmove', selScrollable, function(e) {
//   e.stopPropagation();
// });
function DesktopMenu(){

	var mainCont = $('.c-menu-block.main'),
		items = mainCont.find('.js-desktop-hover'),
		targetWrap = $('.menu-dropdown-wrapper'),
		targetItems = targetWrap.find('.menu-dropdown-cont'),
		shown = 'is-shown',
		current = 'is-current';

	items.each(function(){
		var _ = $(this),
			link = _.find('a'),
			id = parseInt(link.data('elem'));
			_.on('mouseenter',function(){
				_.addClass('active').siblings().removeClass('active');
				targetWrap.addClass(shown);
				targetWrap.find("[data-elem="+ id +"]").addClass(current).siblings().removeClass(current);
			})
	});
	mainCont.add(targetWrap).on('mouseleave',function(){
		setTimeout(function(){
				if ($('.menu-dropdown-wrapper:hover').length != 1 && !$('.c-menu-block.main:hover').length != 0 ) {
					targetWrap.removeClass(shown);
					items.removeClass('active')
			}
		},1)

	})
} DesktopMenu();

function MobileMenu(){
	
	var maintogle = $('.js-menu-toggle'),
			subtogle = $('.js-sub-toggle');

		subtogle.children('a').on('click',function(){
			$(this).parent().toggleClass('active').siblings().removeClass('active');
		});
		maintogle.on('click',function(){
			$(this).toggleClass('active');
			subtogle.removeClass('active');
		})
} MobileMenu();

function MobileAbout(){
	
	var togle = $('.cart_wrap-modaltrigger'),
		target = $('.header_mobile-contacts'),
		closer = $('.js-modaltrigger-close');

		togle.on('click',function(){
			target.addClass('is-visible');
		})
		closer.on('click',function(){
			target.removeClass('is-visible');
		})
} MobileAbout();

function FocusInput(){
	
	var input = $('.search__input');

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

(function(){

	var mainHeader = $('.out .cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 250;

	$('.out').on('scroll', function(){
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
		var currentTop = $('.out').scrollTop();

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

function jshover(){
	
	var togle = $('.js-hover'),
			target = togle.find('.dropdown-target'),
			timeout = 250;

			togle.on('mouseenter', function(){
				var _ = $(this);
				setTimeout(function(){
					_.addClass('active');
					target.addClass('active');
				},timeout);
			});


		togle.on('mouseleave',function(){
			setTimeout(function(){
						console.log()
						if ((target+':hover').length != 0 && (togle+':hover').length != 1 ) {
						target.add(togle).removeClass('active');
						timeout = timeout;
				}
			},251);
		});
} jshover();

compareHeight();

function Tabs(){
if($('.js-tabs-wrap').length){
	
	var parent = $('.js-tabs-wrap');
		parent.each(function(){
			var _ = $(this),
				trigger = _.find('.js-tab-trigger'),
				tabbody = _.find('.tabs-body'),
				tabcont = tabbody.find('.tabs-cont'),
				triggerCur = _.find(trigger).filter('.active'),
				triggerIndex = triggerCur.index();

		if(!triggerCur.length){
			tabcont.not(':first').hide();
			trigger.first().addClass('active');
		}else{
			tabcont.hide().eq(triggerIndex).show();
		}

		

		trigger.on('click',function(e){
			var _ = $(this);
			e.preventDefault();
			if(!_.hasClass('active')){

				_.addClass('active').siblings().removeClass('active')
				var triggerA = parent.find(trigger).filter('.active');
				tabcont.hide().eq($(triggerA).index()).fadeIn().find('.slick-slider').slick('setPosition');
			}
		});
			//for gmap
		trigger.on('click',function(){
				var _t = $(this);
				if(tabcont.eq(_t.index()).find('#map').length && !_t.hasClass('loaded')){
						_t.addClass('loaded');
						initMap();
				}
		});
		trigger.on('click',function(){
				var _d = $(this),
						themer = _d.parent(),
						contact = _d.parent().parent().parent();
				if(contact.hasClass('contact-section')){
						if(tabcont.eq(_d.index()).find('#map').length && themer.hasClass('t-white')){
								themer.removeClass('t-white');
						}
						else{
								themer.addClass('t-white');
						}
				}

		});
	});
}
} Tabs();
function Accordeon(){
if($('.offerlist-section').length){
	var maintrigger = $('.js-accordion-trigger'),
		body = $('.js-accordion-body'),
		truetrigger = maintrigger.children('.table-item').not('.table-status').not('.table-btn');
		maintrigger.not('.active').find(body).hide();
		truetrigger.on('click',function(event){
			var parent = $(this).parent(),
				target = parent.find(body);
			if(parent.hasClass('active')){
				parent.siblings().removeClass('active').find(body).slideUp(200);
				parent.removeClass('active').find(body).slideUp(300);
			}else{
				parent.siblings().removeClass('active').find(body).slideUp(200);
				parent.addClass('active').find(body).slideDown(300, function(){
						var pos = parent.position().top;
						parent.hasClass('vacancy-head') ? jQuery(".out:not(:animated)").animate({scrollTop: pos }, 500) : jQuery(".out:not(:animated)").animate({scrollTop: pos + 200}, 500)
						
				});
			}
		});
	}
}Accordeon();

function pricerange(){
	var amount = $('#amount');
	var price = parseFloat($('#total-price').data('price'));
	var defaultPrice =  parseFloat(price / 1000 * 300);
	var textcont = $('.prepay-wrap').find('.error-text');
	var errTextMin = textcont.data('text-error-min');
	var errTextMax = textcont.data('text-error-max');
	var target = amount.parent().find('.fake-bg-text');
		$( "#rangeinput" ).slider({
			range: "min",
			value: 300,
			step: 10,
			min: 0,
			max: 1000,
			create: function( event, ui ) {
				$(this).slider( "option", "value", 300  );
				amount.val( (price / 1000 * 300).toFixed(2));
				target.text((price / 1000 * 300).toFixed(2));
				$(this).find('.ui-slider-handle').attr('data-persent',30  + '%');
			},
			slide: function( event, ui ) {
			amount.val( (price / 1000 * ui.value).toFixed(2));
			target.text((price / 1000 * ui.value).toFixed(2));
			handle.attr('data-persent', ui.value / 10  + '%' );
			 if (ui.value < 300) {
			 		amount.val((price / 1000 * 300).toFixed(2));
			 		target.text((price / 1000 * 300).toFixed(2));
					handle.attr('data-persent', 30 + '%' );
			        // return false
			    } else if(ui.value > 300){
					amount.parent().parent().removeClass('error');
			    	return true
			    }
			},
			change: function( event, ui ) {
				if (ui.value < 300) {
					$("#rangeinput").slider('option','value',300)
					return false
				}else if(ui.value > 300){
			    	return true
			    	amount.parent().removeClass('error');
			    }
			    
			}
	    });
	var handle = $( "#rangeinput" ).find('.ui-slider-handle');

	amount.on('input',function(e){
		var _ = $(this),
			value = parseFloat(_.val()),
			range = parseInt(((100 * value / price)) * 10),
			min = $( "#rangeinput" ).slider( "option", "min" ),
			max = $( "#rangeinput" ).slider( "option", "max" );

		if(value < defaultPrice || !value){
			amount.parent().parent().addClass('error');
			textcont.text(errTextMin)
			if(!value){
				target.text('');
				
			}else{
				target.text(value)
				
			}
			return false;
		}
		if(value > parseFloat(price).toFixed(2)){
			amount.parent().parent().addClass('error');
			textcont.text(errTextMax)
			target.text(value);
			return false
		}
		target.text(value);
		amount.parent().parent().removeClass('error').find(textcont).empty();
		compareRange(range, value)
	});

	amount.keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;
		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		if(!/\d/.test(keyChar))	return false;
	});
    function compareRange(range, value){
		$("#rangeinput").slider("value", range);
		handle.attr('data-persent', range/10 + '%');
		
	}

}pricerange();

if($('#map').length){
	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {lat: 53.955, lng: 27.715360},
			streetViewControl: false,
			panControl: false,
			mapTypeControl: false,
			scaleControl: false,
			scrollwheel: false,
			zoomControlOptions: {
	        position: google.maps.ControlPosition.RIGHT_CENTER
	    },
			styles:[
			{
					"featureType": "administrative",
					"elementType": "all",
					"stylers": [
							{
									"visibility": "on"
							},
							{
									"lightness": 33
							}
					]
			},
			{
					"featureType": "administrative",
					"elementType": "labels",
					"stylers": [
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "administrative",
					"elementType": "labels.text",
					"stylers": [
							{
									"gamma": "0.75"
							}
					]
			},
			{
					"featureType": "administrative.neighborhood",
					"elementType": "labels.text.fill",
					"stylers": [
							{
									"lightness": "-37"
							}
					]
			},
			{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#f9f9f9"
							}
					]
			},
			{
					"featureType": "landscape.man_made",
					"elementType": "geometry",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"lightness": "40"
							},
							{
									"visibility": "off"
							}
					]
			},
			{
					"featureType": "landscape.natural",
					"elementType": "labels.text.fill",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"lightness": "-37"
							}
					]
			},
			{
					"featureType": "landscape.natural",
					"elementType": "labels.text.stroke",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"lightness": "100"
							},
							{
									"weight": "2"
							}
					]
			},
			{
					"featureType": "landscape.natural",
					"elementType": "labels.icon",
					"stylers": [
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"lightness": "80"
							}
					]
			},
			{
					"featureType": "poi",
					"elementType": "labels",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"lightness": "0"
							}
					]
			},
			{
					"featureType": "poi.attraction",
					"elementType": "geometry",
					"stylers": [
							{
									"lightness": "-4"
							},
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#c5dac6"
							},
							{
									"visibility": "on"
							},
							{
									"saturation": "-95"
							},
							{
									"lightness": "62"
							}
					]
			},
			{
					"featureType": "poi.park",
					"elementType": "labels",
					"stylers": [
							{
									"visibility": "on"
							},
							{
									"lightness": 20
							}
					]
			},
			{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
							{
									"lightness": 20
							}
					]
			},
			{
					"featureType": "road",
					"elementType": "labels",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"gamma": "1.00"
							}
					]
			},
			{
					"featureType": "road",
					"elementType": "labels.text",
					"stylers": [
							{
									"gamma": "0.50"
							}
					]
			},
			{
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"gamma": "0.50"
							}
					]
			},
			{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#c5c6c6"
							},
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
							{
									"lightness": "-13"
							}
					]
			},
			{
					"featureType": "road.highway",
					"elementType": "labels.icon",
					"stylers": [
							{
									"lightness": "0"
							},
							{
									"gamma": "1.09"
							}
					]
			},
			{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#e4d7c6"
							},
							{
									"saturation": "-100"
							},
							{
									"lightness": "47"
							}
					]
			},
			{
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [
							{
									"lightness": "-12"
							}
					]
			},
			{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#fbfaf7"
							},
							{
									"lightness": "77"
							}
					]
			},
			{
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [
							{
									"lightness": "-5"
							},
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [
							{
									"saturation": "-100"
							},
							{
									"lightness": "-15"
							}
					]
			},
			{
					"featureType": "transit.station.airport",
					"elementType": "geometry",
					"stylers": [
							{
									"lightness": "47"
							},
							{
									"saturation": "-100"
							}
					]
			},
			{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
							{
									"visibility": "on"
							},
							{
									"color": "#acbcc9"
							}
					]
			},
			{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
							{
									"saturation": "53"
							}
					]
			},
			{
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [
							{
									"lightness": "-42"
							},
							{
									"saturation": "17"
							}
					]
			},
			{
					"featureType": "water",
					"elementType": "labels.text.stroke",
					"stylers": [
							{
									"lightness": "61"
							}
					]
			}
		]

	});
	var image = {
		url: 'img/marker.png',
		size: new google.maps.Size(82, 90),
		scaledSize: new google.maps.Size(41, 45), 
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 45)
	}
	var beachMarker = new google.maps.Marker({
		position: {lat: 53.959612, lng: 27.715360},
		map: map,
		icon: image
	});

		
} initMap();

}
if($('.js-colors').length){
function Colors(){
	var trigger = $('.js-colors');
	var target = $('.colors-wrapper');
	var dest = target.offset().top;

	trigger.on('click', function(){
		target.toggleClass('active');
		jQuery(".out:not(:animated)").animate({scrollTop: dest - 60}, 500);
	});
}Colors();
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
						valuename = _button.data('valuename'),
            _list = _select.find('.select-list');

        _select.on('reinit', function() {
            var _active = _list.find('input:checked');

            if(_active.length) {
            	_select.parent().hasClass('input-wrapper') ?_button.children('.btn-text').text('' + valuename  + _active.siblings('span').text()+ '').parent().addClass('is-checked') : _button.children('.btn-text').text('' + valuename + ': ' + _active.siblings('span').text()+ '').parent().addClass('is-checked')
                
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

function number() {
	var number = $('.js-number');
	number.each(function(){
		var max_number = $(this).attr("data-max-number");
		var type = $(this).data('type');
		var step = parseFloat($(this).data('step'));
		var input = $(this).find("input");
		var plus = $(this).find(".js-plus-number");
		var minus = $(this).find(".js-minus-number");
		var add = $(this).parent().find('.js-add');
		plus.on("click", function(){
			var val = parseFloat(input.val());
			console.log(val)
			if (val >= max_number) {
				return false
			}
			else {
				val += step;
				if(input.val().length >4){
					input.val(''+ val.toFixed(1)+ '' + type+ '');
				}
				else{
					input.val(''+ val+ '' + type+ '');
				}
			};				
			input.trigger('change');
		});
		minus.on("click", function(){
			var val = parseFloat(input.val());
			if (val > step) {
				val -= step;
				if(input.val().length> 4){
					input.val(''+ val.toFixed(1)+ '' + type+ '');
				}
				else{
					input.val(''+ val+ '' + type+ '');
				}
			}
			else{
					input.val(''+ 0 + '' + type+ '');
				}
				// input.val(''+ val.toFixed(1)+ '' + type+ '');
			input.trigger('change');
			return false;
		});
		input.on("change", function(){
			var val = +$(this).val();
			// if (val > max_number) {
			// 	val = max_number;
			// 	$(this).val(val);
			// }
			if (val == '' || val < 0 || !val > max_number) {
				val = 0;
				$(this).val(val + type);
			}
		});
		input.on("paste", function(event){
			event.preventDefault();
		});
		input[0].onkeypress = function(e) {
			e = e || event;
			e.preventDefault();
			if (e.ctrlKey || e.altKey || e.metaKey) return;
			var chr = getChar(e);
			if (chr == null) return;
			if (chr < '0' || chr > '9') {
				return false;
			}
		}
	});
} number();

function getChar(event) {
		if (event.which == null) {
			if (event.keyCode < 32) return null;
			return String.fromCharCode(event.keyCode) // IE
		}
		if (event.which != 0 && event.charCode != 0) {
			if (event.which < 32) return null;
			return String.fromCharCode(event.which) 
		}
		return null;
	}
function filterProducts() {
	var trigger = $('.js-select-trigger');

	trigger.each(function(){
		var _ = $(this),
				button = _.find('.selects'),
				textCont = _.find('.btn-text'),
				container = _.find('.dropdown-target'),
				placeholder = button.data('placeholder'),
				valuename = button.data('valuename'),
				value = button.data('value'),
				submit = _.find('.js-filter-submit'),
				price = _.find('.price'),
				clear = _.find('.js-select-clear');

		_.on('click', '.selects', function(event){
			event.preventDefault();
			_.toggleClass('active').siblings().removeClass('active');

		});
		price.keypress(function(event){
			var key, keyChar;
			if(!event) var event = window.event;
			if (event.keyCode) key = event.keyCode;
			else if(event.which) key = event.which;
			if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
			keyChar=String.fromCharCode(key);
			if(!/\d/.test(keyChar))	return false;
		});
		price.on("paste", function(event){
			event.preventDefault();
		});
		submit.on('click', function(e){
			var wrapper = $(this).closest('.dropdown-content'),
					input = wrapper.find('input'),
					selCont = wrapper.find('.selected-list'),
					unselCont = wrapper.find('.select-u-body');
					e.preventDefault();
			$(this).closest(trigger).removeClass('active');
			_.trigger('reinit');
			
			setTimeout(function(){
				input.each(function(){
					var _this= $(this),
					parent = _this.closest('.select-u-item');

					if(_this.is(':checked')){
					 	parent.detach().appendTo(selCont);
					}
					else{
						parent.detach().appendTo(unselCont);
					}

					sortArr(selCont);
					sortArr(unselCont);
				});
			},500);

			clear.on('click', function(e){
				e.preventDefault();
				_.removeClass('active , is-checked').find('input').prop('checked', false); 
				selCont.find('.select-u-item').detach().appendTo(unselCont);
				sortArr(unselCont);
				textCont.text(placeholder);
				price.val('');
			})
		});

			//реинит реинит смотри как умею ахуеть да?)
		_.on('reinit', function(){

			var tta = $(this),
				innerCont = tta.find('.dropdown-content'),
				inputs = innerCont.find('input:checked'),
				price = tta.find('.price'),
				priceMin = tta.find(".price-min").val(),
				priceMax = tta.find(".price-max").val(),
				textmoded = '';
				modText(inputs)
					
				if(inputs.length && !price.length) {
		            tta.addClass('is-checked');
		            textCont.text('' + valuename + ': ' + textmoded +' ' + value)
		        }
		        else if(!inputs.length && price.length){
					tta.addClass('is-checked');
		            textCont.text('' + valuename + ': ' + priceMin + '-'+ priceMax +' ' + value)
		        }
		        else {
		            tta.removeClass('is-checked');
		            textCont.text(placeholder);
		            
		        }

				function modText(inp){
					inp.each(function(){
						var text = $(this).parents('.input_label').find('.input-text').text(),
							textMod = text + ', ';
							textmoded += textMod;
					})
				}
		});
			//сортируем массив
			function sortArr(cont){
				var arr = [],
						elems = cont.find('li');

				elems.each(function(index){
					var data = [];
						data[0] = $(this).find('input').data("value");
					  data[1] = $(this).prop("outerHTML");
						arr[index] = data;
				});
				arr.sort();
				setTimeout(function(){
					AppendNewArr(arr,cont)
				},10)
			}
			// выплевываем его
			function AppendNewArr(elem,cont){
				cont.empty();
				for(var i = 0; i < elem.length; i++) {
				  var arrs = elem[i];
				  cont.append(arrs[1])
				}
				$('.selected-list input').prop('checked', true);
			}
	});

    $(document).on('mouseup', function (e){
        if (!trigger.is(e.target)
            && trigger.has(e.target).length === 0) {
            trigger.removeClass('active');
        }
    });
} filterProducts();

function drag() {
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
} drag();

function mobileFilter(){
	var trigger = $('.mobile-dropdowm-trigger');

	trigger.on('click', function(){
		$(this).toggleClass('active');
	})
}mobileFilter();

if($('.sort_wrapper').length){

 	var sortItem = function(){
 		var trigger = $('.js-select-item');

 		trigger.on('click', function(){
 			var _ = $(this);
 			var textCont = _.find('span');
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

$(".js-scroll").on('click', function () {
		console.log(1)
    var elementClick = $(this).data("target")
    var destination = $(elementClick).position().top;
    console.log(elementClick,destination )
    $(".out").animate({scrollTop: destination + 30}, 420);

     if (elementClick == '#tabs') {
     	$(".tabs-item").first().trigger('click');
     }
     else if (elementClick == '#top') {
     	$(".out").animate({scrollTop: 0}, 420);
     }
	});


function modalOff(){
	var trigger =$('.js-white');
	var val = 0;
	$('.sertivicat-wrap').find('.product-add-item').each(function(){
		var t = $(this);
		t.attr('data-slick-index', val)
		val++;
	})
			

	trigger.click(function(e){
		if($(window).width()> 991){
			var _ = $(this);
			var target = _.data('target');
			var ftarget = $('.out').find(target);
			var maincont = ftarget.find('.product-modal-slider');
			var dopcont = ftarget.find('.white-thumbs');
			var arrcont = ftarget.find('.cards-slider-nav');
			var closer = ftarget.find('.js-modal-closer');
			var mainSlides = _.parent().find('.product-slider-item');
			var addSlides = _.parent().find('.product-add-item');
			var currslide = _.find('.slick-active').data('slick-index');
			console.log(currslide)
			ftarget.addClass('active')

			addSlides.clone().appendTo(dopcont).addClass('slick-slide').attr('role',"option").removeAttr('style').removeAttr('tabindex');
			mainSlides.clone().appendTo(maincont).removeAttr('style').removeAttr('tabindex');


			slidesCount(maincont);

			maincont.slick({
				arrows: true,
				slidesToShow: 1,
				asNavFor: dopcont,
				infinite: false,
				appendArrows: arrcont,          
				nextArrow:'<button type="button" class="carousel-next"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.9 14" style="enable-background:new 0 0 45.9 14;" xml:space="preserve"><style type="text/css">.slider-arr{fill-rule:evenodd;clip-rule:evenodd;fill:#353535;}</style><g><g><polygon class="slider-arr" points="45.9,6.8 38.9,0 37.9,1 42.9,6 0,6 0,7.5 43,7.5 37.6,12.9 38.7,14 45.7,7 "/></g></g></svg></div></button>',
	      prevArrow:'<button type="button" class="carousel-prev"><div class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.9 14" style="enable-background:new 0 0 45.9 14;" xml:space="preserve"><style type="text/css">.slider-arr{fill:#353535;}</style><g><g><polygon class="slider-arr" points="0.2,7 7.2,14 8.3,12.9 2.9,7.5 45.9,7.5 45.9,6 3,6 8,1 7,0 0,6.8     "/></g></g></svg></div></button>',
			});

			dopcont.slick({
				asNavFor: maincont,
				// slidesToShow: 3,
				slidesToScroll: 1,
				infinite: false,
				rows: 6,
				slidesPerRow: 3,
				draggable: false,
				arrows:false,
				focusOnSelect: true,
			});
			maincont.slick('slickGoTo', currslide).slick('setPosition');
			if(currslide === undefined){
				dopcont.find('.product-add-item').first().addClass('curr');
			}else{
				console.log(1)
				dopcont.find('[data-slick-index = '+ currslide +']').addClass('curr');
			}
			

			maincont.on('init reinit beforeChange',function(event, slick, currentSlide, nextSlide){
				var slidesNext = parseInt(nextSlide);
				leftblocks.removeClass('curr');
				dopcont.find('[data-slick-index = '+ slidesNext +']').addClass('curr');
			});
			var ing = dopcont.find('.product-add-img');
			var leftblocks = dopcont.find('.product-add-item');
				leftblocks.each(function(){
					var t = $(this);
						index = t.data('slick-index');
					t.on('click', function(){
						console.log(1)
						leftblocks.removeClass('curr');
						t.addClass('curr')
						
					});
				});

				if(ing.length == 0){
					dopcont.find('img').wrap("<div class='product-add-img'></div>" );
				}
			closer.on('click', function(){
				console.log(1)
				ftarget.removeClass('active').find('.slick-slider').slick('unslick');
				maincont.empty();
				dopcont.empty();
			});
		}else{
			return false
		}
	});

}modalOff();
$(window).resize(function(){
	modalOff();
});
//end of document ready
});
//end of document ready

function slidesCount(elem){
	var container = elem.parent().find('.cards-slider-counter'),
			curSlideCont = container.find('.cards-slider-current'),
			totatSlideCont= container.find('.cards-slider-total'),
			btns = elem.parent().find('.cards-slider-nav'),
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
function modals(val){

	var trigger = $(".js-modal-trigger"),
			closer = $('.js-modal-closer'),
			body = $('.out');
		var data = val.data('target');
		body.addClass('modal-opened').find(data).addClass('active');
		
		$(document).mouseup(function (e){ 
				var div = $('.modal-container');
				if (!div.is(e.target) 
				    && div.has(e.target).length === 0) {
					div.parent().removeClass('active');
					body.removeClass('modal-opened')
					var slider =div.parent().find('.slick-slider');
					setTimeout(function(){
						slider.slick('unslick');
					},300);
					
				}
			});
	closer.click(function(){
			var target = $(this).parents('.modal-layout').removeClass('active');
			var slider =$(this).parent().find('.slick-slider');
			body.removeClass('modal-opened');
			if(slider.length){
				setTimeout(function(){
					slider.slick('unslick');
					slider.children().remove();
				},300);
			}
		});
	return false
}
function compareHeight(){
	setTimeout(function(){
		$('.categories-elem-outer .categories-elem')
		.add('.slider-section-inner .product-card-inner')
		.add('.products-inner .product-card-inner')
		.add('.slider-card-inner .product-card-inner')
		.add('.specials-wrapper .specials-item')
		.add('.sertivicat-wrap .sertivicat-item')
		.add('.pagenews-container .news-block-outer.small .news-block-content-inner').matchHeight({
			 property: 'min-height'
		});
	},300)

	// $('.slider-section-inner .product-card-inner').matchHeight({
	// 	 property: 'min-height'
	// });
	// $('.products-inner .product-card-inner').matchHeight({
	// 	 property: 'min-height'
	// });
	// $('.specials-wrapper .specials-item').matchHeight({
	// 	 property: 'min-height'
	// });
	// $('.sertivicat-wrap .sertivicat-item').matchHeight({
	// 	 property: 'min-height'
	// });
	// $('.pagenews-container .news-block-outer.small .news-block-content-inner').matchHeight({
	// 	 property: 'min-height'
	// });
}