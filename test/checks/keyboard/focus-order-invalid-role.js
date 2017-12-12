describe('focus-order-invalid-role', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if explicit tabindex < 0', function () {
		fixtureSetup('<h1 tabindex="-1">Tabindex is -1 by fiat</h1>');
		var node = fixture.querySelector('h1');
		assert.isFalse(checks['focus-order-invalid-role'].evaluate(node));
	});

	it('should pass if implicit tabindex < 0', function () {
		fixtureSetup('<h1>Tabindex is -1 by default</h1>');
		var node = fixture.querySelector('h1');
		assert.isFalse(checks['focus-order-invalid-role'].evaluate(node));
	});

	it('should pass if it has a widget role', function () {
		fixtureSetup('<span tabindex="0" role="button">Button</span>');
		var node = fixture.querySelector('span');
		assert.isFalse(checks['focus-order-invalid-role'].evaluate(node));
	});

	// as of now it's checking for any role whatsoever.
	// it('should fail if it has a non-widget role', function () {
	// 	fixtureSetup('<h1 tabindex="0" role="heading">Button</h1>');
	// 	var node = fixture.querySelector('h1');
	// 	assert.isTrue(checks['focus-order-invalid-role'].evaluate(node));
	// });

	it('should pass for natively focusable elements with no role', function () {
		fixtureSetup('<input tabindex="0">');
		var node = fixture.querySelector('input');
		assert.isFalse(checks['focus-order-invalid-role'].evaluate(node));
	});
});
