export const taskMutationKeys = {
  delete: (taskId) => ["delete-task", taskId],
  post: () => ["post-task"],
  update: (taskId) => ["update-task", taskId],
};
