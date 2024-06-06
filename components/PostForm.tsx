// components/PostForm.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PostForm({
	onSubmit,
}: {
	onSubmit: (title: string, content: string) => void;
}) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit(title, content);
		setTitle("");
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			/>
			<Button type="submit">Create Post</Button>
		</form>
	);
}
