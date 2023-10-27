import swaggerJsdoc from "swagger-jsdoc";

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Codespacers API Documentation",
			summary: "Find all the routes for Codespacers API endpoints",
			version: "1.0.0",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			description: "API documentation for Codespacers hackerton expenses app",
		},
		servers: [
			{
				url: "http://localhost:4100/api/v1",
				description: "Development server",
			},
			{
				url: "https://team-favourz-backend.onrender.com/api/v1",
				description: "Staging server",
			},
			{
				url: "https://api.gigantic-server.com/api/v1",
				description: "Production server",
			},
		],
		components: {
			schemas: {
				ErrorResponse: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							description: "Indicates if the request was successful",
						},
						status: {
							type: "number",
							description: "The status code of the response",
						},
						message: {
							type: "string",
							description: "The message of the response",
						},
					},
				},
				SuccessResponse: {
					type: "object",
					properties: {
						success: {
							type: "boolean",
							description: "Indicates if the request was successful",
						},
						status: {
							type: "number",
							description: "The status code of the response",
						},
						message: {
							type: "string",
							description: "The message of the response",
						},
						data: {
							type: "object",
							description: "The data of the response",
						},
					},
				},
				subscription: {
					type: "object",
					properties: {
						plan: {
							type: "string",
							description: "The plan of the subscription",
						},
						amount: {
							type: "number",
							description: "The amount of the subscription",
						},
						duration: {
							type: "enum",
              enum: ["Monthly", "Yearly", "Biweekly", "Weekly", "Daily"],
							description: "The duration of the subscription",
						},
						startDate: {
							type: "date",
              Date: "string",
							description: "The start date of the subscription",
						},
					},
				},
			},
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	basePath: "/api/v1",
	apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
