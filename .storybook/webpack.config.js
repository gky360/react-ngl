/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const isCI = process.env.CI === 'true';

module.exports = async ({ config }) => {
  config.module.rules.unshift({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          // Provide the path to your tsconfig.json so that your stories can
          // display types from outside each individual story.
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    ],
  });
  if (isCI) {
    // eslint-disable-next-line no-param-reassign
    config.plugins = config.plugins.filter(
      ({ constructor }) => constructor.name !== 'ProgressPlugin'
    );
  }
  config.resolve.extensions.push('.ts', '.tsx', '.d.ts');
  return config;
};
