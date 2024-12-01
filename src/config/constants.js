export const ENDPOINTS = {
	AUTH: {
		LOGIN: "https://tnvn-pro.vivas.vn/id/login", // 							This endpoint use to get the auth_token
		GET_TOKEN: "https://tnvn-pro.vivas.vn/be/api/app/tnvn/getTokenForVivas", // This endpoint generate a token for the web-app
		GET_APP_TOKEN:
			"https://thanhnienvietnam.vnlms.vn/security/appThanhnien", //			This endpoint use the token from the above endpoint to get "set-cookie" header that can do the exam things
	},
	EXAM: {
		ID: "64082d5ac225d67c",
		get START() {
			return `https://thanhnienvietnam.vnlms.vn/service/learnerV2/startBaiThi?exam=&id=${this.ID}`;
		},
		SAVE_ANSWER:
			"https://thanhnienvietnam.vnlms.vn/service/learnerV2/saveAnswerV2",
		SUBMIT: "https://thanhnienvietnam.vnlms.vn/service/learnerV2/submitBaiThiForQuickContest",
		RESULT: "https://thanhnienvietnam.vnlms.vn/service/learnerV2/xemKetQua",
	},
};
