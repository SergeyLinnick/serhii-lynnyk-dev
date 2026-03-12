import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@workspace/ui";
import { queryKeys } from "../../_common/query-keys";
import { deleteTaskAction } from "../actions";

export function useDeleteTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteTaskAction(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
			toast.success("Task deleted successfully");
		},
	});
}
