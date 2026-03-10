"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useGetTasks } from "@workspace/api";
import type { TaskViewType } from "@workspace/models";
import { PAGE_URLS } from "@workspace/models";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@workspace/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { taskColumns } from "./blocks/task-columns";

export function TasksListView() {
	const { data: tasks, isLoading } = useGetTasks();

	const table = useReactTable<TaskViewType>({
		data: tasks ?? [],
		columns: taskColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Tasks</h1>
				<Button asChild>
					<Link href={PAGE_URLS.TASK_CREATE}>
						<Plus className="h-4 w-4" />
						Create Task
					</Link>
				</Button>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>All Tasks</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									{table.getHeaderGroups().map(headerGroup => (
										<tr key={headerGroup.id} className="border-b">
											{headerGroup.headers.map(header => (
												<th
													key={header.id}
													className="px-4 py-3 text-left font-medium text-muted-foreground"
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody>
									{table.getRowModel().rows.length === 0 ? (
										<tr>
											<td
												colSpan={taskColumns.length}
												className="px-4 py-8 text-center text-muted-foreground"
											>
												No tasks found. Create your first task.
											</td>
										</tr>
									) : (
										table.getRowModel().rows.map(row => (
											<tr key={row.id} className="border-b transition-colors hover:bg-muted/50">
												{row.getVisibleCells().map(cell => (
													<td key={cell.id} className="px-4 py-3">
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</td>
												))}
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
