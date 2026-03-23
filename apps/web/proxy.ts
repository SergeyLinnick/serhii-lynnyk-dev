import { authProxy } from "@workspace/auth/auth-proxy";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	return authProxy(request);
}

export const config = {
	matcher: [
		"/((?!_next|api/auth|monitoring|favicon|android-chrome|apple-touch-icon|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml).*)",
	],
};
