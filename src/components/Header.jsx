import { useState } from "react";
import { AddIcon, TrashIcon } from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

const Header = ({ sizeTasks, title, subtitle }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div>
        <span className="text-[#00ADB5] text-xs font-semibold">{subtitle}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex gap-3 items-center">
        <Button color="secondary">
          Limpar Tarefas
          <TrashIcon />
        </Button>

        <Button onClick={() => setDialogIsOpen(true)}>
          Adicionar Tarefa
          <AddIcon />
        </Button>

        <AddTaskDialog
          handleClose={() => setDialogIsOpen(false)}
          isOpen={dialogIsOpen}
          sizeTasks={sizeTasks}
        />
      </div>
    </div>
  );
};

export default Header;
