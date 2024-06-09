// src/lib/perspective.ts
import Perspective from "perspective-api-client";

const perspective = new Perspective({
	apiKey: process.env.PERSPECTIVE_API_KEY!,
});

export async function analyzeToxicity(text: string): Promise<number> {
	const result = await perspective.analyze(text);
	const toxicityScore = result.attributeScores.TOXICITY.summaryScore.value;
	return toxicityScore;
}
