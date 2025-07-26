import { tv } from "tailwind-variants";

const SidebarButton = ({ children, mode }) => {
  const sidebarButtonStyle = tv({
    base: "rounded-lg px-6 py-3 flex gap-2",
    variants: {
      mode: {
        unselected: "text-[#35383e]",
        selected: "bg-[#E6F7F8] text-[#00ADB5]",
      },
    },
  });

  return (
    <a href="/home" className={sidebarButtonStyle({ mode })}>
      {children}
    </a>
  );
};

export default SidebarButton;
