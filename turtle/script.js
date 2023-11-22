;(function($, window, undefined) {
	'use strict';

	var pluginName = 'eater',
			dataKey = 'plugin_' + pluginName;

	function Plugin(element, options) {
		this.element = $(element);
		this.map;
		this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
		this.foods = [];
		this.init();
	}
	
	function getDistance(a,b){
		// c*c = a*a + b*b
		return Math.sqrt( (a * a) + (b * b) );
	}
	
	function pointDirection(x1, y1, x2, y2) {
		var a = Math.atan2(y2 - x1, x2 - y1);
		a = a*180/Math.PI + 135; //convert to deg
		if(a < 0) a +=360;

		return a;
	}

	Plugin.prototype = {
		init: function() {
			var that = this,
					picker = $(that.options.picker);

			$(that.options.box).click(function(e){
				var posX = $(this).offset().left,
						posY = $(this).offset().top,
						mOffsetX = e.pageX - posX,
						mOffsetY = e.pageY - posY;

				that.renderF( mOffsetX , mOffsetY );

				if( picker.hasClass('onsurf') ){
					return false;
				}

				picker.addClass('onsurf');

				setTimeout(function(){
					that.getF();
				}, 400);

			});

			picker.css({
				'-moz-transition': 'all '+that.options.speed+'ms '+that.options.transition+'',
				'-webkit-transition': 'all '+that.options.speed+'ms '+that.options.transition+'',
				'-o-transition': 'all '+that.options.speed+'ms '+that.options.transition+'',
				'transition': 'all '+that.options.speed+'ms '+that.options.transition+''
			});

			that.moveRandom();

		},

		addF: function( x , y , obj){
			this.foods.push({offsetX: x , offsetY: y, elem: obj});
		},

		renderF: function( x , y ){
			var F = $('<div/>',{
				'class': 'food',
				'style': 'position: absolute; top: '+y+'px; left: '+x+'px;'
			});
			F.appendTo( $('#box') );
			//add to array
			this.addF(x, y, F);
		},

		getF: function(){
			var that = this,
					FirstF = 0,
					picker = $(this.options.picker);

			if( !picker.hasClass('onsurf') ){
				picker.addClass('onsurf');
			}

			//get close food first
			var closestE = this.getCloseF();
			FirstF = ( closestE != 0 ) ? closestE : FirstF;

			if( that.foods[FirstF] != null ){

				var F = that.foods[FirstF];
				that.foods.splice( FirstF , 1 );

				if(that.onSurf( F )){

					setTimeout(function(){
						picker.addClass('eating');
					}, parseInt(that.options.speed) );
					
					setTimeout(function(){
						picker.removeClass('eating');
						F.elem.remove();
						// that.onIncre();

						//callback
						that.getF();
					}, parseInt(that.options.speed)+400 );
				}
			}else{
				picker.removeClass('onsurf');
				that.moveRandom();
				return false;
			}
		},

		getCloseF: function(){
			var that = this,
					picker = $(this.options.picker),
					cT = parseInt( picker.css('top') ),
					cL = parseInt( picker.css('left') );
			var distance = 9999,
					idx = 0;

			for (var i = that.foods.length - 1; i >= 0; i--) {

				var cT2 = that.foods[i].offsetY;
				var cL2 = that.foods[i].offsetX;

				var Ndistance = getDistance( (cL2 - cL) , (cT2 - cT) );

				if(distance > Ndistance){
					idx = i;
					distance = Ndistance;
				}

			}

			return idx;

		},

		moveRandom: function(){
			var that = this,
					picker = $(this.options.picker),
					cH = picker.height(),
					cW = picker.width(),
					cT = picker.css('top'),
					cL = picker.css('left'),
					ranT = (Math.random() - Math.random() ) * 100,
					ranL = (Math.random() - Math.random() ) * 100,
					walkT = parseInt(cT) + ranT,
					walkL = parseInt(cL) + ranL;

			if( picker.hasClass('onsurf') ){
				return false;
			}

			walkT = ( walkT > ($(that.options.box).height() - cH) ) ? $(that.options.box).height() - cH : walkT;
			walkL = ( walkL > ($(that.options.box).width() - cW) ) ? $(that.options.box).width() - cW : walkL;
			walkT = ( walkT < 0 ) ? 0 : walkT;
			walkL = ( walkL < 0 ) ? 0 : walkL;
			
			this.getDir({offsetX: walkL,offsetY: walkT});

			picker.css({
				'top': walkT +'px',
				'left': walkL +'px'
			});

			setTimeout(function(){
				that.moveRandom();
			}, that.options.speed);	

		},

		onIncre: function(){
			var that = this,
					picker = $(this.options.picker),
					cH = picker.height(),
					cW = picker.width();
			picker.css({
				'width': (cW + 0.5) +'px',
				'height': (cH + 0.5) +'px'
			});
		},

		onSurf: function(F){
			var that = this,
					picker = $(this.options.picker),
					cH = picker.height(),
					cW = picker.width();
			
			if( this.getDir(F) ){
				var Y = F.offsetY - (cH / 2),
						X = F.offsetX - (cW / 2);

				setTimeout(function(){
					picker.css({
						'top': Y +'px',
						'left': X +'px'
					});	
				}, 300 );

				return true;	
			}
		},

		getDir: function(F){
			var that = this,
					picker = $(this.options.picker),
					cT = parseInt( picker.css('top') ),
					cL = parseInt( picker.css('left') ),
					mouse_y = F.offsetY,
					mouse_x = F.offsetX,
					cRotate = picker.data('rotate') ? picker.data('rotate') : 0;

			var center_x = cT + (picker.height() /2);
			var center_y = cL + (picker.width() /2);

			var degree = pointDirection( center_x, center_y,mouse_x, mouse_y );

			// stop picker rotate over 180deg
			var roDiff = degree - cRotate;
			if( roDiff > 180 ){
				var x = Math.round(roDiff / 360);
				degree = ( (360 * x) - degree) * -1;
			}
			if( roDiff < -180 && roDiff < 0 ){
				var x = Math.round(-roDiff / 360);
				degree = (360 * x) + degree;
			}

			picker.data('rotate', degree);
			picker.css('-moz-transform', 'rotate('+degree+'deg) translate(50%,50%)');
			picker.css('-webkit-transform', 'rotate('+degree+'deg) translate(50%,50%)');
			picker.css('-o-transform', 'rotate('+degree+'deg) translate(50%,50%)');
			
			return true;
		},

		destroy: function() {
			$.removeData(this.element[0], pluginName);
		}
	};

	$.fn[pluginName] = function (options) {
		var plugin = this.data(dataKey);
		if (plugin instanceof Plugin) {
			if (typeof options !== 'undefined') {
				plugin.init(options);
			}
		} else {
			plugin = new Plugin(this, options);
			this.data(dataKey, plugin);
		}
		return plugin;
	};

	$.fn[pluginName].defaults = {
		picker: '#picker',
		box: '#box',
		speed: '3000',
		transition: 'cubic-bezier(0.49, 0.13, 0.29, 0.9)'
	};

	$(function() {
		$('#picker')[pluginName]();
	});
}(jQuery, window));