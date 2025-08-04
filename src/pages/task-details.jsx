import { useParams, Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { ChevronRightIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { ArrowIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useGetTask } from "../hooks/data/use-get-task";
import { useUpdateTask } from "../hooks/data/use-update-task";
import { useDeleteTask } from "../hooks/data/use-delete-task";

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: task } = useGetTask(taskId, reset);

  const { mutate: updateTask, isPending: isPendingUpdate } =
    useUpdateTask(taskId);

  const { mutate: deleteTask, isPending: isPendingDelete } =
    useDeleteTask(taskId);

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => toast.success("tarefa atualizada com sucesso"),
      onError: (error) => toast.error(error.message),
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa excluida com sucesso");
        navigate(-1);
      },
      onError: (error) => toast.error(error.message),
    });
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
            disabled={isPendingDelete}
            onClick={handleDeleteClick}
            color="danger"
            className=" self-end"
          >
            {!isPendingDelete ? (
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
            disabled={isPendingDelete || isPendingUpdate}
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
            disabled={isPendingDelete || isPendingUpdate}
            {...register("time", { required: "O horario e obrigatorio" })}
          />
          <Input
            disabled={isPendingDelete || isPendingUpdate}
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
              disabled={isPendingUpdate}
              type="submit"
              className="w-fit"
              size="large"
            >
              {" "}
              {isPendingUpdate && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
