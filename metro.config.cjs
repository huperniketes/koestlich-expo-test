const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = require.resolve("metro-minify-esbuild");
config.transformer.minifierConfig = {
  // ESBuild options...
};

config.resolver = {
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
  assetExts: ['glb', 'gltf', 'png', 'jpg'],
}

module.exports = config;