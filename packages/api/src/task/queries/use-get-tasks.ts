import { useQuery } from "@tanstack/react-query";
import { mapTaskViewFromApi } from "../mappers";
import { taskListQueryOptions } from "./task-query-options";

export function useGetTasks() {
	return useQuery({
		...taskListQueryOptions,
		select: data => data.map(mapTaskViewFromApi),
	});
}
