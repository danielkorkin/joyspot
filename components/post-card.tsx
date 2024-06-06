import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function PostCard({ post }) {
	return (
		<Card className="mx-20 my-20">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{post.content}</p>
			</CardContent>
			<CardFooter>
				<p>Posted by {post.author.name}</p>
			</CardFooter>
		</Card>
	);
}

export default PostCard;
