import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/src/components/ui/card";
import quotes from "../public/quotes.json";

const MotivationCard = () => {
	let date = new Date()
		.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.split("/")
		.map((d) => (d.length <= 1 ? "0" + d : d));

	let newDate = `${date[0]}/${date[1]}/${date[2]}`;

	const dailyQuote = quotes[newDate] || {
		quote: "No quote available for today.",
		author: "Unknown",
	};

	return (
		<div className="my-8">
			<Card className="w-[500px] h-[200px] px-2 py-2">
				<CardHeader>
					<CardTitle>Daily Motivation</CardTitle>
					<CardDescription>{newDate}</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						{dailyQuote.quote}{" "}
						<a className="font-bold">- {dailyQuote.author}</a>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default MotivationCard;
