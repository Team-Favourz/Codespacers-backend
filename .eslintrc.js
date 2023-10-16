module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	parser: "@typescript-eslint/parser",
	extends: ["standard-with-typescript", "prettier"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {},
};
