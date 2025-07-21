const Button = ({ children, variant = "primary", size = "small", ...rest }) => {
  const getVariantClass = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "secundary") {
      return "bg-transparent text-[#818181]";
    }

    if (variant === "terciary") {
      return "bg-[#EEE] text-[#35383E]";
    }
  };

  const getSizeClass = () => {
    if (size === "small") {
      return "py-1 text-xs";
    }

    if (size === "large") {
      return "py-2 text-sm w-full justify-center";
    }
  };
  return (
    <button
      {...rest}
      className={`${getVariantClass()} hover:opacity-75 transition rounded-md px-3 flex gap-1 items-center font-semibold ${getSizeClass()}`}
    >
      {children}
    </button>
  );
};

export default Button;
