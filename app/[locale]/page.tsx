import { useTranslations } from "next-intl";
import SparklesText from "@/components/magicui/sparkles-text";
import Navbar from "@/components/navbar";
import { FlipWords } from "@/components/ui/flip-words";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
	const t = useTranslations("Home");
	const reasons = [
		t("reasonOne"),
		t("reasonTwo"),
		t("reasonThree"),
		t("reasonFour"),
	];

	return (
		<main>
			<Navbar />
			<div className="flex flex-col items-center justify-center py-20">
				<SparklesText text={t("title")} />
				<div className="h-[10rem] flex justify-center items-center px-4">
					<div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
						{t("reasonStart")}
						<FlipWords words={reasons} /> <br />
						{t("reasonEnd")}
					</div>
				</div>
			</div>
			<div className="px-20">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>
							{t("opensourceQuestion")}
						</AccordionTrigger>
						<AccordionContent>
							{t("opensourceAnswer")}
							<a
								className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 hover:underline"
								href="https://github.com/devium335/joyspot"
							>
								GitHub
							</a>
							.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>{t("freeQuestion")}</AccordionTrigger>
						<AccordionContent>{t("freeAnswer")}</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</main>
	);
}
