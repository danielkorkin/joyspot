"use server";

import { db } from "../../lib/db";

const handleSubmit = async (
	title: string,
	content: string,
	user: string | null | undefined
) => {
	if (!user) {
		console.error("User not authenticated");
		return;
	}

	try {
		const post = await db.post.create({
			data: {
				title,
				content,
				authorId: user,
			},
		});
		console.log("Post created successfully", post);
	} catch (error) {
		console.log(error);

		console.error("Failed to create post");
	}
};

export default handleSubmit;
