"use client";

import { useEffect, useState } from "react";
import CreatePostDialog from "@/components/CreatePostDialog";
import PostCard from "@/components/PostCard";
import { useTranslations } from "next-intl";

type Post = {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};

export default function PostsPage() {
	const t = useTranslations("Posts");
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
			<h1>{t("title")}</h1>
			<CreatePostDialog onPostCreated={fetchPosts} />
			<div className="mt-4">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
