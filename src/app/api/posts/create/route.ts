import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(request: NextRequest) {
	const { title, content, userId } = await request.json();

	try {
		const post = await db.post.create({
			data: {
				title,
				content,
				authorId: userId,
			},
		});
		return NextResponse.json(post, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error creating post" },
			{ status: 500 }
		);
	}
}
