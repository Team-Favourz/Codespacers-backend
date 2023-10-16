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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
	logger.info(chalk.bgRed.blue.bold("Server is running on port 3000"));
});
