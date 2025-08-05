import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  const notStartedTasks = tasks?.filter((task) => {
    return task.status === "not_started";
  });
  const inProgressTasks = tasks?.filter((task) => {
    return task.status === "in_progress";
  });
  const completedTasks = tasks?.filter((task) => {
    return task.status === "done";
  });

  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="py-16 px-8 w-full space-y-8">
        <Header subtitle="Inicio" title="Inicio" sizeTasks={tasks?.length} />

        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            subText="Tarefas Disponiveis"
          />
          <DashboardCard
            icon={<TasksIcon />}
            mainText={completedTasks?.length}
            subText="Tarefas Concluidas"
          />
          <DashboardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks?.length}
            subText="Tarefas Andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText={notStartedTasks?.length}
            subText="Tarefas nao comecadas"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 space-y-6 bg-white rounded-lg">
            <div>
              <h3 className="text-[#35383E] font-semibold text-xl">Tarefas</h3>
              <span className="text-[#9A9C9F] text-sm">
                Resumo das tarefas disponiveis
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {tasks?.map((task) => (
                <TaskItem task={task} key={task.id} />
              ))}

              {tasks?.length === 0 && (
                <p className="text-[#9A9C9F] text-lg">
                  Voce nao possui nenhuma tarefa disponivel no momento
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center bg-white rounded-lg">
            <span className="text-[#9A9C9F] text-lg">
              Nada aqui por enquanto
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
