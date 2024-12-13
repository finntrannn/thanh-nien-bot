import chalk from "chalk";

import { environment } from "./config/enviroment.js";
import { logger } from "./utils/logger.js";
import { validateConfig } from "./config/validation.js";

import { ExamService } from "./services/exam/exam.service.js";
import { AnswerService } from "./services/exam/answer.service.js";
import { AuthService } from "./services/auth/auth.service.js";

try {
	validateConfig();
} catch (ex) {
	logger.error(ex);
	process.exit(0);
}

async function main() {
	try {
		// Initialize services
		const authService = new AuthService(
			environment.USERNAME,
			environment.PASSWORD
		);
		const examService = new ExamService();
		const answerService = new AnswerService();

		// Login and get token
		logger.info("Initializing authentication...");
		logger.info("Logging in...");
		let { data: loginData } = await authService.login();
		logger.info(
			`Logged in as: ${loginData.account.profile.full_name} (${loginData.account.account_id})`
		);
		await authService.getAuthToken();
		const appToken = await authService.getAppToken();

		// Start exam
		logger.info("Starting exam...");
		const examContent = await examService.startExam(appToken);
		// Process and submit answers
		logger.info("Processing exam questions...");
		await processExamQuestions(
			examContent,
			answerService,
			examService,
			appToken
		);
	} catch (error) {
		logger.error("Application error:", error);
		process.exit(1);
	}
}

async function processExamQuestions(
	examContent,
	answerService,
	examService,
	appToken
) {
	for (let [questionIndex, question] of examContent.entries()) {
		const questionNumber = questionIndex + 1;
		logger.info(
			`Processing question ${questionNumber}/${examContent.length}`
		);

		try {
			// Submit answer
			const result = await answerService.submitAnswer({
				question,
				questionIndex,
				appToken,
			});

			logger.info("Processed", chalk.cyan(`"${question.content}"`));
			logger.info(`=`.repeat(process.stdout.columns - 30));

			// Handle final question
			if (examContent.length === questionIndex + 1) {
				await handleFinalAnswer(examService, appToken);
			}
		} catch (error) {
			logger.error(`Error processing question ${questionNumber}:`, error);
		}
	}
}

async function handleFinalAnswer(examService, appToken) {
	logger.info("Submitting final answers...");
	const submitResult = await examService.submitExam(appToken);

	logger.info("Fetching exam results...");
	const examResult = await examService.getResult(
		submitResult.data.result_id,
		appToken
	);

	logger.info("Final Results:", examResult);
}

// Start the application
main().catch((error) => {
	logger.error("Fatal error:", error);
	process.exit(1);
});
