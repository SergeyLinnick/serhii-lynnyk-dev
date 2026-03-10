import { format } from "date-fns";

export function formatDate(date: Date | string, pattern: string = "MMM d, yyyy"): string {
	return format(typeof date === "string" ? new Date(date) : date, pattern);
}
