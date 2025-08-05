import { toast } from "sonner";
import { CheckIcon, LoaderIcon, DetailIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useUpdateTask } from "../hooks/data/use-update-task";

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);

  const { mutate: updateTask } = useUpdateTask(task.id);

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

  const getNewStatus = () => {
    if (task.status === "not_started") return "in_progress";
    if (task.status === "in_progress") return "done";
    if (task.status === "done") return "not_started";

    return "not_sarted";
  };

  const handleCheckboxClick = () => {
    updateTask(
      { ...task, status: getNewStatus() },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso");
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa apaga com sucesso!");
      },
      onError: (error) => toast.error(error.message),
    });
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
            onClick={handleCheckboxClick}
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
          disabled={isPending}
          color="secondary"
          onClick={() => handleDeleteClick()}
        >
          {isPending ? (
            <LoaderIcon className="animate-spin text-gray-500" />
          ) : (
            <TrashIcon />
          )}
        </Button>

        <Link to={`/task/${task.id}`} className="hover:opacity-75 transition">
          <DetailIcon />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;
