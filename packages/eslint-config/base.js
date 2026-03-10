import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	{
		plugins: {
			turbo: turboPlugin,
			"only-warn": onlyWarn,
		},
		rules: {
			...turboPlugin.configs.recommended.rules,
		},
	},
	{
		ignores: ["dist/**"],
	},
);
