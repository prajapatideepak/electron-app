module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    http: require.resolve("stream-http"),
    https: false,
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    constants: require.resolve("constants-browserify"),
    crypto: require.resolve("crypto-browserify"),
    child_process: false,
    "./lib-cov/fluent-ffmpeg": "./lib/fluent-ffmpeg", // This line
  };

  return config;
};
