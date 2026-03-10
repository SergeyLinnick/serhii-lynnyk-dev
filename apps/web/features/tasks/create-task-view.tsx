"use client";

import { useCreateTask } from "@workspace/api";
import { PAGE_URLS, type TaskFormType } from "@workspace/models";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui";
import { useRouter } from "next/navigation";
import { TaskForm } from "./blocks/task-form";

export function CreateTaskView() {
	const router = useRouter();
	const createTask = useCreateTask();

	function handleSubmit(data: TaskFormType) {
		createTask.mutate(data, {
			onSuccess: () => {
				router.push(PAGE_URLS.TASKS);
			},
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Create Task</h1>
			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>New Task</CardTitle>
				</CardHeader>
				<CardContent>
					<TaskForm onSubmit={handleSubmit} isSubmitting={createTask.isPending} />
				</CardContent>
			</Card>
		</div>
	);
}
