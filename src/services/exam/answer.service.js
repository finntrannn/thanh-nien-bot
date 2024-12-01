import { ENDPOINTS } from "../../config/constants.js";
import { findNearestMatch } from "../../utils/findNearestMatch.js";
import fs from "fs";

export class AnswerService {
	constructor() {
		this.questionAnswerList = this.loadAnswers();
	}

	loadAnswers() {
		return JSON.parse(fs.readFileSync("./answers.json", "utf-8"));
	}

	async submitAnswer({ question, questionIndex, appToken }) {
		const headers = this.getHeaders(appToken);
		const answerData = this.prepareAnswerData(
			question.content,
			question.answers,
			questionIndex
		);

		return await fetch(ENDPOINTS.EXAM.SAVE_ANSWER, {
			method: "POST",
			headers,
			body: this.createFormData(answerData),
		});
	}

	prepareAnswerData(question, answers, questionIndex) {
		const questionMatch = findNearestMatch(
			this.questionAnswerList,
			question.trim(),
			"Question"
		).match;

		const answerMatch = findNearestMatch(
			answers,
			questionMatch.Answer,
			"content"
		).match;

		const answerIndex = answers.findIndex(
			(answer) => answer.content === answerMatch.content
		);

		return {
			questionIndex,
			answerIndex,
			totalAnswers: 4,
		};
	}

	createFormData({ questionIndex, answerIndex, totalAnswers }) {
		const body = new URLSearchParams();

		for (let i = 0; i < totalAnswers; i++) {
			body.append(`answer[${i}][u]`, i === answerIndex ? "1" : "0");
		}

		body.append("questionNo", questionIndex);
		body.append("test", "");
		body.append("id", ENDPOINTS.EXAM.ID);
		body.append("ngoiSaoHyVong", "0");

		return body;
	}

	getHeaders(appToken) {
		return {
			"X-Requested-With": "XMLHttpRequest",
			"User-Agent":
				"Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36",
			Accept: "*/*",
			Referer: "https://thanhnienvietnam.vnlms.vn/cuocthi/join2/",
			"Accept-Encoding": "gzip, deflate, br, zstd",
			"Accept-Language": "en-US,en;q=0.9",
			Cookie: appToken,
		};
	}
}
