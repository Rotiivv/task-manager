import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";

import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { LoaderIcon } from "../assets/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const AddTaskDialog = ({ isOpen, handleClose, sizeTasks }) => {
  const nodeRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationKey: "addTaks",
    mutationFn: async (newTask) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa");
      }
    },
  });

  const handleClearInputs = () => {
    reset({
      title: "",
      description: "",
      time: "morning",
    });
    handleClose();
  };

  const handleSaveClick = async (data) => {
    const task = { ...data, id: `${sizeTasks + 1}`, status: "not_started" };

    mutate(task, {
      onSuccess: () => {
        queryClient.setQueryData("tasks", (currentTasks) => {
          return [...currentTasks, task];
        });
        handleClearInputs();
        toast.success("Tarefa deletada com sucesso");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  // if (!isOpen) return null;
  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="w-screen flex justify-center items-center h-screen bg-black bg-opacity-40 fixed top-0 bottom-0 right-0"
          >
            <form
              onSubmit={handleSubmit(handleSaveClick)}
              className="rounded-xl bg-white p-5 text-center shadow-xl"
            >
              <h2 className="text-[#35383E] text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-[#9a9c9f] text-sm mb-1">
                Insira as informacoes abaixo
              </p>

              <div className="flex flex-col space-y-4 w-[336px] mt-4">
                <Input
                  label="Titulo"
                  placeholder="Insira o titulo da tarefa"
                  id="title"
                  errorMessage={errors?.title?.message}
                  disabled={isPending}
                  {...register("title", {
                    required: "O titulo e obrigatorio",
                    validate: (value) => {
                      const trimValue = value.trim();
                      return (
                        trimValue.length > 0 ||
                        "O campo titulo nao pode ficar em branco"
                      );
                    },
                  })}
                />

                <TimeSelect
                  disabled={isPending}
                  {...register("time", {
                    required: "O campo horario e obrigatorio",
                  })}
                />

                <Input
                  label="Descricao"
                  placeholder="Descreva a tarefa"
                  id="description"
                  errorMessage={errors?.description?.message}
                  disabled={isPending}
                  {...register("description", {
                    required: "O campo descricao e obrigatorio",
                    validate: (value) => {
                      const trimValue = value.trim();
                      return (
                        trimValue.length > 0 ||
                        "O campo descricao nao pode ficar em branco"
                      );
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    color="terciary"
                    type="button"
                    onClick={() => handleClearInputs()}
                  >
                    Cancelar
                  </Button>
                  <Button disabled={isPending} size="large" type="submit">
                    {isPending && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
