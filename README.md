jquery.inputreplace
===================

replace supported elements with span tags in order to style them easier

supported input types 'checkbox', 'radio'

### options

*	'replaceAll'
	true (default): replaces all supported elements within a jQuery obj
	false: replaces all elements with the selector specified by 'selector' within a jQuery obj

*	'selector'
	'.js-input-replace' (default): used if 'replaceAll' is set to 'false'

*	'hasIcon'
	true (default): adds a class to use with icon font; format: icon-[input type]
	false: does nothing

*	'onReplaceFinished'
	callback function

### data options

*	'data-icon-class'
	set the data attribute to manually set a specific class name

### sets following class names

*	'checked' for active input element
	'checkbox', 'radio' accordant to the element type of the original input element
	'icon-checkbox', 'icon-radio' see 'hasIcon' above
