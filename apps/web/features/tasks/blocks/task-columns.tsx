import type { ColumnDef } from "@tanstack/react-table";
import { PAGE_URLS, type TaskViewType } from "@workspace/models";
import { cn } from "@workspace/ui";
import { formatDate } from "@workspace/utils";
import { Eye } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; className: string }> = {
	todo: { label: "To Do", className: "bg-muted text-muted-foreground" },
	in_progress: { label: "In Progress", className: "bg-blue-100 text-blue-800" },
	done: { label: "Done", className: "bg-green-100 text-green-800" },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
	low: { label: "Low", className: "bg-muted text-muted-foreground" },
	medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800" },
	high: { label: "High", className: "bg-red-100 text-red-800" },
};

export const taskColumns: ColumnDef<TaskViewType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const config = statusConfig[status];
			return (
				<span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", config?.className)}>
					{config?.label ?? status}
				</span>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.getValue("priority") as string;
			const config = priorityConfig[priority];
			return (
				<span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", config?.className)}>
					{config?.label ?? priority}
				</span>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("createdAt")),
	},
	{
		id: "actions",
		header: "",
		cell: ({ row }) => (
			<Link
				href={PAGE_URLS.TASK_DETAIL(row.original.id)}
				className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<Eye className="h-4 w-4" />
				View
			</Link>
		),
	},
];
