import CheckIcon from "../assets/icons/check.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import DetailIcon from "../assets/icons/details.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import Button from "./Button";

const TaskItem = ({ task, handleTaskCheckboxClick, handleTaskDeleteClick }) => {
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
          variant="secundary"
          onClick={() => handleTaskDeleteClick(task.id)}
        >
          <TrashIcon />
        </Button>

        <a href="#" className="hover:opacity-75 transition">
          <DetailIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
