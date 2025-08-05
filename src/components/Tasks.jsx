import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

import { MorningIcon, AfternoonIcon, NightIcon } from "../assets/icons";

import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => {
    return task.time === "morning";
  });

  const afternoonTasks = tasks?.filter((task) => {
    return task.time === "afternoon";
  });

  const moonTasks = tasks?.filter((task) => {
    return task.time === "moon";
  });

  return (
    <div className="py-16 px-8 w-screen">
      <Header
        sizeTasks={tasks?.length}
        title="Minhas tarefas"
        subtitle="Minhas tarefas"
      />

      <div className="bg-white rounded-xl p-6 mt-10">
        <div className="space-y-3">
          <TasksSeparator text="Manha" icon={<MorningIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-gray-400 pl-6">
              Nenhuma tarefa cadastrada para o periodo da manha
            </p>
          )}

          {morningTasks?.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </div>

        <div className="space-y-3 my-6">
          <TasksSeparator text="Tarde" icon={<AfternoonIcon />} />

          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-gray-400 pl-6">
              Nenhuma tarefa cadastrada para o periodo da tarde
            </p>
          )}
          {afternoonTasks?.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<NightIcon />} />

          {moonTasks?.length === 0 && (
            <p className="text-sm text-gray-400 pl-6">
              Nenhuma tarefa cadastrada para o periodo da noite
            </p>
          )}
          {moonTasks?.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
