import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "updateTask",
    mutationFn: async (task) => {
      const response = await api.patch(`/tasks/${taskId}`, {
        title: task.title.trim(),
        description: task.description.trim(),
        time: task.time.trim(),
      });

      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["task", taskId], () => {
        return response;
      });

      queryClient.setQueryData("tasks", (currentTasks) => {
        currentTasks.map((currentTask) => {
          if (currentTask.id !== response.id) return currentTask;
          return response;
        });
      });
    },
  });
};
