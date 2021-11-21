module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  // TODO work out why this sin't working...
  // parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: ["tsconfig.json", "tsconfig.dev.json"],
  //   sourceType: "module",
  // },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "max-len": ["error", {"code": 120}],
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
  },
};
