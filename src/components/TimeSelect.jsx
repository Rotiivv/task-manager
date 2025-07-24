import InputLabel from "./InputLabel";

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <InputLabel>Horario</InputLabel>

      <select
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm placeholder:text-[#9A9C9F] focus:outline focus:outline-[#00ADB5] bg-white"
        id="time"
        {...props}
      >
        <option value="morning">Manha</option>
        <option value="afternoon">Tarde</option>
        <option value="moon">Noite</option>
      </select>
    </div>
  );
};

export default TimeSelect;
