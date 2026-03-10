import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { getTask, getTasks } from "../services";

export const taskListQueryOptions = queryOptions({
	queryKey: queryKeys.tasks.all,
	queryFn: getTasks,
});

export function taskDetailQueryOptions(id: string) {
	return queryOptions({
		queryKey: queryKeys.tasks.detail(id),
		queryFn: () => getTask(id),
		enabled: !!id,
	});
}
