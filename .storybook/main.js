module.exports = {
  stories: ['../**/*.stories.mdx'],
  addons: [
    '@storybook/preset-scss',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-events',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
  ],
};
