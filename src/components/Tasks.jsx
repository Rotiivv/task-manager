import Button from "./Button";
import TaskItem from "./TaskItem";

import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import MorningIcon from "../assets/icons/sun.svg?react";
import AfternoonIcon from "../assets/icons/cloud-sun.svg?react";
import NightIcon from "../assets/icons/moon.svg?react";
import TasksSeparator from "./TasksSeparator";

import { useState } from "react";
import TASKS from "./contants/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);

  const morningTasks = tasks.filter((task) => {
    return task.time === "morning";
  });

  const afternoonTasks = tasks.filter((task) => {
    return task.time === "afternoon";
  });

  const moonTasks = tasks.filter((task) => {
    return task.time === "moon";
  });

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    console.log("cliquei");
  };

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === "not_started") {
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        return { ...task, status: "done" };
      }

      if (task.status === "done") {
        return { ...task, status: "not_started" };
      }

      return task;
    });
    setTasks(newTasks);
  };

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
          <TasksSeparator text="Manha" icon={<MorningIcon />} />

          {morningTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheckboxClick={handleTaskCheckboxClick}
                handleTaskDeleteClick={handleTaskDeleteClick}
              />
            );
          })}
        </div>

        <div className="space-y-3 my-6">
          <TasksSeparator text="Tarde" icon={<AfternoonIcon />} />

          {afternoonTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheckboxClick={handleTaskCheckboxClick}
                handleTaskDeleteClick={handleTaskDeleteClick}
              />
            );
          })}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<NightIcon />} />

          {moonTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheckboxClick={handleTaskCheckboxClick}
                handleTaskDeleteClick={handleTaskDeleteClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
