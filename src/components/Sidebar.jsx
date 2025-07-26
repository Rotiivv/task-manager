import SidebarButton from "./SidebarButton";
import HomeIcon from "../assets/icons/home.svg?react";
import TasksIcon from "../assets/icons/tasks.svg?react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-[#00ADB5] text-xl font-semibold mb-4">
          Task Manager
        </h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col p-2 gap-2">
        <SidebarButton mode="unselected">
          <HomeIcon />
          Inicio
        </SidebarButton>

        <SidebarButton mode="selected">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
