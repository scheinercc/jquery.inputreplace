(function(window, $) {

	"use strict"; // jshint

	/**
	* inputReplacement:
	* replace supported elements with span tags in order to style them easier
	* supported input types 'checkbox', 'radio'
	*
	***
	* options:
	*
	* 'replaceAll'
	*	true (default): replaces all supported elements within a jQuery obj
	*	false: replaces all elements with the selector specified by 'selector' within a jQuery obj
	*
	* 'selector'
	* 	'.js-input-replace' (default): used if 'replaceAll' is set to 'false'
	*
	* 'hasIcon'
	* 	true (default): adds a class to use with icon font; format: icon-[input type]
	* 	false: does nothing
	*
	* 'onReplaceFinished'
	* 	callback function
	*
	***
	* data options:
	*
	* 'data-icon-class'
	*	set the data attribute to manually set a specific class name
	*
	***
	* sets following class names:
	*
	* 'checked' for active input element
	* 'checkbox', 'radio' accordant to the element type of the original input element
	* 'icon-checkbox', 'icon-radio' see 'hasIcon' above
	*
	***
	* 'best practice examples'
	*
	* example for checkboxes:
	*
	* <label for="checkboxId">
	* 	<input type="checkbox" class="js-input-replace" id="checkboxId">
	* 	label content
	* </label>
	*
	* example for radio buttons:
	*
	* <label for="radioId-1">
	* 	<input type="radio" name="same-same-but-different" class="js-input-replace" id="radioId-1">
	* 	label content
	* </label>
	* <label for="radioId-2">
	* 	<input type="radio" name="same-same-but-different" class="js-input-replace" id="radioId-2">
	* 	label content
	* </label>
	*/

	$.fn.replaceInput = function( options ) {

		var opts = $.extend( {}, $.fn.replaceInput.defaults, options ),
			$inputRplc, inputTypes = ['checkbox', 'radio'];

		// store all supported input types or elements with the explicite selector
		$inputRplc = opts.replaceAll ?
			$(this).find( createDefaultSelector( inputTypes ).toString()) :
			$(this).find( opts.selector );

		$inputRplc.each( function() {

			var $this = $(this),
				thisType, thisFake, thisIcon, $thisFake, iconClass;

			thisType = $this.attr('type');

			// check if the user has set a specific icon class
			iconClass = $this.data('icon-class');

			if ( $.inArray(thisType, inputTypes) === -1 ) {
				if ( window.console ) {
					return console.info( '[replaceInput] id: "' + $this.attr('id') + '"; unsupported input type: "' + thisType + '"; should be one of ' + createDefaultSelector( inputTypes ).toString());
				}
			}

			// check if we are using an icon font and create the class
			// possible class names: 'icon-checkbox', 'icon-radio' or set in HTML via data-icon-class
			thisIcon = opts.hasIcon ? ' ' + iconClass || ' icon-' + thisType : '';

			// create the element for the fake input
			thisFake = '<span class="' + thisType + thisIcon + '" tabindex="0"></span>';

			// hide the actual radio button
			// insert the fake 'span' element right after
			$this
				// IEs < 9 don't trigger the click on the 'label' if the input gets set to 'display: none'
				// moving elements off screen instead of using 'hide()'
				.css({
					position: 'absolute',
					top: '-9999px'
				})
				.after( thisFake );

			// create a jQuery obj from the new DOM elem
			$thisFake = $this.next( '.' + thisType );

			// if input is initially checked
			if ( $this.is('[checked]') ) {

				// check the fake element
				$thisFake.addClass('checked');
			}

			// add event listeners
			events( $thisFake );
		});

		function createDefaultSelector( arrDefaultElems ) {

			var arrDefaultSelectors = [],
				i, arrElems;

			for ( i = 0, arrElems = arrDefaultElems.length; i < arrElems; i++ ) {

				// create jQuery 'type' selectors
				arrDefaultSelectors.push('[type=' + arrDefaultElems[i] + ']');
			}

			return arrDefaultSelectors;
		}

		// attach events to input elements
		function events( $elem ) {

			var $this = $elem,

				// we know where the input is
				// as we just append the new span elem right behind it
				$input = $this.prev('input'),

				// find the corresponding label
				$inputId = $input.attr('id'),
				$label = $('label[for="' + $inputId + '"]');

			// add click handler to label if we find one
			if ( $label.length ) {

				$input
					.on( 'click', function( evt ) {
						changeState( $this, $input );
						evt.stopPropagation();
						evt.preventDefault();
					});
			}

			// add click & keyboard input handler
			$this.on({

				click: function( evt ) {
					changeState( $this, $input );
					evt.stopPropagation();
					evt.preventDefault();
				},

				keydown: function( evt ) {

					// checks for 'spacebar' or 'enter' input
					if ( evt.which == 32 || evt.which == 13 ) {
						changeState( $this, $input );
					}
				}
			});
		}

		// toggle input element(s)
		function changeState( $fakeElem, $input ) {

			var isChecked = $fakeElem.hasClass('checked'),
				inputType = $input.attr('type'),
				inputName = $input.attr('name');

			if ( isChecked ) {

				// only the checkbox element toggles
				// do nothing if a checked radio button gets clicked
				if ( inputType === 'checkbox' ) {

					$input.removeAttr('checked');
					$fakeElem.removeClass('checked');
				}
			}

			//add tick
			else {

				// if we have a radio button, uncheck first all others
				if ( inputType === 'radio' ) {
					$('[name=' + inputName + ']').each( function() {
						$(this)
							.removeAttr('checked')
							.next('.radio')
							.removeClass('checked');
					});
				}

				// check button
				$input.attr('checked', true);
				$fakeElem.addClass('checked');
			}
		}

		opts.complete.call( this );

		// ensure method calls can be chained
		// http://www.sitepoint.com/10-tips-better-jquery-plugins/
		return this;
	};

	// Plugin defaults – added as a property on the plugin function.
	$.fn.replaceInput.defaults = {
		replaceAll: true,
		selector: '.js-input-replace',
		hasIcon: true,
		complete: function() {}
	};

}( window, window.jQuery ));