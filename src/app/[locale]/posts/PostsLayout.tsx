import CreatePostDialog from "@/src/components/CreatePostDialog";
import PostCard from "@/src/components/PostCard";
import { Post } from "@/src/lib/types";
import { useTranslations } from "next-intl";

interface PostsLayoutProps {
	posts: Post[];
}

export const PostsLayout = ({ posts }: PostsLayoutProps) => {
	const t = useTranslations("Posts");

	return (
		<div>
			<h1>{t("title")}</h1>
			<CreatePostDialog />
			<div className="mt-4">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
};
