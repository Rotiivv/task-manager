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

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [task, setTask] = useState();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

      const task = await response.json();

      setTask(task);
      reset(task);
    };

    fetchTasks();
  }, [taskId, reset]);

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time.trim(),
      }),
    });

    if (!response.ok) {
      return toast.error("Error Atualizar tarefa. Por favor, tente novamente");
    }

    const task = await response.json();
    setTask(task);
    toast.success("Tarefa atualizada com sucesso");
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return toast.error(
        "Erro ao deletar a tarefa. Por favor, tente novamente"
      );
    }
    toast.success("Tarefa deletada com sucesso");
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
              className="flex justify-center items-center rounded-full bg-[#00ADB5] h-8 w-8 mb-2 cursor-pointer hover:opacity-75 transition"
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
            disabled={isSubmitting}
            onClick={handleDeleteClick}
            color="danger"
            className=" self-end"
          >
            {!isSubmitting ? (
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
            label="Titulo"
            placeholder="Titulo da tarefa..."
            errorMessage={errors?.title?.message}
            {...register("title", {
              required: "O titulo e obrigatorio",
              validate: (value) => {
                const trimValue = value.trim();
                return (
                  trimValue.length > 0 || "O titulo nao pode ficar em branco"
                );
              },
            })}
          />
          <TimeSelect
            {...register("time", { required: "O horario e obrigatorio" })}
          />
          <Input
            label="Descricao"
            placeholder="Descricao da tarefa..."
            errorMessage={errors?.description?.message}
            {...register("description", {
              required: "A descricao e obrigatoria",
              validate: (value) => {
                if (!value.trim())
                  return "A descricao nao pode ficar em branco";

                return true;
              },
            })}
          />

          <div className="flex justify-end gap-3   w-full">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-fit"
              size="large"
            >
              {" "}
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
