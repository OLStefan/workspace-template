import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import checkFilePlugin from 'eslint-plugin-check-file';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import reactPlugin from 'react';

const generalRules = {
	// Overwriten by typescript-eslint rules
	'default-param-last': 'off',
	'consistent-return': 'off',
	'max-params': 'off',
	'no-magic-numbers': 'off',
	'no-loop-func': 'off',
	'no-return-await': 'off',
	'no-shadow': 'off',
	'no-throw-literal': 'off',
	'no-unused-expressions': 'off',
	'prefer-destructuring': 'off',
	'prefer-promise-reject-errors': 'off',

	'@typescript-eslint/consistent-return': 'error',
	'@typescript-eslint/consistent-type-exports': 'error',
	'@typescript-eslint/consistent-type-imports': 'error',
	'@typescript-eslint/default-param-last': 'error',
	'@typescript-eslint/explicit-module-boundary-types': 'warn',
	'@typescript-eslint/max-params': 'error',
	'@typescript-eslint/method-signature-style': 'error',
	'@typescript-eslint/no-confusing-void-expression': 'error',
	'@typescript-eslint/no-invalid-void-type': 'error',
	'@typescript-eslint/no-loop-func': 'error',
	'@typescript-eslint/no-magic-numbers': [
		'error',
		{
			ignore: [10, 60, 1000], // Ignore values for common conversions
			enforceConst: true,
			ignoreEnums: true,
			ignoreNumericLiteralTypes: true,
			ignoreTypeIndexes: true,
		},
	],
	'@typescript-eslint/no-mixed-enums': 'error',
	'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
	'@typescript-eslint/no-require-imports': 'error',
	'@typescript-eslint/no-shadow': 'warn',
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
	'@typescript-eslint/no-unnecessary-condition': 'warn',
	'@typescript-eslint/no-useless-template-literals': 'error',
	'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
	'@typescript-eslint/no-unsafe-unary-minus': 'error',
	'@typescript-eslint/no-unused-expressions': 'error',
	'@typescript-eslint/only-throw-error': 'error',
	'@typescript-eslint/prefer-destructuring': 'error',
	'@typescript-eslint/prefer-enum-initializers': 'error',
	'@typescript-eslint/prefer-find': 'warn',
	'@typescript-eslint/prefer-includes': 'error',
	'@typescript-eslint/prefer-literal-enum-member': 'error',
	'@typescript-eslint/prefer-promise-reject-errors': 'error',
	// Unfortunately Propblems with ReactNode
	// "@typescript-eslint/prefer-readonly-parameter-types": [
	// 	"error",
	// 	{
	// 		"ignoreInferredTypes": true,
	// 		"treatMethodsAsReadonly": true,
	// 		"allow": [
	// 			{ "from": "package", "name": "ReactNode", "package": "react" }
	// 		]
	// 	}
	// ],
	'@typescript-eslint/prefer-reduce-type-parameter': 'warn',
	'@typescript-eslint/prefer-regexp-exec': 'warn',
	'@typescript-eslint/promise-function-async': 'warn',
	'@typescript-eslint/restrict-plus-operands': 'error',
	'@typescript-eslint/sort-type-constituents': 'warn',
	'@typescript-eslint/strict-boolean-expressions': 'warn',
	'@typescript-eslint/switch-exhaustiveness-check': 'error',
	'@typescript-eslint/return-await': 'error',

	'check-file/folder-naming-convention': [
		'error',
		{ 'src/**/': 'NEXT_JS_APP_ROUTER_CASE' },
	],
	'check-file/filename-naming-convention': [
		'error',
		{
			'src/**/!({page,layout,template}).{jsx,tsx}': 'PASCAL_CASE',
			'src/**/*.{js,ts}': 'CAMEL_CASE',
		},
	],
};

const tsNamingConvention = {
	'@typescript-eslint/naming-convention': [
		'warn',
		{
			selector: 'default',
			format: ['strictCamelCase'],
		},

		{
			selector: 'variableLike',
			format: ['strictCamelCase'],
		},
		{
			selector: 'variable',
			modifiers: ['global', 'const'],
			format: ['UPPER_CASE'],
		},
		{
			selector: 'variable',
			modifiers: ['global', 'const'],
			types: ['function'],
			format: ['strictCamelCase'],
		},
		{
			selector: 'parameter',
			format: ['strictCamelCase'],
			leadingUnderscore: 'allow',
		},
		{
			selector: 'function',
			format: ['UPPER_CASE'],
			filter: '^(?:GET|POST)$',
		},

		{
			selector: 'objectLiteralProperty',
			filter: '^--',
			format: null,
		},

		{
			selector: 'typeLike',
			format: ['StrictPascalCase'],
		},
		{
			selector: 'typeParameter',
			format: ['StrictPascalCase'],
			prefix: ['T'],
		},

		{
			selector: 'import',
			format: ['strictCamelCase', 'UPPER_CASE'],
		},
	],
};

const tsxNamingConvention = {
	'@typescript-eslint/naming-convention': [
		'warn',
		{
			selector: 'default',
			format: ['strictCamelCase'],
		},

		{
			selector: 'variableLike',
			format: ['strictCamelCase'],
		},
		{
			selector: 'variable',
			modifiers: ['global', 'const'],
			format: ['UPPER_CASE'],
		},
		{
			selector: 'variable',
			modifiers: ['global', 'const'],
			types: ['function'],
			format: ['strictCamelCase', 'StrictPascalCase'],
		},
		{
			selector: 'parameter',
			format: ['strictCamelCase'],
			leadingUnderscore: 'allow',
		},
		{
			selector: 'function',
			format: ['strictCamelCase', 'StrictPascalCase'],
		},
		{
			selector: 'function',
			format: ['UPPER_CASE'],
			filter: '^(?:GET|POST)$',
		},

		{
			selector: 'objectLiteralProperty',
			filter: '^--',
			format: null,
		},

		{
			selector: 'typeLike',
			format: ['StrictPascalCase'],
		},
		{
			selector: 'typeParameter',
			format: ['StrictPascalCase'],
			prefix: ['T'],
		},

		{
			selector: 'import',
			format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
		},
	],
};

const plugins = {
	typescriptPlugin,
	checkFilePlugin,
};

const languageOptions = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		project: true,
		tsconfigRootDir: '__dirname',
		ecmaFeatures: {
			jsx: true,
		},
		warnOnUnsupportedTypeScriptVersion: true,
	},
};

export default [
	{
		files: ['**/*.ts'],
		plugins,
		languageOptions,
		rules: {
			...generalRules,
			...tsNamingConvention,
		},
	},
	{
		files: ['**/*.tsx'],
		plugins: {
			...plugins,
			reactPlugin,
		},
		languageOptions,
		rules: {
			...generalRules,
			...tsxNamingConvention,
		},
	},
	{
		files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
		plugins: {
			...plugins,
			testingLibrary: testingLibraryPlugin,
		},
		extends: ['plugin:testing-library/react'],
		rules: {
			...generalRules,
			...tsNamingConvention,
			'@typescript-eslint/no-magic-numbers': 'off',
		},
	},
];
