"use client";

import { useDeleteTask, useGetTask } from "@workspace/api";
import { PAGE_URLS, type TaskViewType } from "@workspace/models/client";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@workspace/ui";
import { formatDate } from "@workspace/utils";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ViewTaskViewProps {
	id: string;
	initialData?: TaskViewType | null;
}

export function ViewTaskView({ id, initialData }: ViewTaskViewProps) {
	const router = useRouter();
	const { data: task, isLoading } = useGetTask(id, initialData);
	const deleteTask = useDeleteTask();

	function handleDelete() {
		if (!confirm("Are you sure you want to delete this task?")) return;
		deleteTask.mutate(id, {
			onSuccess: () => {
				router.push(PAGE_URLS.TASKS);
			},
		});
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
			</div>
		);
	}

	if (!task) {
		return <p className="text-muted-foreground">Task not found.</p>;
	}

	const statusLabel: Record<string, string> = {
		todo: "To Do",
		in_progress: "In Progress",
		done: "Done",
		cancelled: "Cancelled",
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon" asChild>
					<Link href={PAGE_URLS.TASKS}>
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<h1 className="text-3xl font-bold">{task.title}</h1>
			</div>
			<Card className="max-w-2xl">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Task Details</CardTitle>
					<Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleteTask.isPending}>
						<Trash2 className="h-4 w-4" />
						Delete
					</Button>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Status</p>
							<p>{statusLabel[task.status] ?? task.status}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Created</p>
							<p>{formatDate(task.createdAt)}</p>
						</div>
						{task.updatedAt && (
							<div>
								<p className="text-sm font-medium text-muted-foreground">Updated</p>
								<p>{formatDate(task.updatedAt)}</p>
							</div>
						)}
					</div>
					{task.description && (
						<div>
							<p className="text-sm font-medium text-muted-foreground">Description</p>
							<p className="mt-1">{task.description}</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
