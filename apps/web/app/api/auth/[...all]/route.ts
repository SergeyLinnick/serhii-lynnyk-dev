import { auth, toNextJsHandler } from "@workspace/auth/server";

export const { GET, POST } = toNextJsHandler(auth);
