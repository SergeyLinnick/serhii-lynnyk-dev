import type { ZodIssue } from "zod";

export function customErrorMap(issue: ZodIssue): string {
	switch (issue.code) {
		case "too_small":
			if ("minimum" in issue && issue.minimum === 1) {
				return "This field is required";
			}
			return "minimum" in issue ? `Must be at least ${issue.minimum} characters` : "Value is too small";
		case "too_big":
			return "maximum" in issue ? `Must be at most ${issue.maximum} characters` : "Value is too large";
		case "invalid_type":
			return "This field is required";
		default:
			return issue.message ?? "Invalid value";
	}
}
