import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskFormType } from "@workspace/models";
import { toast } from "@workspace/ui";
import { queryKeys } from "../../_common/query-keys";
import { mapTaskToApi } from "../mappers";
import { createTask } from "../services";

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (form: TaskFormType) => createTask(mapTaskToApi(form)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
			toast.success("Task created successfully");
		},
	});
}
