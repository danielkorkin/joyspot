import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";

type Props = {};

const Navbar = (props: Props) => {
	const t = useTranslations("Navbar");

	return (
		<header className="fixed right-0 left-0 top-0 py-4 px-4 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
			<nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
				<ul className="flex items-center gap-4 list-none text-black dark:text-white">
					<li>
						<Link
							className={buttonVariants({ variant: "outline" })}
							href="/"
						>
							{t("products")}
						</Link>
					</li>
				</ul>
			</nav>
			<ModeToggle />
		</header>
	);
};

export default Navbar;
