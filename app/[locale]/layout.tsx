import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const messages = await getMessages();

	return (
		<ClerkProvider>
			<html suppressHydrationWarning lang={locale}>
				<body>
					<ThemeProvider>
						<NextIntlClientProvider messages={messages}>
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
							{children}
						</NextIntlClientProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
