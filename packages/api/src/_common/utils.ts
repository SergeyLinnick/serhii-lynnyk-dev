export function buildSearchParams(params: Record<string, unknown>): URLSearchParams {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== null && value !== undefined) {
			searchParams.set(key, String(value));
		}
	}

	return searchParams;
}
