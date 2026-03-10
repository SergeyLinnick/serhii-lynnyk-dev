export enum ERROR_CODES {
	UNKNOWN = "UNKNOWN",
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	NOT_FOUND = "NOT_FOUND",
	VALIDATION = "VALIDATION",
	NETWORK = "NETWORK",
	TIMEOUT = "TIMEOUT",
	SERVER = "SERVER",
}

export type AppError = {
	code: ERROR_CODES;
	message: string;
	details?: Record<string, unknown>;
};

export class ApplicationError extends Error {
	public readonly code: ERROR_CODES;
	public readonly details?: Record<string, unknown>;

	constructor(code: ERROR_CODES, message: string, details?: Record<string, unknown>) {
		super(message);
		this.name = "ApplicationError";
		this.code = code;
		this.details = details;
	}
}

export class AuthenticationError extends Error {
	public readonly code = ERROR_CODES.UNAUTHORIZED;

	constructor(message: string = "Authentication required") {
		super(message);
		this.name = "AuthenticationError";
	}
}

export function createAppError(
	code: ERROR_CODES,
	message: string,
	details?: Record<string, unknown>,
): ApplicationError {
	return new ApplicationError(code, message, details);
}

export function isAppError(error: unknown): error is ApplicationError {
	return error instanceof ApplicationError;
}
