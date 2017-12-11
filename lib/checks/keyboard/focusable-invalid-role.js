var focusableRoleBlacklist = {
	: true,
}

// var tabIndex = node.tabIndex;
var role = node.getAttribute('role');
if (role && axe.commons.text.getRoleType(role) === 'widget') {
	return false; // no violation
}
// else if (tabIndex === -1) {
// 	return false; // no violation if tabindex is -1
// }
return true;
