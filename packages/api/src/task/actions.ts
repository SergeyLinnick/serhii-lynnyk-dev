"use server";

import { db } from "@workspace/db";
import { task } from "@workspace/db/schema";
import type { TaskFormType } from "@workspace/models";
import { and, eq } from "drizzle-orm";
import { getAuthenticatedSession } from "../_common/auth";

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

export async function createTaskAction(data: TaskFormType) {
	const session = await getAuthenticatedSession();
	const [result] = await db
		.insert(task)
		.values({ ...data, userId: session.user.id })
		.returning();
	return result;
}

export async function updateTaskAction(id: string, data: Partial<TaskFormType>) {
	const session = await getAuthenticatedSession();
	const [result] = await db
		.update(task)
		.set({ ...data, updatedAt: new Date() })
		.where(and(eq(task.id, id), eq(task.userId, session.user.id)))
		.returning();
	return result;
}

export async function deleteTaskAction(id: string) {
	const session = await getAuthenticatedSession();
	await db.delete(task).where(and(eq(task.id, id), eq(task.userId, session.user.id)));
}
