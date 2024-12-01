import { existsSync, copyFileSync } from "node:fs";
import { logger } from "../utils/logger.js";

export function validateConfig() {
	if (!existsSync(".env")) {
		logger.error("No .env file found. Creating from example...");
		copyFileSync("./.env.example", "./.env");
		throw new Error(
			"Please configure the newly created .env file and restart the application."
		);
	}

	const requiredEnvVars = ["USERNAME", "PASSWORD"];
	const missingVars = requiredEnvVars.filter(
		(varName) => !process.env[varName]
	);

	if (missingVars.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missingVars.join(", ")}`
		);
	}
}
