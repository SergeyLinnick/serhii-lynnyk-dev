import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-onboarding", "@storybook/addon-docs"],
	framework: "@storybook/nextjs-vite",
};

export default config;
