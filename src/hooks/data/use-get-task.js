import { useQuery } from "@tanstack/react-query";

export const useGetTask = (taskId, reset) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      const task = await response.json();

      const { description, title, time } = task;

      reset({
        title,
        description,
        time,
      });

      return task;
    },
  });
};
