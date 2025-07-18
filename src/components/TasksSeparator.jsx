const TasksSeparator = ({ icon, text }) => {
  return (
    <div className="flex gap-2 items-center border-b border-solid border-[#f4f4f5] pb-2">
      {icon}
      <p className="text-[#9a9c9f] text-sm">{text}</p>
    </div>
  );
};

export default TasksSeparator;
