import js from '@eslint/js';
import globals from 'globals';
import eslintReact from '@eslint-react/eslint-plugin';
import prettierOverrides from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
	globalIgnores(['dist']),
	{
		files: ['**/*.{mjs,ts,tsx}'],
		extends: [js.configs.recommended],
	},
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			tseslint.configs.recommendedTypeChecked,
			tseslint.configs.stylisticTypeChecked,
			tseslint.configs.strictTypeChecked,
			prettierOverrides,
		],
		rules: {
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/no-confusing-void-expression': [
				'error',
				{
					ignoreArrowShorthand: true,
				},
			],
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{ allowNumber: true, allowBoolean: true },
			],
		},
	},
	{
		files: ['**/*.tsx'],
		extends: [
			eslintReact.configs['recommended-type-checked'],
			eslintReact.configs['strict-type-checked'],
			jsxA11y.flatConfigs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
	},
	{
		languageOptions: {
			ecmaVersion: 2023,
			globals: {
				...globals.browser,
				...globals.serviceworker,
			},
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	}
);
