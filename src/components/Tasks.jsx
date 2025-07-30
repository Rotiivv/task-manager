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

import { useEffect, useState } from "react";
import { toast } from "sonner";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [saveTaskIsLoading, setSaveTaskIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");

      const tasks = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => {
    return task.time === "morning";
  });

  const afternoonTasks = tasks.filter((task) => {
    return task.time === "afternoon";
  });

  const moonTasks = tasks.filter((task) => {
    return task.time === "moon";
  });

  const handleAddTask = async (newTask) => {
    setSaveTaskIsLoading(true);

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      setSaveTaskIsLoading(false);
      return toast.error(
        "Erro ao adicionar tarefa. Por favor, tente novamente"
      );
    }

    handleDialogClose();
    setTimeout(() => {
      setSaveTaskIsLoading(false);
    }, 500);

    setTasks([...tasks, newTask]);
    toast.success("Tarefa adicionada");
  };

  const onDeleteSuccess = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);

    toast.success(`tarefa deletada com sucesso`);
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
            handleAddTask={handleAddTask}
            sizeTasks={tasks.length}
            saveTaskIsLoading={saveTaskIsLoading}
          />
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
                onDeleteSuccess={onDeleteSuccess}
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
                onDeleteSuccess={onDeleteSuccess}
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
                onDeleteSuccess={onDeleteSuccess}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
