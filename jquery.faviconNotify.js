/**
 * jQuery Favicon Notify
 *
 * Updates the favicon to notify the user of changes etc.
 * It does this via canvas: render the icon, add some text, usage:
 *
 * $.faviconNotify({
 *     icon:      '', // Path to the favicon or image
 *     value:     '', // String value to show
 *     position:  '', // 'tl', 'tr', 'bl' or 'br' - defaults to 'br'
 *     glowColor: '', // Defaults to '#FFFFFF'
 *     textColor: ''  // Defaults to '#000000'
 * });
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
	var canvas = $('<canvas />').prop({ width: 16, height: 16 })[0];
	// Our one and only export
	$.faviconNotify = function(opts){
		var ctx = (canvas.getContext ? canvas.getContext('2d') : false);
		if(!ctx){
			return; // jQuery Favicon Notify disabled - browser does not support 2D canvas
		}
		// Override with defaults
		var position  = opts.position  || 'br';
		var glowColor = opts.glowColor || '#FFFFFF';
		var textColor = opts.textColor || '#000000';
		var value     = opts.value;
		// Load the icon, render, then overlay text
		$('<img />')
			.attr('crossOrigin', 'anonymous')
			.attr('src', opts.icon)
			.on('load', function(e){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
				// Do we have a value?
				if(opts.value){
					// Deal with positioning
					var x = (position.indexOf('l') != -1) ? 1 : 15;
					var y = (position.indexOf('t') != -1) ? 1 : 15;
					// Add the text
					ctx.save();
					ctx.font          = '10px Arial, Helvetica, sans-serif';
					ctx.textBaseline  = (position.indexOf('t') != -1) ? 'hanging' : 'alphabetic';
					ctx.textAlign     = (position.indexOf('l') != -1) ? 'left' : 'right';
					ctx.shadowColor   = glowColor;
					ctx.shadowOffsetX = 0;
					ctx.shadowOffsetY = 0;
					ctx.shadowBlur    = 3;
					ctx.lineWidth     = 2;
					ctx.strokeStyle   = glowColor;
					ctx.strokeText(opts.value, x, y, 14);
					ctx.fillStyle     = textColor;
					ctx.fillText(opts.value, x, y, 14);
					ctx.restore();
			}
			// Update the favicon
			$('link[rel$=icon]').remove();
			$('head').append($('<link rel="shortcut icon" type="image/x-icon"/>').attr('href', canvas.toDataURL('image/png')));
		});
	};
})(jQuery);
