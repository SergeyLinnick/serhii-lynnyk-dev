import { ViewTaskView } from "@/features/tasks";

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return <ViewTaskView id={id} />;
}
