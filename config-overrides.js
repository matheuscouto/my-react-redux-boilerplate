const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  // Babel Plugins
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );

  // // LESS
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#342245',
      '@link-color': '#342245',
    },
    javascriptEnabled: true,
  })(config, env);

  // do stuff with the webpack config...
  return config;
};
