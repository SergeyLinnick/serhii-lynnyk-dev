import { ERROR_CODES } from "../errors";

export const ERROR_MESSAGES: Record<ERROR_CODES, string> = {
	[ERROR_CODES.UNKNOWN]: "An unexpected error occurred. Please try again.",
	[ERROR_CODES.UNAUTHORIZED]: "You must be logged in to perform this action.",
	[ERROR_CODES.FORBIDDEN]: "You do not have permission to perform this action.",
	[ERROR_CODES.NOT_FOUND]: "The requested resource was not found.",
	[ERROR_CODES.VALIDATION]: "Please check your input and try again.",
	[ERROR_CODES.NETWORK]: "Unable to connect. Please check your internet connection.",
	[ERROR_CODES.TIMEOUT]: "The request timed out. Please try again.",
	[ERROR_CODES.SERVER]: "A server error occurred. Please try again later.",
};
