import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQuerykeys } from "../../keys/queries";
import { taskMutationKeys } from "../../keys/mutations";

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId), // unique indentifier
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);

      return deletedTask;
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQuerykeys.getAll(), (currentTasks) => {
        return currentTasks.filter((currentTask) => currentTask.id !== taskId);
      });
    },
  });
};
