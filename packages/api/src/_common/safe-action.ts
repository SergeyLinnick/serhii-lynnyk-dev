import * as Sentry from "@sentry/nextjs";
import { ApplicationError, ERROR_CODES } from "@workspace/models";
import { type z, flattenError } from "zod";

export function safeAction<TSchema extends z.ZodType, TResult>(
	schema: TSchema,
	handler: (data: z.infer<TSchema>) => Promise<TResult>,
) {
	return async (raw: unknown): Promise<TResult> => {
		const result = schema.safeParse(raw);
		if (!result.success) {
			const fieldErrors = flattenError(result.error).fieldErrors;
			Sentry.captureException(new Error(`Contract violation in ${handler.name || "action"}`), {
				tags: { category: "validation" },
				extra: { fieldErrors },
				level: "warning",
			});
			throw new ApplicationError(ERROR_CODES.VALIDATION, "Validation failed", { fieldErrors });
		}
		return handler(result.data);
	};
}
