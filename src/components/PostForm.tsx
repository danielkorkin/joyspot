// src/components/PostForm.tsx
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import axios from "axios";

export default function PostForm({
	onSubmit,
}: {
	onSubmit: (title: string, content: string) => void;
}) {
	const t = useTranslations("PostForm");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	interface AxiosError {
		response?: {
			status: number;
			data: {
				error: string;
			};
		};
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post("/api/check-toxicity", {
				content,
			});

			if (response.status === 200) {
				onSubmit(title, content);
				setTitle("");
				setContent("");
				toast(t("toastTitle"));
			} else if (
				response.status === 400 &&
				response.data.error === "Post is too toxic"
			) {
				toast(t("toastTooToxic"));
			} else {
				toast(response.data.error || t("toastError"));
			}
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			if (
				axiosError.response &&
				axiosError.response.status === 400 &&
				axiosError.response.data.error === "Post is too toxic"
			) {
				toast(t("toastTooToxic"));
			} else {
				console.error("Error submitting post:", error); // Log any errors for debugging
				toast(t("toastError"));
			}
		} finally {
			setLoading(false);
		}
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
			<Button type="submit" disabled={loading}>
				{loading ? t("loading_checking") : t("submit")}
			</Button>
		</form>
	);
}
