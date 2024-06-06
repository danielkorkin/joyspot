"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { type Locale } from "@/lib/locales";
import { GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function LanguagePicker() {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = pathname.split("/")[1] as Locale;

	const handleLocaleChange = (locale: Locale) => {
		const segments = pathname.split("/").filter(Boolean);
		if (segments[0] === currentLocale) {
			segments[0] = locale;
		} else {
			segments.unshift(locale);
		}
		const newPath = `/${segments.join("/")}`;
		router.push(newPath);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button type="button" variant="ghost" size="icon">
					<GlobeIcon className="size-5" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="mt-2">
				{" "}
				{/* Add margin top to move the dropdown down */}
				<DropdownMenuLabel>Language</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={currentLocale === "en"}
					onClick={() => handleLocaleChange("en")}
				>
					English
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={currentLocale === "es"}
					onClick={() => handleLocaleChange("es")}
				>
					Español
				</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
					checked={currentLocale === "fr"}
					onClick={() => handleLocaleChange("fr")}
				>
					Français
				</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
					checked={currentLocale === "ru"}
					onClick={() => handleLocaleChange("ru")}
				>
					Русский
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
