import express, {
	type NextFunction,
	type Response,
	type Request,
} from "express";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";
import logger from "./middlewares/logger";
import swaggerUi from "swagger-ui-express";
import specs from "./docs/docs";
import "express-async-errors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes";
import { errorResponse, successResponse } from "./utils/responseHandlers";
// import { rateLimit } from "express-rate-limit";
// import apicache from "apicache";

const app = express();
app.use(cookieParser());
// const cache = apicache.middleware;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cors());
app.use(morgan("combined"));

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1/auth", userRoute);

// create a not found routes
app.use("*", (_, res: Response) => {
	successResponse(res, {}, 404, "Route not found");
});

// create a global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	logger.error(err);
	errorResponse(res, "Internal server error", 500);
});

app.listen(process.env.PORT, () => {
	logger.info(
		chalk.bgRed.blue.bold(`Server is running on port ${process.env.PORT}`),
	);
});

process.on("uncaughtException", (err) => {
	logger.error(err, " : ", err.stack);
});

process.on("unhandledRejection", (err) => {
	logger.error(err);
});
