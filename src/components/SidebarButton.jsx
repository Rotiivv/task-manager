import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, to }) => {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebarButtonStyle({ mode: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarButton;
