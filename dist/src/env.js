"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env_core_1 = require("@t3-oss/env-core");
const zod_1 = require("zod");
exports.env = (0, env_core_1.createEnv)({
    server: {
        CONNSTR: zod_1.z.string().url(),
        PORT: zod_1.z.number().default(4100),
        NODE_ENV: zod_1.z.string().default("development"),
        DB_USERNAME: zod_1.z.string(),
        DB_PASSWORD: zod_1.z.string(),
        DB_BUCKET_NAME: zod_1.z.string(),
        DB_SCOPE_NAME: zod_1.z.string(),
        DB_COLLECTION_NAME: zod_1.z.string(),
        COOKIE_SECRET: zod_1.z.string(),
        APP_SECRET: zod_1.z.string(),
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
