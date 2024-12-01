import chalk from "chalk";
import readline from "node:readline";
import { ENV as environment } from "./config/enviroment.js";
import { ExamService } from "./services/exam/exam.service.js";
import { AnswerService } from "./services/exam/answer.service.js";
import { AuthService } from "./services/auth/auth.service.js";
import { logger } from "./utils/logger.js";
import { validateConfig } from "./config/validation.js";

try {
	validateConfig();
} catch (ex) {
	logger.error(ex.message);
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
		await authService.login();
		await authService.getAuthToken();
		const appToken = await authService.getAppToken();

		// Start exam
		logger.info("Starting exam...");
		const examContent = await examService.startExam(appToken);
		// Process and submit answers
		logger.info("Processing exam questions...");
		console.log("");
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
		readline.cursorTo(process.stdout, 0);
		readline.clearLine(process.stdout, 0);
		process.stdout.write(
			`Processing question ${questionNumber}/${examContent.length}\r`
		);

		try {
			// Submit answer and get result
			const result = await answerService.submitAnswer({
				question,
				questionIndex,
				appToken,
			});

			logQuestionProgress(questionNumber, question, result);

			// Handle final question
			if (isLastQuestion(questionIndex, examContent)) {
				await handleFinalAnswer(examService, appToken);
			}
		} catch (error) {
			logger.error(`Error processing question ${questionNumber}:`, error);
		}
	}
}

function logQuestionProgress(questionNumber, question, result) {
	logger.info("Processed", chalk.cyan(`"${question.content}"`));
}

function isLastQuestion(currentIndex, examContent) {
	return examContent.length === currentIndex + 1;
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
