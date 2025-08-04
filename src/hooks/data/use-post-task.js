import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostTask = (sizeTasks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "addTask",
    mutationFn: async (newTask) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      const createdTask = {
        ...(await response.json()),
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
