import {
	clerkMiddleware,
	createRouteMatcher,
	redirectToSignIn,
} from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/locales";

const intlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: locales,
	// Used when no locale matches
	defaultLocale: "en",
});

const isProtectedRoute = createRouteMatcher(["/posts"]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();

	return intlMiddleware(req);
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
