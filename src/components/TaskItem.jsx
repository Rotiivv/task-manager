import { toast } from "sonner";
import { CheckIcon, LoaderIcon, DetailIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import { useState } from "react";

const TaskItem = ({ task, handleTaskCheckboxClick, onDeleteSuccess }) => {
  const getStatusClass = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5] text-[#00ADB5]";
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04] text-[#FFAA04]";
    }

    if (task.status === "not_started") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]";
    }
  };

  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente"
      );
    }
    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg flex justify-between gap-2 items-center text-sm bg-opacity-10 transition-all ${getStatusClass()}`}
    >
      <div className="flex items-center gap-2 ">
        <label
          htmlFor={`checkbox${task.id}`}
          className={`w-7 h-7 cursor-pointer flex items-center justify-center rounded-lg ${getStatusClass()}`}
        >
          <input
            type="checkbox"
            id={`checkbox${task.id}`}
            className="hidden"
            onClick={() => handleTaskCheckboxClick(task.id)}
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="text-white animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center">
        <Button
          disabled={deleteIsLoading}
          color="secondary"
          onClick={() => handleDeleteClick()}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-gray-500" />
          ) : (
            <TrashIcon />
          )}
        </Button>

        <a href="#" className="hover:opacity-75 transition">
          <DetailIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
