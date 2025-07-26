import { tv } from "tailwind-variants";

const Button = ({ children, color, size, ...rest }) => {
  const buttonStyle = tv({
    base: "hover:opacity-75 transition rounded-md px-3 flex gap-1 items-center font-semibold",
    variants: {
      color: {
        primary: "bg-[#00ADB5] text-white",
        secondary: "bg-transparent text-[#818181]",
        terciary: "bg-[#EEE] text-[#35383E]",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm w-full justify-center",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  });
  return (
    <button {...rest} className={buttonStyle({ color, size })}>
      {children}
    </button>
  );
};

export default Button;
