"use client";

import { useEffect, useState } from "react";
import CreatePostDialog from "@/components/CreatePostDialog";

type Post = {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};

export default function PostsPage() {
	const [posts, setPosts] = useState<Post[]>([]);

	const fetchPosts = async () => {
		const response = await fetch("/api/posts/getall");
		if (response.ok) {
			const data = await response.json();
			setPosts(data);
		} else {
			console.error("Failed to fetch posts");
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<h1>Posts</h1>
			<CreatePostDialog onPostCreated={fetchPosts} />
			<div className="mt-4">
				{posts.map((post) => (
					<div key={post.id} className="border p-4 mb-4">
						<h2 className="text-xl font-bold">{post.title}</h2>
						<p>{post.content}</p>
						<p className="text-sm text-gray-600">
							Author: {post.author.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
