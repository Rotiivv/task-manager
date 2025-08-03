import Button from "./Button";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";
import AddTaskDialog from "./AddTaskDialog";

import {
  AddIcon,
  TrashIcon,
  MorningIcon,
  AfternoonIcon,
  NightIcon,
} from "../assets/icons";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Tasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery({
    queryKey: "tasks",
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks");

      const tasks = await response.json();

      return tasks;
    },
  });

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => {
    return task.time === "morning";
  });

  const afternoonTasks = tasks?.filter((task) => {
    return task.time === "afternoon";
  });

  const moonTasks = tasks?.filter((task) => {
    return task.time === "moon";
  });

 

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

    queryClient.setQueryData("tasks", newTasks);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
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
          <Button color="secondary">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setDialogIsOpen(true)}>
            Adicionar Tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            handleClose={handleDialogClose}
            isOpen={dialogIsOpen}
            sizeTasks={tasks?.length}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mt-10">
        <div className="space-y-3">
          <TasksSeparator text="Manha" icon={<MorningIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-gray-400 pl-6">
              Nenhuma tarefa cadastrada para o periodo da manha
            </p>
          )}

          {morningTasks?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheckboxClick={handleTaskCheckboxClick}
              />
            );
          })}
        </div>

        <div className="space-y-3 my-6">
          <TasksSeparator text="Tarde" icon={<AfternoonIcon />} />

          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-gray-400 pl-6">
              Nenhuma tarefa cadastrada para o periodo da tarde
            </p>
          )}
          {afternoonTasks?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheckboxClick={handleTaskCheckboxClick}
              />
            );
          })}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<NightIcon />} />

          {moonTasks?.length === 0 && (
            <p className="text-sm text-gray-400 pl-6">
              Nenhuma tarefa cadastrada para o periodo da noite
            </p>
          )}
          {moonTasks?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheckboxClick={handleTaskCheckboxClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
