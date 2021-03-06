/*global helpers */
axe.addReporter('no-passes', function (results, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	// limit result processing to types we want to include in the output
	options.resultTypes = ['violations'];

	var out = helpers.processAggregate(results, options);

	callback({
		violations: out.violations,
		timestamp: out.timestamp,
		url: out.url
	});

});
