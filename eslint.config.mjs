// @ts-check

import eslint from "@eslint/js";
// @ts-ignore
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import solid from "eslint-plugin-solid/configs/typescript";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["*.ts", "*.tsx"],
    ...solid,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro/*.ts"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { option: "type" }],
    },
  },
  eslintConfigPrettier,
);
