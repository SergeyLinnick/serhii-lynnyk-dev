import pluginNext from "@next/eslint-plugin-next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import baseConfig from "./base.js";

export default [
	...baseConfig,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		plugins: {
			react: pluginReact,
			"react-hooks": pluginReactHooks,
			"@next/next": pluginNext,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			...pluginReact.configs["jsx-runtime"].rules,
			...pluginReactHooks.configs.recommended.rules,
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs["core-web-vitals"].rules,
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
	{
		ignores: [".next/**"],
	},
];
