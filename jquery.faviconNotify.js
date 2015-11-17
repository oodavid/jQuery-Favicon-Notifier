/**
 * jQuery Favicon Notify
 *
 * Updates the favicon to notify the user of changes. In the original tests I
 * had an embedded font collection to allow any charachers - I decided that the
 * ~130Kb and added complexity was overkill. As such it now uses a manual glyph
 * set meaning that only numerical notifications are possible.
 *
 * Dual licensed under the MIT and GPL licenses:
 *
 *		http://www.opensource.org/licenses/mit-license.php
 *		http://www.gnu.org/licenses/gpl.html
 *
 * @author		David King
 * @copyright	Copyright (c) 2011 +
 * @url			oodavid.com
 */
(function($){
	// Create the canvas and set the defaults
	var canvas = $('<canvas />').prop({ width: 16, height: 16 })[0],
	    bg     = '#FFFFFF',
	    fg     = '#000000',
	    pos    = 'br';
	// Our one and only export
	$.faviconNotify = function(icon, num, myPos, myBg, myFg){
		var ctx = (canvas.getContext ? canvas.getContext('2d') : false);
		if(!ctx){
			console.warn('jQuery Favicon Notify disabled - browser does not support 2D canvas'); return;
		}
		// Override the defaults
		pos = myPos || pos;
		fg  = myFg  || fg;
		bg  = myBg  || bg;
		// Load the icon, render, than add text
		$('<img />').load(function(e){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
			// Do we have a value?
			if(num !== undefined){
				num = parseFloat(num, 10);
				num = num > 99 ? '99+' : num;
				// Deal with positioning
				var x = (pos.indexOf('l') != -1) ? 1 : 15;
				var y = (pos.indexOf('t') != -1) ? 1 : 15;
				// Add the text
				ctx.font          = '10px Arial, Helvetica, sans-serif';
				ctx.textBaseline  = (pos.indexOf('t') != -1) ? 'hanging' : 'alphabetic';
				ctx.textAlign     = (pos.indexOf('l') != -1) ? 'left' : 'right';
				ctx.shadowColor   = bg;
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = 0;
				ctx.shadowBlur    = 3;
				ctx.lineWidth     = 2;
				ctx.strokeStyle   = bg;
				ctx.strokeText(num, x, y, 14);
				ctx.fillStyle     = fg;
				ctx.fillText(num, x, y, 14);
			}
			// Update the favicon
			$('link[rel$=icon]').remove();
			$('head').append($('<link rel="shortcut icon" type="image/x-icon"/>').attr('href', canvas.toDataURL('image/png')));
		}).attr('src', icon);
	};
})(jQuery);
