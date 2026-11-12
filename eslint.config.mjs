import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {ignores: ["dist", "build", "node_modules"]},

  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {argsIgnorePattern: "^_", varsIgnorePattern: "^_"},
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/prefer-readonly": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {allowConstantLoopConditions: true},
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "warn",
        {
          allowNullableObject: true,
          allowNullableBoolean: true,
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/promise-function-async": "warn",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/no-unsafe-type-assertion": "warn",
      "@typescript-eslint/prefer-reduce-type-parameter": "warn",
      "@typescript-eslint/method-signature-style": "warn",
      "@typescript-eslint/no-useless-empty-export": "warn",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals["shared-node-browser"],
      },
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/self-closing-comp": "warn",
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      "react/no-array-index-key": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-no-leaked-render": [
        "error",
        {validStrategies: ["ternary", "coerce"]},
      ],
      "react/jsx-curly-brace-presence": [
        "warn",
        {props: "never", children: "never"},
      ],
      "react/jsx-boolean-value": "warn",
      "react/jsx-no-constructed-context-values": "error",
      "react/no-unstable-nested-components": "error",
      "react/function-component-definition": [
        "warn",
        {namedComponents: "function-declaration"},
      ],
      "react/hook-use-state": "warn",
      "react/jsx-no-target-blank": "error",

      eqeqeq: ["error", "always", {null: "ignore"}],
      "no-console": ["warn", {allow: ["warn", "error"]}],
      "no-restricted-imports": ["error", {patterns: ["../../../*"]}],
      "no-else-return": "warn",
      "no-nested-ternary": "warn",
      "no-param-reassign": "error",
      "prefer-const": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      curly: ["error", "multi-line"],
    },
  },

  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/__mocks__/**",
      "**/test/**",
      "**/tests/**",
    ],
    plugins: {jest},
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    rules: {
      ...jest.configs.recommended.rules,
      "jest/no-focused-tests": "error",
      "jest/no-disabled-tests": "warn",
      "jest/prefer-to-have-length": "warn",
      "jest/prefer-strict-equal": "warn",
      "jest/consistent-test-it": ["warn", {fn: "test"}],
      "jest/require-top-level-describe": "warn",
      "jest/expect-expect": "warn",
      "jest/no-conditional-expect": "error",
      "jest/valid-title": "warn",
    },
  },

  {
    files: ["webpack.config.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
    },
  },

  {
    linterOptions: {reportUnusedDisableDirectives: "error"},
  },
);
