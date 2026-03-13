"use server";

import { auth } from "@workspace/auth/server";
import { headers } from "next/headers";

export async function getAuthenticatedSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("Unauthorized");
	}

	return session;
}
