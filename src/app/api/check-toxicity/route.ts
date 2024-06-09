// src/app/api/check-toxicity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyzeToxicity } from "@/src/lib/perspective";

export async function POST(request: NextRequest) {
	const { content } = await request.json();

	if (!content) {
		return NextResponse.json(
			{ error: "Content is required" },
			{ status: 400 }
		);
	}

	try {
		const toxicityScore = await analyzeToxicity(content);

		console.log("Toxicity Score:", toxicityScore); // Log the toxicity score for debugging

		if (toxicityScore >= 0.7) {
			console.warn("Blocked toxic post with score:", toxicityScore); // Log a warning for blocked content
			return NextResponse.json(
				{ error: "Post is too toxic" },
				{ status: 400 }
			);
		}

		return NextResponse.json({ message: "Content is acceptable" });
	} catch (error) {
		console.error("Error analyzing content:", error); // Log any errors for debugging
		return NextResponse.json(
			{ error: "Failed to analyze content" },
			{ status: 500 }
		);
	}
}
