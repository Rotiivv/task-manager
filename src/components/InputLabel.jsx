const InputLabel = (props) => {
  return (
    <label
      {...props}
      className="text-sm font-semibold text-[#35383E] text-left"
    >
      {props.children}
    </label>
  );
};

export default InputLabel;
