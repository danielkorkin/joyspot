import CreatePostDialog from "@/src/components/CreatePostDialog";
import PostCard from "@/src/components/PostCard";
import Navbar from "@/src/components/navbar";
import { Post } from "@/src/lib/types";
import { useTranslations } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

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
			</div>
			<div className="mt-2">
				<Suspense
					fallback={
						<div class="rounded-lg border bg-card text-card-foreground shadow-sm mx-20 my-8 animate-pulse">
							<div class="flex flex-col space-y-1.5 p-6">
								<div class="h-6 bg-gray-200 rounded"></div>
								<div class="h-4 bg-gray-200 rounded w-2/3"></div>
							</div>
							<div class="p-6 pt-0">
								<div class="h-6 bg-gray-200 rounded mb-2"></div>
								<div class="h-6 bg-gray-200 rounded w-3/4"></div>
							</div>
						</div>
					}
				>
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</Suspense>
			</div>
			<Toaster />
		</div>
	);
};
