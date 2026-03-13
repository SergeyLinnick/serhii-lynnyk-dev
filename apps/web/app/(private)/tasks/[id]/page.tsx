import { ViewTaskView } from "@/features/tasks";
import { getTaskAction } from "@workspace/api";

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const task = await getTaskAction(id);
	return <ViewTaskView id={id} initialData={task} />;
}
