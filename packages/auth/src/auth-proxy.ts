import { PAGE_URLS, PUBLIC_ROUTES } from "@workspace/models";
import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export function authProxy(request: NextRequest): NextResponse {
	const { pathname } = request.nextUrl;

	const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
	if (isPublicRoute) {
		return NextResponse.next();
	}

	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		const loginUrl = new URL(PAGE_URLS.LOGIN, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}
