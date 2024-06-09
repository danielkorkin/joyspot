// components/PostForm.tsx
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function PostForm({
	onSubmit,
}: {
	onSubmit: (title: string, content: string) => void;
}) {
	const t = useTranslations("PostForm");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleToxicityCheck = async (content: string) => {
		try {
			const response = await fetch("/api/check-toxicity", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An error occurred");
			}

			const result = await response.json();
			return result;
		} catch (error) {
			console.error("Error checking toxicity:", error);
			return { success: false, message: error.message };
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const result = await handleToxicityCheck(content);

		if (!result.success) {
			toast(result.message);
			return;
		}

		onSubmit(title, content);
		setTitle("");
		setContent("");
		toast(t("toastTitle"));
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
