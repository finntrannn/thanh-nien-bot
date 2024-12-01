import { ENDPOINTS } from "../../config/constants.js";

export class AuthService {
	constructor(username, password, platform = 2) {
		this.username = username;
		this.password = password;
		this.platform = platform;

		/**
		 * App login -> auth token of the app -> request to get auth token for the web app
		 * -> use that auth token to generate app_token that can do the exam
		 * lol
		 */
		this.loginData = null; // This contain the main app login data (auth_token, refresh_token)
		this.authToken = null; // This is the web app auth token (not the app auth token got by logging in)
		this.appToken = null; // This is the app_token use to do the exam

		this.loginHeaders = {
			"user-agent": "Dart/3.5 (dart:io)",
			appid: "2",
			"tenant-id": "2",
			"content-type": "application/json; charset=UTF-8",
		};

		this.getAuthTokenHeaders = {
			"user-agent": "Dart/3.5 (dart:io)",
			appid: "2",
			"accept-encoding": "gzip",
			"tenant-id": "2",
			authorization: null, // the auth token (of the app) will be insert later
			"content-type": "application/json; charset=UTF-8",
		};

		this.getAppTokenHeaders = {
			"User-Agent":
				"Mozilla/5.0 (Linux; Android 14; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36",
		};
	}

	async login() {
		let response = await fetch(ENDPOINTS.AUTH.LOGIN, {
			method: "post",
			headers: this.loginHeaders,
			body: JSON.stringify({
				user_name: this.username,
				password: this.password,
				platform: this.platform,
			}),
		});

		this.loginData = await response.json();
		return this.loginData;
	}

	async getAuthToken() {
		this.getAuthTokenHeaders.authorization = `Bearer ${this.loginData.data.auth_token}`; // Use the main app auth_token to generate the auth_token for the web app inside of it (2 different app)

		let response = await fetch(ENDPOINTS.AUTH.GET_TOKEN, {
			method: "post",
			headers: this.getAuthTokenHeaders,
		});
		this.authToken = (await response.json()).data.token;

		return this.authToken;
	}

	async getAppToken() {
		let queries = new URLSearchParams();
		queries.append("id_token", this.authToken);
		queries.append("redirect_url", "/cuoc-thi/index");
		queries.append("app", "mobile");

		let response = await fetch(
			ENDPOINTS.AUTH.GET_APP_TOKEN + "?" + queries.toString(),
			{
				method: "get",
				headers: this.getAppTokenHeaders,
				redirect: "manual",
			}
		);
		this.appToken = response.headers.getSetCookie()[1].split("; ")[0];

		/**
		 * Examples of the set-cookies
		 * [
		 * 		'PHPSESSID= >> random string <<; path=/',
		 * 		'app_token= >> app token here <<; expires= >> date <<; Max-Age=86400; path=/'
		 * ]
		 */
		return this.appToken;
	}
}
