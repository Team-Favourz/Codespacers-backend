import express from "express";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";
import logger from "./middlewares/logger";
import swaggerUi from "swagger-ui-express";
import specs from "./docs/docs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cors());
app.use(morgan("combined"));

app.get("/", (_, res) => {
  res.status(200).json({
      message: "Welcome to Codespacers backend",
      status: "200",
      success: true,
      link: "/api/v1/health"
  })
})

app.get("/api/v1/health", (_, res) => {
  res.status(200).json({
    status: 200,
    message: "API is up and running",
    success: true
  })
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
	logger.info(chalk.bgRed.blue.bold("Server is running on port 3000"));
});

process.on("uncaughtException", (err) => {
	logger.error(err, " : ", err.stack);
});

process.on("unhandledRejection", (err) => {
	logger.error(err);
});
