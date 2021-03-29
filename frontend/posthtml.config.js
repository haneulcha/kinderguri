module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        DEV_MAP_KEY: process.env.DEV_MAP_KEY,
      },
    },
  },
};
