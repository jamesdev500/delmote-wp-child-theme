// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

jQuery(document).ready(function($) {

	$(".search-close").click(function() {
		$("body").toggleClass("search-open");
	});

	$('.header-search-btn').click(function() {
		var headerSearchSection = $('.header-search-section');
		var headerMainNav = $('#main-nav');

		headerSearchSection.each(function() {
			if ($(this).is(':hidden')) {
				$(this).show();
				headerMainNav.hide();
			} else {
				$(this).hide();
				headerMainNav.show();
			}
		});

	});

	// Enable Font Awesome 5 on pseudo elements
	window.FontAwesomeConfig = {
		searchPseudoElements: true
	};

	// $("body").children().each(function() {
	//     $(this).html($(this).html().replace(/&#8232;/g, " "));
	// });


	console.log('init');

	//Announcement Bar hide if closed once
	if (localStorage.getItem('aState') != 'shown') {
		$('#announcement').fadeIn();
	}

	$('#aClose').click(function() {
		localStorage.setItem('aState', 'shown');
		$('#announcement').fadeOut(350);
		$('#announcement').addClass("elementor-invisible");
	});

	//Secondary Navigation + Header Display on Scroll Up or Down

	//     var position = $(window).scrollTop();
// 	var position = 2000;

// 	$(window).scroll(function() {
// 		var scroll = $(this).scrollTop();
// 		if (scroll > position) {
// 			// $('.sticky-header').fadeOut(1);
// 			$('.sub-navigation').fadeIn(1);
// 			$('#elementor-popup-modal-2184').hide();
// 			$('#elementor-popup-modal-2192').hide();

// 			$('.elementor-location-header').addClass('header-up');
// 		} else {
// 			$('.sub-navigation').fadeOut(1);
// 			// $('.sticky-header').fadeIn(1);

// 			$('.elementor-location-header').removeClass('header-up');
// 		}
// 		position = scroll;
// 	});
// 	
// 	
// 	
// 	
	var position = 200;

	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if (scroll > position) {
			// $('.sticky-header').fadeOut(1);
			$('.sub-navigation').fadeIn(1);
			$('#elementor-popup-modal-2184').hide();
			$('#elementor-popup-modal-2192').hide();

			$('.elementor-location-header').addClass('header-up');
		} else {
			$('.sub-navigation').fadeOut(1);
			// $('.sticky-header').fadeIn(1);

			$('.elementor-location-header').removeClass('header-up');
		}
	});
	
	
	
	//Planet Maps on Hover

	$('.planet-pins .wp-caption, .planet-pins').hover(function() {
		$(this).parent().append($('<div class="pulse-container"><div class="pulse" style="animation-delay: -2.5s"></div><div class="pulse" style="animation-delay: -2s"></div><div class="pulse" style="animation-delay: -1.5s"></div><div class="pulse" style="animation-delay: -1s"></div><div class="pulse" style="animation-delay: 0s"></div></div>'));
		$(this).find('.pin-name, .pin-zoom').css({ 'opacity': '1', 'transition': 'all .25s' });
	}, function() {
		$(this).parent().find(".pulse-container").fadeOut(300, function() {
			$(this).remove();
		});
		$(this).find('.pin-name, .pin-zoom').css({ 'opacity': '0', 'transition': 'all .25s' });
	});

	setTimeout(function() {
		var timeout;
		var sliderLite = $('#sliderLite').find('.slick-slider');
		$('.planet-pins .elementor-widget-image').hover(function() {
			var pinId = $(this).data('slide');
			var pinIndex = sliderLite.find('[data-post-id="' + pinId + '"]').data('slick-index');
			timeout = setTimeout(function() {
				sliderLite.slick('slickPause').slick('slickGoTo', pinIndex);
			}, 500);
		}, function() {
			clearTimeout(timeout);
			sliderLite.slick('slickPlay');
		});

		$('.planet-pins').click(function() {
			$('.slide-item-container > div > .elementor-element:not(:first-child)').fadeOut('slow');
		});

		// $('#sliderContainer').hover(function() {
		// 	$('.slide-item-container > div > .elementor-element:not(:first-child)').show();
		// }, function() {
		// 	$('.slide-item-container > div > .elementor-element:not(:first-child)').fadeOut( 'slow' ); 
		// });

		// $('.planet-pins .elementor-widget-image').click(function() {
		// 	$('.slide-item-container > div > .elementor-element:not(:first-child)').show();
		// });	
		$('#planetMore').click(function(e) {
			e.preventDefault()
			$('.slide-item-container > div > .elementor-element:not(:first-child)').show();
		});

	}, 1500);

	//Stock Widget
	var $sc = $('.stock-change').find('.elementor-icon-box-title').text().trim();
	var $change = parseFloat($sc);

	setTimeout(function() {
		if ($change < 0) {
			$('.stock-change').find('.elementor-icon').css('transform', 'scaleY(-1)');
		}
	}, 1000);

	//Timeline Section
	setTimeout(function() {

		var sliderTime = $('.timeline').find('.slick-slider');

		$('.century .elementor-widget-button').click(function(e) {
			e.preventDefault();
			var pLink = $(this).data('slide');
			var pIndex = sliderTime.find('[data-post-id="' + pLink + '"]').data('slick-index');
			sliderTime.slick('slickPause').slick('slickGoTo', pIndex);
		});

		$('#century').change(function() {
			var pLink = $(this).val();
			var pIndex = sliderTime.find('[data-post-id="' + pLink + '"]').data('slick-index');
			sliderTime.slick('slickPause').slick('slickGoTo', pIndex);
		});

	}, 1000);



    /// Products sliders

	setTimeout(function () {
		// var produceProdCount = $('#produceProduct .jet-slick-dots li').length - 1;

		// $('#produceProduct .slick-slide').each(function() {
		// 	for (let i = 0; i < produceProdCount; i++) {
		// 		var p = $(this);
		// 		var bg = p.siblings().eq(p.index() + i).find('img').attr('src');
		// 		var link = p.siblings().eq(p.index() + i).data('post-id');
		// 		$(this).find('.product-image .tile-wrap').append('<a data-link="' + link + '" style="background-image: url(' + bg + ')" class="prod-tile prod-' + i + '"></a>');
		// 	}
		// });

		const productSliders = document.querySelectorAll('[id^="produceProduct"] .slick-slider');
		
		$(productSliders).each(function (index) {

			const currentSlider = $(this);

			$(currentSlider).append('<div class="tile-wrap"><div class="tiles"></div></div>');

			var dots = $(currentSlider).find('.jet-slick-dots');
			var arrows = $(currentSlider).find('.slick-arrow');

			dots.wrap('<div class="i-content"></div>');
			var ic = $(currentSlider).find('.i-content');

			arrows.appendTo(ic);

			function generateSlideTile(slide) {
				var bg = slide.find('img').attr('src');
				var link = slide.data('post-id');
				$(currentSlider).find('.tiles').append('<a data-link="' + link + '" style="background-image: url(' + bg + ')" class="prod-tile"></a>');
			}

			function populateTiles() {
				const currentActiveSlideIndex = $(currentSlider).find('.slick-slide.slick-current').data('slick-index');
				$(currentSlider).find('.slick-slide').each(function () {
					const slideIndex = $(this).data('slick-index');
					if(slideIndex > currentActiveSlideIndex) {
						generateSlideTile($(this));
					}
				});
				$(currentSlider).find('.slick-slide').each(function () {
					const slideIndex = $(this).data('slick-index');
					if(slideIndex < currentActiveSlideIndex) {
						generateSlideTile($(this));
					}
				});

				$(currentSlider).find('.prod-tile').unbind('click');

				$(currentSlider).find('.prod-tile').click(function () {
					var pLink = $(this).data('link');
					var pIndex = currentSlider.find('[data-post-id="' + pLink + '"]').data('slick-index');
					currentSlider.slick('slickPause').slick('slickGoTo', pIndex);
					$(this).closest('.tiles').fadeOut().remove();
					$(currentSlider).find('.tile-wrap').append('<div class="tiles"></div>');
					populateTiles();
				});
			}

			populateTiles();


			dots.add(arrows).click(function () {
				$(currentSlider).find('.tiles').fadeOut().remove();
				$(currentSlider).find('.tile-wrap').append('<div class="tiles"></div>');
				populateTiles();
			});
		});

	}, 1200);


	
	
	// Copy link to clipboard
	$('#copy-link').click(function() {
		var dummy = document.createElement('input'),
			text = window.location.href;

		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		alert('Link copied to clipboard.');
	});

	//Home Map Mobile

	$('.mobile-pin').click(function() {
		var thisLink = $(this).data('slide');
		console.log(thisLink);
		setTimeout(function() {
			var sliderMap = $('.mobile-map-grid').find('.slick-slider');
			var thisIndex = sliderMap.find('[data-post-id="' + thisLink + '"]').data('slick-index');
			sliderMap.slick('slickPause').slick('slickGoTo', thisIndex);

			var maps = [];

			$('.mobile-map-grid .slick-slide').each(function() {
				var title = $(this).find('h3').text();
				var postID = $(this).data('post-id');

				maps.push({
					title: title,
					postID: postID
				});

			});

			var key = 'postID';

			var newMap = [...new Map(maps.map(item => [item[key], item])).values()];

			$.each(newMap, function(i, map) {

				$('#mapsMobile').append('<option value="' + map.postID + '">' + map.title + '</option>');

			});

		}, 1000);

		setTimeout(function() {
			$('.mobile-map-grid .next-arrow').wrap('<div class="nav-container"></div>');
			$('.mobile-map-grid .prev-arrow').appendTo('.mobile-map-grid .nav-container');

			var sliderMap = $('.mobile-map-grid').find('.slick-slider');
			$('#mapsMobile').change(function() {
				var mapLink = $(this).val();
				var pIndex = sliderMap.find('[data-post-id="' + mapLink + '"]').data('slick-index');
				sliderMap.slick('slickPause').slick('slickGoTo', pIndex);
			});

		}, 800);
	});

	// Check if URL parameter exists
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
		return false;
	};

	/*
    Search results page: Populate radio filter
    options with post type count
    */
	var searchValue = getUrlParameter('s');
	if (searchValue) {
		$.ajax({
			type: 'get',
			dataType: 'json',
			url: ajaxUrl,
			data: {
				action: 'get_search_results_count',
				s: searchValue
			},
			success: function(data) {
				$('input[type="radio"][name="_post_type"]').each(function() {
					var postResultCount = '';
					if (!data.success) {
						postResultCount = 0;
					} else {
						if ($(this).val()) {
							postResultCount = (data.data[$(this).val()]) ? data.data[$(this).val()] : 0;
						} else {
							postResultCount = data.data.all;
						}
					}
					$(this).next().find('.jet-radio-list__label').append(' ' + '(' + postResultCount + ')');
				});

				$('select.jet-select__control option').each(function() {
					var postResultCount = '';
					if (!data.success) {
						postResultCount = 0;
					} else {
						if ($(this).text()) {
							postResultCount = (data.data[$(this).text().toLowerCase()]) ? data.data[$(this).text().toLowerCase()] : 0;
						} else {
							postResultCount = data.data.all;
						}
					}
					$(this).append(' ' + '(' + postResultCount + ')');
				});
			}
		});
	}

	var pageBody = document.getElementsByTagName("body")[0];

	// page-id-20 = Contact Us
	if (pageBody.classList.contains("page-id-20") || pageBody.classList.contains("page-id-987")) {

		/*look for any elements with the class "custom-select":*/
		var jetSelectItems = $('#custom-select .jet-select');
		console.log(jetSelectItems);

		if (jetSelectItems) {
			jetSelectItems[1].style.display = 'none';

			createCustomSelectBox(jetSelectItems);

			jetSelectItems[0].getElementsByTagName("select")[0].addEventListener('change', function() {
				// jetSelectItems[1].getElementsByClassName("select-selected", "select-items").remove();
				setTimeout(function() {
					createCustomSelectBox(jetSelectItems, 1);
				}, 1000);
			});

			var eSelectItems = document.getElementsByClassName("elementor-select-wrapper");
			createCustomSelectBox(eSelectItems);

			var valueArray = ['93', '94', '95', '97', '98', '96', '110', '145', '192', '193', '194', '196', '201', '215', '221', '222', '223', '224', '230', '231', '232', '234', '235'];
			document.querySelector(".depth-0").addEventListener('change', function() {
				var style = valueArray.includes(this.value) ? 'none' : 'block';
				jetSelectItems[1].style.display = style;
			});
		}

	}

	function createCustomSelectBox(elmnt, eIndex = false) {
		var i, j, l, ll, selElmnt, a, b, c;

		l = elmnt.length;

		for (i = 0; i < l; i++) {
			if (eIndex && eIndex != i) {
				continue;
			}
			selElmnt = elmnt[i].getElementsByTagName("select")[0];
			ll = selElmnt.length;

			/*for each element, create a new DIV that will act as the selected item:*/
			a = document.createElement("DIV");
			a.setAttribute("class", "select-selected");
			a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
			elmnt[i].appendChild(a);

			if (eIndex && eIndex == 1) {
				a.previousSibling.remove();
				a.previousSibling.remove();
			}

			/*for each element, create a new DIV that will contain the option list:*/
			b = document.createElement("DIV");
			b.setAttribute("class", "select-items select-hide");
			for (j = 1; j < ll; j++) {
				/*for each option in the original select element,
                create a new DIV that will act as an option item:*/
				c = document.createElement("DIV");
				c.innerHTML = selElmnt.options[j].innerHTML;
				c.addEventListener("click", function(e) {
					/*when an item is clicked, update the original select box,
                    and the selected item:*/
					var y, i, k, s, h, sl, yl;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					sl = s.length;
					h = this.parentNode.previousSibling;
					for (i = 0; i < sl; i++) {
						if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							s.dispatchEvent(new Event('change'));
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
							yl = y.length;
							for (k = 0; k < yl; k++) {
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							break;
						}
					}
					h.click();
				});

				b.appendChild(c);
			}
			elmnt[i].appendChild(b);

			a.addEventListener("click", function(e) {
				e.stopPropagation();
				closeAllSelect(this);
				this.nextSibling.classList.toggle("select-hide");
				this.classList.toggle("select-arrow-active");
			});

		}
	}

	function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
        except the current select box:*/
		var x, y, i, xl, yl, zl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		z = document.getElementsByClassName("dd-wrapper");
		xl = x.length;
		yl = y.length;
		zl = z.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i);
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}
	/*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
	document.addEventListener("click", closeAllSelect);

	//Jet Pop Up Disable Scroll Hack

	function disableScroll() {
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		window.onscroll = function() {
			window.scrollTo(scrollLeft, scrollTop);
		}
		
	}
	
	function enableScroll() {
		window.onscroll = function() {}
		
	}
	
	$('.jet-popup-target').click(function() {
		disableScroll();
	});
	
	$('.jet-popup__close-button, .jet-popup__overlay').click(function() {
		enableScroll();
	});
	


});