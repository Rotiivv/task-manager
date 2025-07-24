import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";

import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, handleAddTask, sizeTasks }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setDescription("");
      setTime("");
      setTitle("");
    }
  }, [isOpen]);

  const [title, setTitle] = useState();
  const [time, setTime] = useState("morning");
  const [description, setDescription] = useState();

  const handleSaveClick = () => {
    if (!title.trim() || !description.trim())
      return alert("campos nao preenchidos");

    handleAddTask({
      id: sizeTasks + 1,
      title: title,
      description: description,
      time: time,
      status: "not_started",
    });

    handleClose();
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
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />

                <Input
                  label="Descricao"
                  placeholder="Descreva a tarefa"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    variant="terciary"
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>
                  <Button size="large" onClick={() => handleSaveClick()}>
                    Salvar
                  </Button>
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
