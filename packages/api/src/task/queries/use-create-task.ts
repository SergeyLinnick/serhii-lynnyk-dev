import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskFormType } from "@workspace/models";
import { toast } from "@workspace/ui";
import { queryKeys } from "../../_common/query-keys";
import { createTaskAction } from "../actions";

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TaskFormType) => createTaskAction(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
			toast.success("Task created successfully");
		},
	});
}
