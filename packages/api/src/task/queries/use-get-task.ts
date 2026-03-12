import { useQuery } from "@tanstack/react-query";
import type { TaskViewType } from "@workspace/models";
import { taskDetailQueryOptions } from "./task-query-options";

export function useGetTask(id: string, initialData?: TaskViewType | null) {
	return useQuery({
		...taskDetailQueryOptions(id),
		initialData: initialData ?? undefined,
	});
}
