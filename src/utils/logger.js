import chalk from "chalk";

export const logger = {
	info: (message, ...args) => {
		console.log(chalk.blue(" [ info ] "), message, ...args);
	},
	error: (message, ...args) => {
		console.error(chalk.red(" [ error ] "), message, ...args);
	},
	success: (message, ...args) => {
		console.log(chalk.green(" [ success ] "), message, ...args);
	},
};
