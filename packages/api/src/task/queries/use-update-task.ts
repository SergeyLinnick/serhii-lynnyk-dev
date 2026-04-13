import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskUpdateType } from "@workspace/models";
import { toast } from "@workspace/ui";
import { queryKeys } from "../../_common/query-keys";
import { updateTaskAction } from "../actions";

export function useUpdateTask(id: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TaskUpdateType) => updateTaskAction({ id, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
			queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(id) });
			toast.success("Task updated successfully");
		},
	});
}
