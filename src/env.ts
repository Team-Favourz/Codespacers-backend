import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		CONNSTR: z.string().url(),
		PORT: z.number().default(4100),
		NODE_ENV: z.string().default("development"),
		DB_USERNAME: z.string(),
		DB_PASSWORD: z.string(),
		DB_BUCKET_NAME: z.string(),
		DB_SCOPE_NAME: z.string(),
		DB_COLLECTION_NAME: z.string(),
		COOKIE_SECRET: z.string(),
		APP_SECRET: z.string(),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: process.env,

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT:` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN:` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
