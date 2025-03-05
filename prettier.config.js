// https://www.npmjs.com/package/prettier-config-moon
const config = require('prettier-config-moon');

module.exports = {
  ...config,
  plugins: [],
  // pluginSearchDirs: ['.'],
  overrides: [
    ...config.overrides,
  ],
};
