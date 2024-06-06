import { useState } from "react";
import { currentUser } from "@clerk/nextjs/server";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import PostForm from "@/components/PostForm";
import { Button } from "@/components/ui/button";

export default function CreatePostDialog({
	onPostCreated,
}: {
	onPostCreated: () => void;
}) {
	const [open, setOpen] = useState(false);

	const handleSubmit = async (title: string, content: string) => {
		const user = await currentUser();
		if (!user) {
			console.error("User not authenticated");
			return;
		}

		try {
			const post = await db.post.create({
				data: {
					title,
					content,
					authorId: user.id,
				},
			});
			onPostCreated();
			setOpen(false);
		} catch (error) {
			console.error("Failed to create post");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">+ New Post</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Post</DialogTitle>
				</DialogHeader>
				<PostForm onSubmit={handleSubmit} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
