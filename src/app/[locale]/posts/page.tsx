import { db } from "@/src/lib/db";
import { PostsLayout } from "./PostsLayout";
import { clerkClient } from "@clerk/nextjs/server";

type Post = {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};

export const revalidate = 60;

const PostsPage = async () => {
	const posts: Post[] = [];
	const response = await db.post.findMany();

	for (const post of response) {
		const user = await clerkClient.users.getUser(post.authorId);
		posts.push({
			id: post.id,
			title: post.title,
			content: post.content,
			author: {
				name: `${user.firstName} ${user.lastName}`,
			},
		});
	}

	return <PostsLayout posts={posts} />;
};

export default PostsPage;
