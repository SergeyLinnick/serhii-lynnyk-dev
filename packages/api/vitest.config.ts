import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@workspace/models": resolve(__dirname, "../models/index.ts"),
		},
	},
	test: {
		globals: true,
	},
});
