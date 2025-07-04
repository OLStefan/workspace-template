const ignore = [
	/:where\(\.css-dev-only-do-not-override-.*\)/,
	/^\.ant/,
	'.data-ant-cssinjs-cache-path',
	'*',
	'html',
	'body',
];
const prefix = ':not(:global(#\\9))';

const plugin = function () {
	return {
		postcssPlugin: 'postcss-plugin-namespace-wrapper',
		AtRule: function (rule) {
			if (!rule.selectors) {
				return rule;
			}

			if (rule.source.input.file.includes('.moudle.')) {
				return rule;
			}

			if (isInKeyframe(rule)) {
				return rule;
			}

			rule.selectors = rule.selectors.map(function (selector) {
				if (classMatchesTest(selector, ignore) || selector.trim().length === 0) {
					return selector;
				}
				if (rule.parent.type !== 'root') {
					return selector;
				}
				return `${prefix} ${selector}`;
			});
			return rule;
		},
	};
};

plugin.postcss = true;
module.exports = plugin;

/**
 * Determine if class passes test
 *
 * @param {string} clss selector
 * @param {string} test reg or string
 * @return {boolean} if class selector
 */
function classMatchesTest(clss, test) {
	if (!test) {
		return false;
	}

	clss = clss.trim();

	if (test instanceof RegExp) {
		return test.exec(clss);
	}

	if (Array.isArray(test)) {
		var tests = test;

		return tests.some(function (testItem) {
			if (testItem instanceof RegExp) {
				return testItem.exec(clss);
			} else {
				return clss === testItem;
			}
		});
	}

	return clss === test;
}

/**
 * Determine if the selector couldn't be added namespace
 *
 * @param {object} rule css rule
 * @return {boolean} if the selector couldn't be added namespace
 */
function isInKeyframe(rule) {
	return rule.parent?.name.indexOf('keyframes') > -1;
}
