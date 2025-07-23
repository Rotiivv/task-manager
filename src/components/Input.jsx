import InputLabel from "./InputLabel";

const Input = ({ label, ...rest }) => {
  return (
    <div className="space-y-1 flex flex-col">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className=" rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm placeholder:text-[#9A9C9F] focus:outline focus:outline-[#00ADB5]"
        {...rest}
      />
    </div>
  );
};

export default Input;
