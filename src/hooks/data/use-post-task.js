import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export const usePostTask = (sizeTasks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "addTask",
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
      queryClient.setQueryData("tasks", (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};
