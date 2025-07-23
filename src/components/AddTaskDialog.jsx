import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";

import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import "./AddTaskDialog.css";

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef(null);

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
            <div className="rounded-xl bg-white p-5 text-center shadow-xl">
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
                />

                <Input
                  label="Horario"
                  placeholder="Selecione o Horario"
                  id="period"
                />

                <Input
                  label="Descricao"
                  placeholder="Descreva a tarefa"
                  id="description"
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    variant="terciary"
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>
                  <Button size="large">Salvar</Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
