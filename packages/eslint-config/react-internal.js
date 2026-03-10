import pluginReact from "eslint-plugin-react";
import globals from "globals";
import baseConfig from "./base.js";

export default [
	...baseConfig,
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		plugins: {
			react: pluginReact,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			...pluginReact.configs["jsx-runtime"].rules,
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
];
