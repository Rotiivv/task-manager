import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export const useGetTask = (taskId, reset) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`);

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
