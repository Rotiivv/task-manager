const SidebarButton = ({ children, variant }) => {
  const getVariantClass = () => {
    if (variant === "unselected") {
      return "text-[#35383e]";
    } else {
      return "bg-[#E6F7F8] text-[#00ADB5]";
    }
  };

  return (
    <a href="/home" className={`rounded-lg px-6 py-3 ${getVariantClass()}`}>
      {children}
    </a>
  );
};

export default SidebarButton;
