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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.get("/", (_, res) => {
    res.status(200).json({
        message: "Welcome to Codespacers backend",
        status: "200",
        success: true,
        link: "/api/v1/health"
    });
});
app.get("/api/v1/health", (_, res) => {
    res.status(200).json({
        status: 200,
        message: "API is up and running",
        success: true
    });
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
app.listen(3000, () => {
    logger_1.default.info(chalk_1.default.bgRed.blue.bold("Server is running on port 3000"));
});
process.on("uncaughtException", (err) => {
    logger_1.default.error(err, " : ", err.stack);
});
process.on("unhandledRejection", (err) => {
    logger_1.default.error(err);
});
