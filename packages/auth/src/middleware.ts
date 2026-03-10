import { PAGE_URLS, PUBLIC_ROUTES } from "@workspace/models";
import { type NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest): NextResponse {
	const { pathname } = request.nextUrl;

	const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
	if (isPublicRoute) {
		return NextResponse.next();
	}

	const sessionCookie =
		request.cookies.get("better-auth.session_token") ?? request.cookies.get("__Secure-better-auth.session_token");

	if (!sessionCookie?.value) {
		const loginUrl = new URL(PAGE_URLS.LOGIN, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}
