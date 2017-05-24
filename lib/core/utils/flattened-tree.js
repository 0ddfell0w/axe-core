/* global console */
var axe = axe || { utils: {} };
/**
 * NOTE: level only increases on "real" nodes because others do not exist in the flattened tree
 */
axe.utils.printFlattenedTree = function (node, level) {
	var indent = '  '.repeat(level) + '\u2514> ';
	var nodeName;
	if (node.shadowRoot) {
		node.shadowRoot.childNodes.forEach(function (child) {
			axe.utils.printFlattenedTree(child, level);
		});
	} else {
		nodeName = node.nodeName.toLowerCase();
		if (['style', 'template', 'script'].indexOf(nodeName) !== -1) {
			return;
		}
		if (nodeName === 'content') {
			node.getDistributedNodes().forEach(function (child) {
				axe.utils.printFlattenedTree(child, level);
			});
		} else if (nodeName === 'slot') {
			node.assignedNodes().forEach(function (child) {
				axe.utils.printFlattenedTree(child, level);
			});
		} else {
			if (node.nodeType === 1) {
				console.log(indent, node);
				node.childNodes.forEach(function (child) {
					axe.utils.printFlattenedTree(child, level + 1);
				});
			}
		}
	}
};

function virtualDOMfromNode (node, shadowId) {
	// todo: attributes'n shit (maybe)
	return {
		shadowId: shadowId,
		children: [],
		actualNode: node
	};
}

function getSlotChildren(node) {
	var retVal = [];

	node = node.firstChild;
	while (node) {
		retVal.push(node);
		node = node.nextSibling;
	}
	return retVal;
}

/**
 * recursvely returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and of course the shadow DOM nodes
 * <content> and <slot>
 *
 * @param {Node} node the current node
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow
 *                           ancestor of the node
 */

axe.utils.getFlattenedTree = function (node, shadowId) {
	// using a closure here and therefore cannot easily refactor toreduce the statements
	//jshint maxstatements: false
	var retVal, realArray, nodeName;
	function reduceShadowDOM (res, child) {
		var replacements = axe.utils.getFlattenedTree(child, shadowId);
		if (replacements) {
			res = res.concat(replacements);
		}
		return res;
	}

	if (node.documentElement) { // document
		node = node.documentElement;
	}
	nodeName = node.nodeName.toLowerCase();
	// for some reason Chrome's marquee element has an open shadow DOM
	if (node.shadowRoot && nodeName !== 'marquee') {
		// generate an ID for this shadow root and overwrite the current
		// closure shadowId with this value so that it cascades down the tree
		shadowId = 'a' + Math.random().toString().substring(2);
		realArray = Array.from(node.shadowRoot.childNodes);
		return realArray.reduce(reduceShadowDOM, []);
	} else {
		if (nodeName === 'content') {
			realArray = Array.from(node.getDistributedNodes());
			return realArray.reduce(reduceShadowDOM, []);
		} else if (nodeName === 'slot') {
			realArray = Array.from(node.assignedNodes());
			if (!realArray.length) {
				// fallback content
				realArray = getSlotChildren(node);
			}
			return realArray.reduce(reduceShadowDOM, []);
		} else {
			if (node.nodeType === 1) {
				retVal = virtualDOMfromNode(node, shadowId);
				realArray = Array.from(node.childNodes);
				retVal.children = realArray.reduce(reduceShadowDOM, []);
				return [retVal];
			} else if (node.nodeType === 3) {
				// text
				return [virtualDOMfromNode(node)];
			}
			return undefined;
		}
	}
};