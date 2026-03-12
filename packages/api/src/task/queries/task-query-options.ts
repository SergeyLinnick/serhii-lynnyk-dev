import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { getTaskAction, getTasksAction } from "../actions";

export const taskListQueryOptions = queryOptions({
	queryKey: queryKeys.tasks.list(),
	queryFn: getTasksAction,
});

export function taskDetailQueryOptions(id: string) {
	return queryOptions({
		queryKey: queryKeys.tasks.detail(id),
		queryFn: () => getTaskAction(id),
		enabled: !!id,
	});
}
