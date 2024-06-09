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
