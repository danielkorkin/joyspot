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

// types.ts
declare module "perspective-api-client" {
	interface AnalyzeResult {
		attributeScores: {
			TOXICITY: {
				spanScores: Array<{
					begin: number;
					end: number;
					score: {
						value: number;
						type: string;
					};
				}>;
				summaryScore: {
					value: number;
					type: string;
				};
			};
		};
		languages: string[];
		detectedLanguages: string[];
	}

	interface PerspectiveOptions {
		apiKey?: string;
		authClient?: any;
	}

	export default class Perspective {
		constructor(options: PerspectiveOptions);
		analyze(text: string): Promise<AnalyzeResult>;
	}
}
