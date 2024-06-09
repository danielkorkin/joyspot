export type WebhookEvent = {
	data: UserData;
	object: "event";
	type: "user.created" | "user.updated" | string;
};

export type UserData = {
	id: string;
	email_addresses: { email_address: string }[];
	first_name: string;
	last_name: string;
	username: string;
};

export type Post = {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};

declare module "perspective-api-client" {
	interface Score {
		value: number;
		type: string;
	}

	interface SpanScore {
		begin: number;
		end: number;
		score: Score;
	}

	interface AttributeScores {
		TOXICITY: {
			spanScores: SpanScore[];
			summaryScore: Score;
		};
	}

	interface AnalyzeResult {
		attributeScores: AttributeScores;
		languages: string[];
		detectedLanguages: string[];
	}

	interface PerspectiveOptions {
		apiKey: string;
	}

	export default class Perspective {
		constructor(options: PerspectiveOptions);
		analyze(text: string): Promise<AnalyzeResult>;
	}
}
