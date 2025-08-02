import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";

import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { LoaderIcon } from "../assets/icons";

const AddTaskDialog = ({ isOpen, handleClose, handleAddTask, sizeTasks }) => {
  const nodeRef = useRef(null);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const handleSaveClick = async (data) => {
    await handleAddTask({
      ...data,
      id: `${sizeTasks + 1}`,
      status: "not_started",
    });
    reset({
      title: "",
      description: "",
      time: "morning",
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O campo horario e obrigatorio",
                  })}
                />

                <Input
                  label="Descricao"
                  placeholder="Descreva a tarefa"
                  id="description"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
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
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>
                  <Button disabled={isSubmitting} size="large" type="submit">
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
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
