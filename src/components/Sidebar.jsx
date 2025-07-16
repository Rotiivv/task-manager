import SidebarButton from "./SidebarButton";

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
        <SidebarButton variant="unselected">Inicio</SidebarButton>
        <SidebarButton variant="selected">Minhas Tarefas</SidebarButton>
        {/* <a href="" className="text-[#00ADB5] bg-[#e6f7f8] px-6 py-2 rounded-lg">
          Minhas Tarefas
        </a> */}
      </div>
    </div>
  );
};

export default Sidebar;
