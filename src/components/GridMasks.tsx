export const GridMasks: React.FC = () => {
  return (
    <>
      <div className="absolute left-1/2 top-[26px] z-10 h-[236px] w-[calc(100%-28px)] max-w-[360px] -translate-x-1/2 rounded-[40px] bg-white/84 blur-[32px] sm:top-[34px] sm:h-[224px] sm:max-w-[520px] lg:hidden" />
      <div className="absolute left-1/2 top-[68px] z-10 h-[56px] w-[230px] -translate-x-1/2 rounded-full bg-white/82 blur-[9px] sm:top-[76px] sm:w-[280px] lg:hidden" />
      <div className="absolute left-1/2 top-[124px] z-10 h-[54px] w-[290px] -translate-x-1/2 rounded-full bg-white/80 blur-[11px] sm:top-[136px] sm:w-[360px] lg:hidden" />
      <div className="absolute left-1/2 top-[186px] z-10 h-[72px] w-[292px] -translate-x-1/2 rounded-full bg-white/80 blur-[13px] sm:top-[202px] sm:w-[320px] lg:hidden" />

      <div
        className="absolute bottom-[1px] top-[258px] z-10 hidden w-[24px] bg-white lg:block"
        style={{ left: "calc(50% - 170px)" }}
      />
      <div
        className="absolute bottom-[1px] top-[258px] z-10 hidden w-[24px] bg-white lg:block"
        style={{ left: "calc(50% + 146px)" }}
      />

      <div className="absolute left-1/2 top-[90px] z-10 hidden h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-white blur-[42px] lg:block" />
    </>
  );
};
