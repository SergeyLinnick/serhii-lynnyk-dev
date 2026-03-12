import { useQuery } from "@tanstack/react-query";
import type { TaskViewType } from "@workspace/models";
import { taskListQueryOptions } from "./task-query-options";

export function useGetTasks(initialData?: TaskViewType[]) {
	return useQuery({
		...taskListQueryOptions,
		initialData,
	});
}
