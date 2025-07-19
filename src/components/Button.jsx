const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClass = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "secundary") {
      return "bg-transparent text-[#818181]";
    }
  };
  return (
    <button
      {...rest}
      className={`${getVariantClass()} hover:opacity-75 transition rounded-md px-3 py-1 text-xs flex gap-1 items-center`}
    >
      {children}
    </button>
  );
};

export default Button;
