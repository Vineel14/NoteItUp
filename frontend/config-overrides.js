module.exports = function override(config, env) {
    // Ignore Paper.js source map warnings
    config.ignoreWarnings = [
      {
        module: /paper/,
        message: /Failed to parse source map/,
      },
    ];
  
    return config;
  };
  