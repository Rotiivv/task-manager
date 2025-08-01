import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { ChevronRightIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { ArrowIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { createLogger } from "vite";

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      const task = await response.json();

      setTask(task);
    };

    fetchTasks();
  }, [taskId]);

  const handleSaveClick = async (data) => {
    setIsLoading(true);
    console.log(data);

    const title = data.title;
    const description = data.description;
    const time = data.time;

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      setIsLoading(false);
      return toast.error("Error Atualizar tarefa. Por favor, tente novamente");
    }

    const task = await response.json();
    setTask(task);
    setIsLoading(false);
    toast.success("Tarefa atualizada com sucesso");
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setIsLoading(false);
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente"
      );
    }
    toast.success("Tarefa deletada com sucesso");
    setIsLoading(false);
    navigate(-1);
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
          <Button
            disabled={isLoading}
            onClick={handleDeleteClick}
            color="danger"
            className=" self-end"
          >
            {!isLoading ? (
              <TrashIcon />
            ) : (
              <LoaderIcon className="animate-spin" />
            )}
            Deletar tarefa
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(handleSaveClick)}
          className="rounded-xl bg-white space-y-6 p-6"
        >
          <Input
            defaultValue={task?.title}
            label="Titulo"
            placeholder="Titulo da tarefa..."
            errorMessage={errors?.title}
            {...register("title", { required: "O titulo e obrigatorio" })}
          />
          <TimeSelect
            defaultValue={task?.time}
            {...register("time", { required: "O horario e obrigatorio" })}
          />
          <Input
            defaultValue={task?.description}
            label="Descricao"
            placeholder="Descricao da tarefa..."
            errorMessage={errors?.description?.message}
            {...register("Description", {
              required: "A descricao e obrigatoria",
            })}
          />

          <div className="flex justify-end gap-3   w-full">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-fit"
              size="large"
            >
              {" "}
              {isLoading && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
