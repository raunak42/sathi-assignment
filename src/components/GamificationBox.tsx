type GamificationBoxProps = {
  icon: string;
  title: string;
  description: string;
  index: number;
};

export const GamificationBox: React.FC<GamificationBoxProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  return (
    <div className="w-[292px] h-[200px] rounded-[16px] border border-[#FEE7FE] bg-white relative shadow-[0px_7px_10px_0px_#0000000D] ">
      <img
        alt={`box_lines_${index + 1}`}
        src="/images/lines.png"
        className="opacity-55 z-0"
      ></img>
      <div className=" px-[16px] text-center z-10 absolute inset-0 size-full flex flex-col items-center justify-start pt-[24px]">
        <div className="rounded-[16px] border-[9.34px] bg-white border-[#FBCFFB] w-[70px] h-[70px] flex items-center justify-center">
          <img alt="icon" src={icon} width={25} height={25}></img>
        </div>
        <h2 className="mt-[16px] font-medium text-[16px] leading-[140%] text-[#303030]">
          {title}
        </h2>
        <p className="mt-[8px] font-normal text-[14px] leading-[140%] text-[#616161]">
          {description}
        </p>
      </div>
    </div>
  );
};
