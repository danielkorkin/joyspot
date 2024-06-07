"use client";

import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/src/components/ui/dialog";
import PostForm from "@/src/components/PostForm";
import { Button } from "@/src/components/ui/button";
import handleSubmit from "./actions/createPost";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreatePostDialog = () => {
	const [open, setOpen] = useState(false);
	const { userId } = useAuth();
	const router = useRouter();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">+ New Post</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Post</DialogTitle>
				</DialogHeader>
				<PostForm
					onSubmit={(title, content) => {
						handleSubmit(title, content, userId);
						setOpen(false);
						router.refresh();
					}}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreatePostDialog;
