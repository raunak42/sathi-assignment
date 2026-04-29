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
    <div className="relative h-[200px] w-full max-w-[292px] rounded-[16px] border border-[#FEE7FE] bg-white shadow-[0px_7px_10px_0px_#0000000D] lg:w-[292px]">
      <img
        alt={`box_lines_${index + 1}`}
        src="/images/lines.png"
        className="z-0 h-full w-full rounded-[16px] object-cover opacity-55"
      ></img>
      <div className="absolute inset-0 z-10 flex size-full flex-col items-center justify-start px-[16px] pt-[24px] text-center">
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
