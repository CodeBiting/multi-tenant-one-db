import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], // Apply these settings to all .js files
    languageOptions: {
      sourceType: "commonjs", // Use CommonJS module system
      ecmaVersion: "latest", // Use the latest ECMAScript version
      globals: globals.node, // Adjust for Node.js global variables
    },
    rules: {
      indent: ["error", 4, { SwitchCase: 1 }], // Enforce 4-space indentation
      semi: ["error", "always"], // Require semicolons
      quotes: ["error", "single"], // Use single quotes
      "no-console": "off", // Allow console.log for debugging
      "no-unused-vars": ["warn"], // Warn about unused variables
    },
  },
  pluginJs.configs.recommended, // Use recommended rules from the ESLint JS plugin
];
