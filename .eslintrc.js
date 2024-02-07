module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es2021: true,
    "shared-node-browser": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
