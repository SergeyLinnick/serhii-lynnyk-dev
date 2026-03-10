import { useQuery } from "@tanstack/react-query";
import { mapTaskViewFromApi } from "../mappers";
import { taskDetailQueryOptions } from "./task-query-options";

export function useGetTask(id: string) {
	return useQuery({
		...taskDetailQueryOptions(id),
		select: mapTaskViewFromApi,
	});
}
