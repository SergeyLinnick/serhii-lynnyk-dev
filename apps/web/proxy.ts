import { authProxy } from "@workspace/auth/auth-proxy";
import { type NextRequest, NextResponse } from "next/server";

function buildCsp(nonce: string): string {
	const isDev = process.env.NODE_ENV === "development";
	return [
		"default-src 'self'",
		isDev
			? "script-src 'self' 'unsafe-inline' 'unsafe-eval' browser.sentry-cdn.com"
			: `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
		`style-src 'self'${isDev ? " 'unsafe-inline'" : ` 'nonce-${nonce}'`}`,
		"worker-src 'self' blob:",
		"font-src 'self'",
		"img-src 'self' data:",
		"connect-src 'self' o4511032931385344.ingest.de.sentry.io *.sentry-cdn.com",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
	].join("; ");
}

export function proxy(request: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const csp = buildCsp(nonce);

	const authResponse = authProxy(request);

	if (authResponse.headers.has("location")) {
		authResponse.headers.set("Content-Security-Policy", csp);
		return authResponse;
	}

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", csp);

	const response = NextResponse.next({ request: { headers: requestHeaders } });
	response.headers.set("Content-Security-Policy", csp);
	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!api/auth|_next/static|_next/image|monitoring|favicon|android-chrome|apple-touch-icon|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
