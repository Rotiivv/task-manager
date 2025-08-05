const DashboardCard = ({ icon, mainText, subText }) => {
  return (
    <div className="bg-white h-[149px] flex flex-col items-center justify-center rounded-[10px] gap-2 border border-white hover:border-[#00acb53a] transiton-all">
      <div className="flex gap-2 items-center">
        <span className="text-[#00ADB5]">{icon}</span>
        <span className="text-3xl text-[rgb(53,56,62)] font-semibold">
          {mainText}
        </span>
      </div>

      <span className="font-light">{subText}</span>
    </div>
  );
};

export default DashboardCard;
