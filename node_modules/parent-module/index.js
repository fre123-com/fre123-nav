'use strict';
const callsites = require('callsites');

module.exports = filePath => {
	const stacks = callsites();

	if (!filePath) {
		return stacks[2].getFileName();
	}

	let hasSeenValue = false;

	// Skip the first stack as it's this function
	stacks.shift();

	for (const stack of stacks) {
		const parentFilePath = stack.getFileName();

		if (typeof parentFilePath !== 'string') {
			continue;
		}

		if (parentFilePath === filePath) {
			hasSeenValue = true;
			continue;
		}

		// Skip native modules
		if (parentFilePath === 'module.js') {
			continue;
		}

		if (hasSeenValue && parentFilePath !== filePath) {
			return parentFilePath;
		}
	}
};
