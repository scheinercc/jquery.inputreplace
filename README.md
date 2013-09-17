jquery.inputreplace
===================

replace supported elements with span tags in order to style them easier

supported input types 'checkbox', 'radio'

## options

*	'replaceAll'<br/>
	true (default): replaces all supported elements within a jQuery obj<br/>
	false: replaces all elements with the selector specified by 'selector' within a jQuery obj

*	'selector'<br/>
	'.js-input-replace' (default): used if 'replaceAll' is set to 'false'

*	'hasIcon'<br/>
	true (default): adds a class to use with icon font; format: icon-[input type]<br/>
	false: does nothing

*	'complete'<br/>
	callback function

## data options

*	'data-icon-class'<br/>
	set the data attribute to manually set a specific class name

## sets following class names

*	'checked' for active input element<br/>
	'checkbox', 'radio' accordant to the element type of the original input element<br/>
	'icon-checkbox', 'icon-radio' see 'hasIcon' above

## usage

basic:

```js
	jQuery.inputreplace();
```

extended:

```js
	jQuery.inputreplace({
		replaceAll: false,
		selector: '.my-preferred-selector',
		hasIcon: false,
		complete: function() {
			// stuff to run
		}
	});
```
