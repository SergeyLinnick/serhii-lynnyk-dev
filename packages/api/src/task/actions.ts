"use server";

import { db } from "@workspace/db";
import { task } from "@workspace/db/schema";
import { TaskFormSchema, TaskUpdateSchema } from "@workspace/models";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getAuthenticatedSession } from "../_common/auth";
import { safeAction } from "../_common/safe-action";

export async function getTasksAction() {
	const session = await getAuthenticatedSession();
	return db.select().from(task).where(eq(task.userId, session.user.id)).orderBy(task.createdAt);
}

export async function getTaskAction(id: string) {
	const session = await getAuthenticatedSession();
	const [result] = await db
		.select()
		.from(task)
		.where(and(eq(task.id, id), eq(task.userId, session.user.id)));
	return result ?? null;
}

export const createTaskAction = safeAction(TaskFormSchema, async data => {
	const session = await getAuthenticatedSession();
	const [result] = await db
		.insert(task)
		.values({ ...data, userId: session.user.id })
		.returning();
	return result;
});

const UpdateTaskPayloadSchema = z.object({
	id: z.string().uuid(),
	data: TaskUpdateSchema,
});

export const updateTaskAction = safeAction(UpdateTaskPayloadSchema, async payload => {
	const session = await getAuthenticatedSession();
	const [result] = await db
		.update(task)
		.set({ ...payload.data, updatedAt: new Date() })
		.where(and(eq(task.id, payload.id), eq(task.userId, session.user.id)))
		.returning();
	return result;
});

export async function deleteTaskAction(id: string) {
	const session = await getAuthenticatedSession();
	await db.delete(task).where(and(eq(task.id, id), eq(task.userId, session.user.id)));
}
