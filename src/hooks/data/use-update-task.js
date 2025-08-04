import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "updateTask",
    mutationFn: async (task) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: task.title.trim(),
          description: task.description.trim(),
          time: task.time.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Nao foi possivel atualizar a tarefa. Por favor, tente novamente"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["task", taskId], () => {
        return data;
      });

      queryClient.setQueryData("tasks", (currentTasks) => {
        currentTasks.map((currentTask) => {
          if (currentTask.id !== data.id) return currentTask;
          return data;
        });
      });
    },
  });
};
