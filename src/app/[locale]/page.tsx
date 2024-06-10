import { useTranslations } from "next-intl";
import SparklesText from "@/src/components/magicui/sparkles-text";
import Navbar from "@/src/components/navbar";
import { FlipWords } from "@/src/components/ui/flip-words";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/src/components/ui/accordion";
import { cn } from "../../lib/utils";
import AnimatedGradientText from "@/src/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
	const t = useTranslations("Home");
	const reasons = [
		t("reasonOne"),
		t("reasonTwo"),
		t("reasonThree"),
		t("reasonFour"),
	];
	const locale = cookies().get("NEXT_LOCALE")?.value || "en";

	return (
		<main>
			<Navbar />
			<div className="flex flex-col items-center justify-center pt-20">
				<SparklesText text={t("title")} />
				<div className="h-[10rem] flex justify-center items-center px-4">
					<div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
						{t("reasonStart")}
						<FlipWords words={reasons} /> <br />
						{t("reasonEnd")}
					</div>
				</div>
			</div>
			<div className="z-10 flex min-h-[4rem] items-center justify-center">
				<Link href={`/${locale}/posts`}>
					<AnimatedGradientText>
						🎉{" "}
						<hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
						<span
							className={cn(
								`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
							)}
						>
							{t("joinNow")}
						</span>
						<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
					</AnimatedGradientText>
				</Link>
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
