import { authMiddleware } from "@workspace/auth/middleware";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
	return authMiddleware(request);
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
