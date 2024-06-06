import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

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
	return (
		<Card className="mx-20 my-20">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<CardDescription>Author: {post.author.name}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{post.content}</p>
			</CardContent>
		</Card>
	);
}
