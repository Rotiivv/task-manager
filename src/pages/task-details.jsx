import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { ChevronRightIcon, TrashIcon } from "../assets/icons";
import { ArrowIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import { toast } from "sonner";

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

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  const [errors, setErrors] = useState([]);

  const titleError = errors.find((error) => error.inputName === "title");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

  const handleSaveClick = async () => {
    const newErros = [];

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    if (!title.trim()) {
      newErros.push({
        inputName: "title",
        message: "O titulo e obrigatorio.",
      });
    }

    if (!description.trim()) {
      newErros.push({
        inputName: "description",
        message: "A descricao e obrigatoria.",
      });
    }

    if (newErros.length > 0) {
      setErrors(newErros);
      return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      return toast.error("Error Atualizar tarefa. Por favor, tente novamente");
    }

    const task = await response.json();
    setTask(task);
    toast.success("Tarefa atualizada com sucesso");
  };

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
              <Link
                to={"/"}
                className="text-gray-500 hover:underline cursor-pointer"
              >
                Minha tarefas
              </Link>
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
            errorMessage={titleError?.message}
            ref={titleRef}
          />
          <TimeSelect defaultValue={task?.time} ref={timeRef} />
          <Input
            defaultValue={task?.description}
            label="Descricao"
            placeholder="Descricao da tarefa..."
            errorMessage={descriptionError?.message}
            ref={descriptionRef}
          />

          <div className="flex justify-end gap-3   w-full">
            <Button onClick={handleSaveClick} className="w-fit" size="large">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
