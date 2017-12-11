describe('focusable-no-role', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	// var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if explicit tabindex < 0', function () {
		fixtureSetup('<span tabindex="-1"></span>');
		var node = fixture.querySelector('span');
		assert.isFalse(checks['focusable-no-role'].evaluate(node));
	});

	it('should pass if it has a widget role', function () {
		fixtureSetup('<span role="button">Button</span>');
		var node = fixture.querySelector('span');
		assert.isFalse(checks['focusable-no-role'].evaluate(node));
	});

	// it('should pass if element is not natively focusable', function () {
	// 	fixtureSetup('<span>Some text</span>');
	// 	var node = fixture.querySelector('span');
	// 	assert.isFalse(checks['focusable-no-role'].evaluate(node));
	// });

	// it('should fail if element is tabbable with no role', function () {
	// 	fixtureSetup('<a href="#"></a>');
	// 	var node = fixture.querySelector('a');
	// 	assert.isTrue(checks['focusable-no-role'].evaluate(node));
	// });

	// it('should fail if element is tabable with no name - ARIA', function () {
	// 	fixtureSetup('<span tabindex="0" role="link" href="#"></spam>');
	// 	var node = fixture.querySelector('span');
	// 	assert.isTrue(checks['focusable-no-role'].evaluate(node));
	// });

	// it('should pass if the element is tabable but has an accessible name', function () {
	// 	fixtureSetup('<a href="#" title="Hello"></a>');
	// 	var node = fixture.querySelector('a');
	// 	assert.isFalse(checks['focusable-no-role'].evaluate(node));
	// });

	// (shadowSupport.v1 ? it : xit)('should pass if the content is passed in with shadow DOM', function () {
	// 	var node = document.createElement('div');
	// 	node.innerText = 'Content!';
	// 	var shadow = node.attachShadow({ mode: 'open' });
	// 	shadow.innerHTML = '<span tabindex="-1"></span>';
	// 	// shadow.innerHTML = '<a href="#"><slot></slot></a>';
	// 	fixtureSetup(node);

	// 	var span = shadow.querySelector('span');
	// 	assert.isFalse(checks['focusable-no-role'].evaluate(span));
	// });

});
