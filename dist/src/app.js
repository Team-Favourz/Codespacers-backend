"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./docs/docs"));
require("express-async-errors");
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const responseHandlers_1 = require("./utils/responseHandlers");
// import { rateLimit } from "express-rate-limit";
// import apicache from "apicache";
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// const cache = apicache.middleware;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.get("/", (_, res) => {
    res.status(200).json({
        message: "Welcome to Codespacers backend",
        status: 200,
        success: true,
        data: "/api/v1/health",
    });
});
app.get("/api/v1/health", (_, res) => {
    res.status(200).json({
        status: 200,
        message: "API is up and running",
        success: true,
    });
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
app.use("/api/v1/auth", routes_1.userRoute);
// create a not found routes
app.use("*", (_, res) => {
    (0, responseHandlers_1.successResponse)(res, {}, 404, "Route not found");
});
// create a global error handler
app.use((err, _req, res, _next) => {
    logger_1.default.error(err);
    (0, responseHandlers_1.errorResponse)(res, "Internal server error", 500);
});
app.listen(process.env.PORT, () => {
    logger_1.default.info(chalk_1.default.bgRed.blue.bold(`Server is running on port ${process.env.PORT}`));
});
process.on("uncaughtException", (err) => {
    logger_1.default.error(err, " : ", err.stack);
});
process.on("unhandledRejection", (err) => {
    logger_1.default.error(err);
});
