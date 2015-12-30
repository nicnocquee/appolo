/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	var bodyEl = document.body,
		docElem = window.document.documentElement,
		support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		// window sizes
		win = {width: window.innerWidth, height: window.innerHeight},
		// some helper vars to disallow scrolling
		lockScroll = false, xscroll, yscroll,
		scrollContainer = document.querySelector('.container'),
		// the main slider and its items
		sliderEl = document.querySelector('.slider');
		var qs = (function(a) {
		    if (a == "") return {};
		    var b = {};
		    for (var i = 0; i < a.length; ++i)
		    {
		        var p=a[i].split('=', 2);
		        if (p.length == 1)
		            b[p[0]] = "";
		        else
		            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		    }
		    return b;
		})(window.location.search.substr(1).split('&'));
		var items;
		var itemsTotal;
		var navRightCtrl;
		var navLeftCtrl;
		var zoomCtrl;
		if (sliderEl) {
			items = [].slice.call(sliderEl.querySelectorAll('.slide'));
			itemsTotal = items.length;
			navRightCtrl = sliderEl.querySelector('.button--nav-next');
			navLeftCtrl = sliderEl.querySelector('.button--nav-prev');
			zoomCtrl = sliderEl.querySelector('.button--zoom');
		}


		// the main content element
		var contentEl = document.querySelector('.content'),
		// close content control
		closeContentCtrl = contentEl.querySelector('button.button--close'),
		// index of current item
		current = 0,
		// check if an item is "open"
		isOpen = false,
		isFirefox = typeof InstallTrigger !== 'undefined',
		// scale body when zooming into the items, if not Firefox (the performance in Firefox is not very good)
		bodyScale = isFirefox ? false : 3,

		infoButton = document.querySelector('.bp-icon-about'),
		hoverInfo = document.querySelector('#site-info-button'),
		siteInfo = document.querySelector('#site-info'),
		hoverInfoText = (hoverInfo)? hoverInfo.getAttribute('data-content') : null,
		hireMeButton = document.querySelector("#hire_me_button"),
		initialHireMeButtonClass = (hireMeButton) ? hireMeButton.className : null,
		profileSection = document.querySelector(".profile"),
		profileCard = document.querySelector("#profile_card"),
		profileCardParent = document.querySelector('#profile_card_parent'),
		isShowingProfile = false,
		initialProfileCardClass = (profileCard)? profileCard.className : null,
		mainSlider = document.querySelector("#main_slider");

		var hammertime = new Hammer(scrollContainer);
		hammertime.on('swipe', function(ev) {
			if (!isOpen && !isShowingProfile) {
				if (ev.direction == Hammer.DIRECTION_RIGHT) {
					navigate('left');
				} else {
					navigate('right');
				}
			}
		});
		hammertime.get('pinch').set({ enable: false });
		hammertime.get('rotate').set({ enable: false });
		hammertime.get('tap').set({ enable: false });
		hammertime.get('doubletap').set({ enable: false });
		hammertime.get('press').set({ enable: false });
		hammertime.get('pan').set({ enable: false });

	// some helper functions:
	function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
	function scrollY() { return window.pageYOffset || docElem.scrollTop; }
	// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
	function throttle(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	}

	function init() {
		initEvents();

		if (isOpen) {
			closeContent();
		}
	}

	// event binding
	function initEvents() {

		var hash = getHashValue('#');
		if (hash > 0) {
			items.forEach(function(item) { classie.remove(item, 'slide--current'); });
			classie.add(items[hash], 'slide--current');
			current = parseInt(hash);
		} else {
			if (items) {
				classie.add(items[0], 'slide--current');
			}
		}

		if (infoButton && isMobile()) {
			infoButton.addEventListener('click', function() {
				if (siteInfo.style.display == 'block') {siteInfo.style.display = 'none';}
				else {siteInfo.style.display = 'block';}
			});
		}

		if (hireMeButton) {
			profileCardParent.addEventListener('animationend', function() {
				classie.remove(profileCardParent, 'animated');
				if (isShowingProfile) {
					classie.remove(profileCardParent, 'bounceIn');
					profileCard.style.visibility = 'visible';
					profileCard.style.zIndex = 1000;
					var closeProfileButton = document.querySelector('#close_profile');
					closeProfileButton.style.visibility = 'visible';
					profileSection.style.zIndex = 1000;
					profileSection.style.visibility = 'visible';
				} else {
					classie.remove(profileCardParent, 'bounceOutUp');
					profileCard.style.visibility = 'hidden';
					profileCard.style.zIndex = 0;
					mainSlider.style.opacity = 1;
					var closeProfileButton = document.querySelector('#close_profile');
					closeProfileButton.style.visibility = 'hidden';
					profileCardParent.style.visibility = 'hidden';
					profileCardParent.style.zIndex = 0;
					profileSection.style.zIndex = 0;
					profileSection.style.visibility = 'hidden';
				}
			});

			hireMeButton.addEventListener('click', function(){
				if (!isShowingProfile) {
					isShowingProfile = true;
					profileCardParent.style.visibility = 'visible';
					profileCard.style.visibility = 'visible';
					profileCard.style.zIndex = 1000;
					profileCardParent.style.zIndex = 1000;
					profileSection.style.zIndex = 1000;
					profileSection.style.visibility = 'visible';

					classie.add(profileCardParent, 'animated');
					classie.add(profileCardParent, 'bounceIn');
					mainSlider.style.opacity = 0.1;
				} else {
					closeProfileCard();
				}
			});

			profileSection.addEventListener('click', function() {
				if (isShowingProfile) {
					closeProfileCard();
				}
			});
		}

		// open items
		if (zoomCtrl) {
			zoomCtrl.addEventListener('click', function() {
				openItem(items[current]);
			});

			if (items) {
				items.forEach(function(item, pos) {
					var callback = function() {
						openItem(items[current]);
					};
					var zoomerImage = item.querySelector('.zoomer__image');
					var previewImage = item.querySelector('.preview');
					var sliderTitle = item.querySelector('.slide__title');
					zoomerImage.addEventListener('click',callback );
					previewImage.addEventListener('click',callback );
					sliderTitle.addEventListener('click',callback );
				});
			}
		}

		if (closeContentCtrl) {
		// close content
			closeContentCtrl.addEventListener('click', closeContent);
		}

		if (navRightCtrl) {
			navRightCtrl.addEventListener('click', function() { navigate('right'); });
		}
		if (navLeftCtrl) {
			navLeftCtrl.addEventListener('click', function() { navigate('left'); });
		}



		// window resize
		window.addEventListener('resize', throttle(function(ev) {
			// reset window sizes
			win = {width: window.innerWidth, height: window.innerHeight};

			// reset transforms for the items (slider items)
			if (items) {
				items.forEach(function(item, pos) {
					if( pos === current ) return;
					var el = item.querySelector('.slide__mover');
					dynamics.css(el, { translateX: el.offsetWidth });
				});
			}

		}, 10));

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if( isOpen ) return;
			var keyCode = ev.keyCode || ev.which;
			switch (keyCode) {
				case 37:
					navigate('left');
					break;
				case 39:
					navigate('right');
					break;
			}
		} );
	}

	function closeProfileCard () {
		isShowingProfile = false;
		classie.add(profileCardParent, 'animated');
		classie.add(profileCardParent, 'bounceOutUp');
	}

	// opens one item
	function openItem(item) {
		if( isOpen ) return;
		if (isShowingProfile) return;

		var permalink = item.getAttribute('data-content');
		if (permalink.indexOf('http') == 0) {
			window.open(permalink, '_blank');
			return;
		}

		isOpen = true;

		// the element that will be transformed
		var zoomer = item.querySelector('.zoomer');
		// slide screen preview
		classie.add(zoomer, 'zoomer--active');
		// disallow scroll
		scrollContainer.addEventListener('scroll', noscroll);

		// apply transforms
		applyTransforms(zoomer);
		// also scale the body so it looks the camera moves to the item.
		if( bodyScale ) {
			dynamics.animate(bodyEl, { scale: bodyScale, opacity: 0 }, { type: dynamics.easeInOut, duration: 500 });
		} else if (isFirefox) {
			dynamics.animate(bodyEl, { opacity: 0 }, { type: dynamics.easeInOut, duration: 500 });
		}
		// after the transition is finished:
		onEndTransition(zoomer, function() {
			if (isSafari()) {
				profileSection.style.display = 'none';
				setTimeout(function() {
					if( bodyScale ) {
						dynamics.stop(bodyEl);
						dynamics.css(bodyEl, { scale: 1, opacity: 1 });

						// fix for safari (allowing fixed children to keep position)
						bodyEl.style.WebkitTransform = '';
						bodyEl.style.transform = '';
					}
					scrollContainer.removeEventListener('scroll', noscroll);
					classie.remove(zoomer, 'zoomer--notrans');
					classie.remove(zoomer, 'zoomer--active');
					zoomer.style.WebkitTransform = 'none';
					zoomer.style.transform = 'none';
					profileSection.style.display = 'flex';
				}, 25);
			}


			isOpen = false;

			window.location = '/'+item.getAttribute('data-content')+'?fr='+current;

			return;
		});
	}

	// closes the item/content
	function closeContent() {
		var contentItem = contentEl.querySelector('.content__item--current');

		var appIcon = document.querySelector('#app-icon');
		if (appIcon) {
			classie.remove(appIcon, 'animated');
			classie.remove(appIcon, 'bounceInDown');
		}

		classie.remove(contentEl, 'content--open');
		classie.remove(contentItem, 'content__item--current');
		classie.remove(bodyEl, 'noscroll');

		if( bodyScale ) {
			// reset fix for safari (allowing fixed children to keep position)
			bodyEl.style.WebkitTransform = '';
			bodyEl.style.transform = '';
		}

		/* fix for safari flickering */
		var nobodyscale = true;
		/* fix for safari flickering */

		// wait for the inner content to finish the transition
		onEndTransition(contentItem, function(ev) {
			// reset scrolling permission
			lockScroll = false;
			scrollContainer.removeEventListener('scroll', noscroll);

			if (qs["fr"] > 0) {
				window.history.back();
			} else {
				window.location = '/';
			}
		});
	}

	function isSafari () {
		var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS');
	    return isSafari;
	}

	function isMobile () {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

	// applies the necessary transform value to scale the item up
	function applyTransforms(el, nobodyscale) {
		// zoomer area and scale value
		var zoomerArea = el.querySelector('.zoomer__area'),
			zoomerAreaSize = {width: zoomerArea.offsetWidth, height: zoomerArea.offsetHeight},
			zoomerOffset = zoomerArea.getBoundingClientRect(),
			scaleVal = zoomerAreaSize.width/zoomerAreaSize.height < win.width/win.height ? win.width/zoomerAreaSize.width : win.height/zoomerAreaSize.height;

		if( bodyScale && !nobodyscale ) {
			scaleVal /= bodyScale;
		}

		// apply transform
		var trans = 'scale3d(' + scaleVal + ',' + scaleVal + ',1)';
		el.style.WebkitTransform = trans;
		el.style.transform = trans;
	}

	// navigate the slider
	function navigate(dir) {
		if (isShowingProfile) return;
		var itemCurrent = items[current],
			currentEl = itemCurrent.querySelector('.slide__mover'),
			currentTitleEl = itemCurrent.querySelector('.slide__title');
		// update new current value
		if( dir === 'right' ) {
			current = current < itemsTotal-1 ? current + 1 : 0;
		}
		else {
			current = current > 0 ? current - 1 : itemsTotal-1;
		}

		var itemNext = items[current],
			nextEl = itemNext.querySelector('.slide__mover'),
			nextTitleEl = itemNext.querySelector('.slide__title');

		// animate the current element out
		dynamics.animate(currentEl, { opacity: 0, translateX: dir === 'right' ? -1*currentEl.offsetWidth/2 : currentEl.offsetWidth/2, rotateZ: dir === 'right' ? -10 : 10 }, {
			type: dynamics.spring,
			duration: 3000,
			friction: 600,
			complete: function() {
				dynamics.css(itemCurrent, { opacity: 0, visibility: 'hidden' });
			}
		});

		// animate the current title out
		dynamics.animate(currentTitleEl, { translateX: dir === 'right' ? -250 : 250, opacity: 0 }, {
			type: dynamics.bezier,
			points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
			duration: 450
		});

		// set the right properties for the next element to come in
		dynamics.css(itemNext, { opacity: 1, visibility: 'visible' });
		dynamics.css(nextEl, { opacity: 0, translateX: dir === 'right' ? nextEl.offsetWidth/2 : -1*nextEl.offsetWidth/2, rotateZ: dir === 'right' ? 10 : -10 });

		// animate the next element in
		dynamics.animate(nextEl, { opacity: 1, translateX: 0 }, {
			type: dynamics.spring,
			duration: 3000,
			friction: 600,
			complete: function() {
				items.forEach(function(item) { classie.remove(item, 'slide--current'); });
				classie.add(itemNext, 'slide--current');
			}
		});

		// set the right properties for the next title to come in
		dynamics.css(nextTitleEl, { translateX: dir === 'right' ? 250 : -250, opacity: 0 });
		// animate the next title in
		dynamics.animate(nextTitleEl, { translateX: 0, opacity: 1 }, {
			type: dynamics.bezier,
			points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
			duration: 650
		});

		if (current > 0) {
			window.history.replaceState(null, '', '#'+current);
		} else {
			window.history.replaceState(null, '', '/');
		}

		if (current % 2 == 0) {
			hireMeButton.className = hireMeButton.className + " animated rubberBand";
		} else {
			hireMeButton.className = initialHireMeButtonClass;
		}
	}

	function getHashValue(key) {
	  var matches = window.location.hash.match(new RegExp(key+'([^&]*)'));
	  return matches ? matches[1] : null;
	}

	// disallow scrolling (on the scrollContainer)
	function noscroll() {
		if(!lockScroll) {
			lockScroll = true;
			xscroll = scrollContainer.scrollLeft;
			yscroll = scrollContainer.scrollTop;
		}
		scrollContainer.scrollTop = yscroll;
		scrollContainer.scrollLeft = xscroll;
	}

	init();

})(window);
