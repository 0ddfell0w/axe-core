describe('focusable-invalid-role', function () {
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
		assert.isFalse(checks['focusable-invalid-role'].evaluate(node));
	});

	it('should pass if it has a widget role', function () {
		fixtureSetup('<span role="button">Button</span>');
		var node = fixture.querySelector('span');
		assert.isFalse(checks['focusable-invalid-role'].evaluate(node));
	});

});
