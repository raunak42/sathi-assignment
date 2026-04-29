export const GridMasks: React.FC = () => {
  return (
    <>
      <div
        className="absolute top-[258px] bottom-[1px] z-10 w-[24px] bg-white"
        style={{ left: "calc(50% - 170px)" }}
      />
      <div
        className="absolute top-[258px] bottom-[1px] z-10 w-[24px] bg-white"
        style={{ left: "calc(50% + 146px)" }}
      />

      <div className="absolute left-1/2 top-[90px] z-10 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-white blur-[42px]" />
    </>
  );
};
