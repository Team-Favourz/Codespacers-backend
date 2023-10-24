"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToFile = void 0;
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        out: { type: "stdout" },
        app: { type: "file", filename: "application.log" },
    },
    categories: {
        default: { appenders: ["out"], level: "trace" },
        app: { appenders: ["app"], level: "trace" },
    },
});
const logger = log4js_1.default.getLogger();
exports.logToFile = log4js_1.default.getLogger("app");
exports.default = logger;
