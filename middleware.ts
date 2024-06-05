import {
	clerkMiddleware,
	createRouteMatcher,
	redirectToSignIn,
} from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: ["en", "es"],

	// Used when no locale matches
	defaultLocale: "en",
});

const isProtectedRoute = createRouteMatcher(["posts"]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();

	return intlMiddleware(req);
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
