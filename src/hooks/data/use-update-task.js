import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQuerykeys } from "../../keys/queries";
import { taskMutationKeys } from "../../keys/mutations";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (task) => {
      await api.patch(`/tasks/${taskId}`, {
        title: task?.title?.trim(),
        description: task?.description?.trim(),
        time: task?.time,
        status: task?.status,
      });

      return task;
    },
    onSuccess: (task) => {
      queryClient.setQueryData(taskQuerykeys.getOne(taskId), () => {
        return task;
      });

      queryClient.setQueryData(taskQuerykeys.getAll(), (currentTasks) => {
        return currentTasks.map((currentTask) => {
          if (currentTask.id !== task.id) {
            return currentTask;
          }
          return task;
        });
      });
    },
  });
};
