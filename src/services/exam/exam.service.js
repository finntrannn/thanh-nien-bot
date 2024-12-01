import { ENDPOINTS } from "../../config/constants.js";

export class ExamService {
	async startExam(appToken) {
		const headers = this.getHeaders(appToken);
		const response = await fetch(`${ENDPOINTS.EXAM.START}`, { headers });
		const data = await response.json();
		return data.deThiContent;
	}

	async submitExam(appToken) {
		const headers = this.getHeaders(appToken);
		const body = new URLSearchParams();
		body.append("test", "");
		body.append("id", ENDPOINTS.EXAM.ID);

		const response = await fetch(ENDPOINTS.EXAM.SUBMIT, {
			method: "post",
			headers,
			body,
		});

		return response.json();
	}

	async getResult(resultId, appToken) {
		const headers = this.getHeaders(appToken);
		const body = new URLSearchParams();
		body.append("id", resultId);

		const response = await fetch(ENDPOINTS.EXAM.RESULT, {
			method: "post",
			headers,
			body,
		});

		return response.json();
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
