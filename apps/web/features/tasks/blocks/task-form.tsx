"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema, type TaskFormType } from "@workspace/models";
import { Button, Input, Label } from "@workspace/ui";
import { useForm } from "react-hook-form";

type TaskFormProps = {
	onSubmit: (data: TaskFormType) => void;
	defaultValues?: Partial<TaskFormType>;
	isSubmitting?: boolean;
};

export function TaskForm({ onSubmit, defaultValues, isSubmitting }: TaskFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormType>({
		resolver: zodResolver(TaskFormSchema),
		defaultValues: {
			title: "",
			description: "",
			status: "todo",
			...defaultValues,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="title">Title</Label>
				<Input
					id="title"
					placeholder="Task title"
					aria-invalid={!!errors.title || undefined}
					{...register("title")}
				/>
				{errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="description">Description</Label>
				<textarea
					id="description"
					className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
					placeholder="Task description (optional)"
					aria-invalid={!!errors.description || undefined}
					{...register("description")}
				/>
				{errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="status">Status</Label>
				<select
					id="status"
					className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-invalid:border-destructive"
					aria-invalid={!!errors.status || undefined}
					{...register("status")}
				>
					<option value="todo">To Do</option>
					<option value="in_progress">In Progress</option>
					<option value="done">Done</option>
					<option value="cancelled">Cancelled</option>
				</select>
				{errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
			</div>

			<Button type="submit" disabled={isSubmitting} className="self-start">
				{isSubmitting ? "Saving..." : "Save Task"}
			</Button>
		</form>
	);
}
