export default function TopBar() {
  return (
    <div className="flex h-[64px] w-full items-center justify-between px-[16px] sm:px-[24px] md:px-[40px] lg:px-[146px]">
      <h1 className="font-semibold text-[18px] leading-[140%] text-[#303030]">
        Gamification
      </h1>
      <div className="flex items-center gap-[12px] sm:gap-[16px]">
        <div className="h-[25.6px] w-[25.6px] relative">
          <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none flex items-start justify-end overflow-visible">
            <div className="rounded-full min-w-[16px] min-h-[16px] w-[16px] h-[16px] bg-[#E51C00] flex items-center justify-center translate-x-[4px] -translate-y-[4px]">
              <h4 className="font-medium text-[11px] leading-[140%] text-[#FFFBFB]">
                2
              </h4>
            </div>
          </div>
          <img
            alt="notification_icon_topbar"
            src="/images/System.svg"
            height={25.6}
            width={25.6}
            className="hover:cursor-pointer"
          ></img>
        </div>
        <img
          alt="user_avatar"
          src="/images/user_avatar.jpg"
          width={32}
          height={32}
          className="rounded-full"
        ></img>
      </div>
    </div>
  );
}
