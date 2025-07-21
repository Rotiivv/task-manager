const Input = ({ label, ...rest }) => {
  return (
    <div className="space-y-1 flex flex-col">
      <label
        htmlFor={rest.id}
        className="text-sm font-semibold text-[#35383E] text-left"
      >
        {label}
      </label>
      <input
        className=" rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm placeholder:text-[#9A9C9F] focus:outline focus:outline-[#00ADB5]"
        {...rest}
      />
    </div>
  );
};

export default Input;
