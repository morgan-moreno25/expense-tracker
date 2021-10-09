import dotenv from 'dotenv';
dotenv.config();

type EnvironmentVariable = string | undefined;

class Config {
	private JWT_SECRET: EnvironmentVariable;
	private TEST_PASS: EnvironmentVariable;

	constructor() {
		this.JWT_SECRET = process.env.JWT_SECRET;
		this.TEST_PASS = process.env.TEST_PASS;
	}

	getJwtSecret(): string {
		return this.JWT_SECRET as string;
	}
	getTestPassword(): string {
		return this.TEST_PASS as string;
	}
}

export default new Config();
