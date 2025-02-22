import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		files: [
			"src/graphql/resolver/**/*.ts",
			"src/app/api/graphql/**/*.ts",
			"src/**/*.test.ts",
		],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
];

export default eslintConfig;
