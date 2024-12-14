module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "nativewind/babel", // If you're using NativeWind
      "react-native-reanimated/plugin", // Required for Reanimated
    ],
  };
  