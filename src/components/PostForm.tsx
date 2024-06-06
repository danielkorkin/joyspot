// components/PostForm.tsx
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";

export default function PostForm({
	onSubmit,
}: {
	onSubmit: (title: string, content: string) => void;
}) {
	const t = useTranslations("PostForm");
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
				placeholder={t("placeholderTitle")}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<Input
				type="text"
				placeholder={t("placeholderContent")}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			/>
			<Button type="submit">{t("submit")}</Button>
		</form>
	);
}
