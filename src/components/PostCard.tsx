import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/src/components/ui/card";
import { useTranslations } from "next-intl";

type Post = {
	id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};

interface PostCardProps {
	post: Post;
}

export default function PostCard({ post }: PostCardProps) {
	const t = useTranslations("PostCard");

	return (
		<Card className="mx-20 my-20">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<CardDescription>{t("author")}: {post.author.name}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{post.content}</p>
			</CardContent>
		</Card>
	);
}
