import CreatePostDialog from "@/src/components/CreatePostDialog";
import PostCard from "@/src/components/PostCard";
import Navbar from "@/src/components/navbar";
import { Post } from "@/src/lib/types";
import { useTranslations } from "next-intl";
import { Toaster } from "@/components/ui/sonner"
import MotivationCard from "@/src/components/MotivationCard";

interface PostsLayoutProps {
	posts: Post[];
}

export const PostsLayout = ({ posts }: PostsLayoutProps) => {
	const t = useTranslations("Posts");

	return (
		<div>
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-5xl font-bold pt-24 text-center pb-2">
					{t("title")}
				</h1>
				<CreatePostDialog />
				<MotivationCard />
			</div>
			<div className="mt-2">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
			<Toaster />
		</div>
	);
};
