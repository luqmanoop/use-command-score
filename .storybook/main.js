/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import path from "path";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.(stories|story).@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.(stories|story)\.(js|jsx|ts|tsx)?$/],
          include: [path.resolve(__dirname, "../src")]
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false }
        }
      }
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  webpackFinal: async config => {
    // config.resolve.plugins.push([new TsconfigPathsPlugin()]);
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [...(config.resolve.plugins || []), new TsconfigPathsPlugin()]
      }
    };
  }
};
export default config;
