import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
	try {
		const posts = await db.post.findMany({
			include: {
				author: true,
			},
		});
		return NextResponse.json(posts);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error fetching posts" },
			{ status: 500 }
		);
	}
}
