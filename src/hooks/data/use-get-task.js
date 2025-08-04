import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQuerykeys } from "../../keys/queries";

export const useGetTask = (taskId, reset) => {
  return useQuery({
    queryKey: taskQuerykeys.getOne(taskId),
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
