var isInFocusOrder = axe.commons.dom.isFocusable(node) && node.tabIndex !== -1;
var isNativelyFocusable = axe.commons.dom.isNativelyFocusable(node);
var insertedIntoFocusOrder = isInFocusOrder && !isNativelyFocusable;
return insertedIntoFocusOrder && node.getAttribute('role') === null;
