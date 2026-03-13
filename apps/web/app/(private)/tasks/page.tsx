import { TasksListView } from "@/features/tasks";
import { getTasksAction } from "@workspace/api";

export default async function TasksPage() {
	const tasks = await getTasksAction();
	return <TasksListView initialData={tasks} />;
}
