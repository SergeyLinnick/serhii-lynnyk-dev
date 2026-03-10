import { API_TIMEOUT_MS, ApplicationError, AuthenticationError, ERROR_CODES } from "@workspace/models";
import ky from "ky";

type CreateApiOptions = {
	prefixUrl: string;
	token?: string;
};

export function createApi({ prefixUrl, token }: CreateApiOptions) {
	return ky.create({
		prefixUrl,
		timeout: API_TIMEOUT_MS,
		hooks: {
			beforeRequest: [
				request => {
					if (token) {
						request.headers.set("Authorization", `Bearer ${token}`);
					}
				},
			],
			afterResponse: [
				async (_request, _options, response) => {
					if (response.status === 401) {
						throw new AuthenticationError();
					}

					if (!response.ok) {
						const body = await response.json().catch(() => ({}));
						const errorBody = body as { message?: string; code?: string };
						throw new ApplicationError(
							ERROR_CODES.SERVER,
							errorBody.message ?? `Request failed with status ${response.status}`,
							{ status: response.status, ...errorBody },
						);
					}
				},
			],
		},
	});
}
