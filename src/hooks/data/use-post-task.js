import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQuerykeys } from "../../keys/queries";
import { taskMutationKeys } from "../../keys/mutations";

export const usePostTask = (sizeTasks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.post(),
    mutationFn: async (newTask) => {
      const { data: task } = await api.post("/tasks", newTask);

      const createdTask = {
        ...task,
        id: `${sizeTasks + 1}`,
        status: "not_started",
      };

      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQuerykeys.getAll(), (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};
