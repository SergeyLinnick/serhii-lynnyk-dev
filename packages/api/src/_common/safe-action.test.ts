import * as Sentry from "@sentry/nextjs";
import { ApplicationError, ERROR_CODES } from "@workspace/models";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { safeAction } from "./safe-action";

vi.mock("@sentry/nextjs", () => ({
	captureException: vi.fn(),
}));

const DummySchema = z.object({
	username: z.string().min(3),
	age: z.number(),
});

describe("safeAction", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should execute handler and return result when data is valid", async () => {
		const mockHandler = vi.fn().mockResolvedValue("Success!");
		const action = safeAction(DummySchema, mockHandler);

		const result = await action({ username: "Alice", age: 30 });

		expect(result).toBe("Success!");
		expect(mockHandler).toHaveBeenCalledOnce();
		expect(mockHandler).toHaveBeenCalledWith({ username: "Alice", age: 30 });
		expect(Sentry.captureException).not.toHaveBeenCalled();
	});

	it("should throw ApplicationError and call Sentry when data is invalid", async () => {
		const mockHandler = vi.fn();
		const action = safeAction(DummySchema, mockHandler);

		await expect(action({ username: "Al", age: "thirty" })).rejects.toThrow(ApplicationError);

		try {
			await action({ username: "Al", age: "thirty" });
		} catch (error) {
			expect(error).toBeInstanceOf(ApplicationError);
			const appError = error as ApplicationError;
			expect(appError.code).toBe(ERROR_CODES.VALIDATION);
			expect(appError.message).toBe("Validation failed");
			expect(appError.details).toHaveProperty("fieldErrors");
		}

		expect(mockHandler).not.toHaveBeenCalled();
		expect(Sentry.captureException).toHaveBeenCalledWith(
			expect.any(Error),
			expect.objectContaining({
				level: "warning",
				tags: { category: "validation" },
				extra: expect.objectContaining({
					fieldErrors: expect.any(Object),
				}),
			}),
		);
	});

	it("should strip unknown fields before passing to handler", async () => {
		const mockHandler = vi.fn().mockResolvedValue("ok");
		const action = safeAction(DummySchema, mockHandler);

		await action({ username: "Bob", age: 25, isAdmin: true });

		expect(mockHandler).toHaveBeenCalledWith({
			username: "Bob",
			age: 25,
		});
	});
});
