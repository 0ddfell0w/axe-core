var inFocusOrder = axe.commons.dom.isFocusable(node) && node.tabIndex > -1;
var hasRole = node.getAttribute('role') !== null;
return inFocusOrder && !hasRole;
