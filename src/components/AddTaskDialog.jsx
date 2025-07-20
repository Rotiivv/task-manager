import { createPortal } from "react-dom";

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="w-screen flex justify-center items-center h-scren bg-black bg-opacity-40 fixed top-0 bottom-0 right-0">
      <div className="rounded-xl bg-white p-5 text-center shadow-xl">
        <h2 className="text-[#35383E] text-xl font-semibold">Nova Tarefa</h2>
        <p className="text-[#9a9c9f] text-sm">Insira as informacoes abaixo</p>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialog;
