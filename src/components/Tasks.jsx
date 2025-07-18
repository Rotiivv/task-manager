import Button from "./Button";

import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import MorningIcon from "../assets/icons/sun.svg?react";
import AfternoonIcon from "../assets/icons/cloud-sun.svg?react";
import NightIcon from "../assets/icons/moon.svg?react";

const Tasks = () => {
  return (
    <div className="py-16 px-8 w-screen">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[#00ADB5] text-xs font-semibold">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex gap-3 items-center">
          <Button variant="secundary">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button>
            Adicionar Tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mt-10">
        <div className="space-y-3">
          <div className="flex gap-2 items-center border-b border-solid border-[#f4f4f5] pb-2">
            <MorningIcon />
            <p className="text-[#9a9c9f] text-sm">Manha</p>
          </div>
        </div>

        <div className="space-y-3 my-6">
          <div className="flex gap-2 items-center border-b border-solid border-[#f4f4f5] pb-2">
            <AfternoonIcon />
            <p className="text-[#9a9c9f] text-sm">Tarde</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2 items-center border-b border-solid border-[#f4f4f5] pb-2">
            <NightIcon />
            <p className="text-[#9a9c9f] text-sm">Noite</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
