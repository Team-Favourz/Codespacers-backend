import log4js from "log4js";

log4js.configure({
	appenders: {
		out: { type: "stdout" },
		app: { type: "file", filename: "application.log" },
	},
	categories: {
		default: { appenders: ["out"], level: "trace" },
		app: { appenders: ["app"], level: "trace" },
	},
});

const logger = log4js.getLogger();
export const logToFile = log4js.getLogger("app");

export default logger;
