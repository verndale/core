module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
};
