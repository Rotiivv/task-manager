import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { ChevronRightIcon, TrashIcon } from "../assets/icons";
import { ArrowIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      const task = await response.json();

      setTask(task);
    };

    fetchTasks();
  }, [taskId]);

  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="px-8 py-16 w-full space-y-6">
        {/* top bar */}
        <div className="flex justify-between w-full">
          {/* left side */}
          <div className="">
            <Link
              className="flex justify-center items-center rounded-full bg-[#00ADB5] h-8 w-8 mb-2 cursor-pointer"
              to={"/"}
            >
              <ArrowIcon />
            </Link>

            <div className="flex items-center text-xs gap-1">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Minha tarefas
              </span>
              <ChevronRightIcon className="text-gray-500" />
              <span className="font-semibold text-[#00ADB5]">
                {task?.title}
              </span>
            </div>

            <h1 className="font-semibold text-xl mt-1">{task?.title}</h1>
          </div>
          <Button color="danger" className=" self-end">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="rounded-xl bg-white space-y-6 p-6">
          <Input
            defaultValue={task?.title}
            label="Titulo"
            placeholder="Titulo da tarefa..."
          />
          <TimeSelect defaultValue={task?.time} />
          <Input
            defaultValue={task?.description}
            label="Descricao"
            placeholder="Descricao da tarefa..."
          />

          <div className="flex justify-end gap-3   w-full">
            <Button className="w-fit" color="secondary" size="large">
              Cancelar
            </Button>
            <Button className="w-fit" size="large">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
