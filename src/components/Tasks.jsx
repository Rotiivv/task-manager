import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";

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
    </div>
  );
};

export default Tasks;
