import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Sidebar: React.FC = () => {
  const activeOption = "Gamification";
  const isSettingsActive = activeOption === settingsOption.option;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileSidebarOpen]);

  return (
    <>
      <div className="relative flex h-[64px] w-full items-center justify-center border-b border-[#FBCFFB]/50 bg-[#FDEFFD] px-[16px] lg:hidden">
        <button
          type="button"
          aria-label="Open sidebar"
          aria-expanded={isMobileSidebarOpen}
          onClick={() => setIsMobileSidebarOpen(true)}
          className="absolute left-[16px] flex h-[36px] w-[36px] items-center justify-center rounded-[10px] transition-all duration-150 ease-out hover:bg-[#FFFDFF]/70 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20"
        >
          <div className="flex flex-col gap-[4px]">
            <span className="block h-[1.5px] w-[18px] rounded-full bg-[#303030]" />
            <span className="block h-[1.5px] w-[18px] rounded-full bg-[#303030]" />
            <span className="block h-[1.5px] w-[18px] rounded-full bg-[#303030]" />
          </div>
        </button>
        <img alt="sathi_logo" src="/images/Icon.png" width={140}></img>
      </div>

      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close sidebar overlay"
              className="fixed inset-0 z-[70] bg-[#303030]/20 backdrop-blur-[1px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-[80] flex w-[280px] max-w-[82vw] flex-col bg-[#FDEFFD] p-[16px] shadow-[0px_18px_40px_0px_#00000026] lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-[12px]">
                <img alt="sathi_logo" src="/images/Icon.png" width={140}></img>
                <button
                  type="button"
                  aria-label="Close sidebar"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] transition-all duration-150 ease-out hover:bg-[#FFFDFF]/70 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20"
                >
                  <img alt="close_sidebar" src="/images/cross.png" width={18}></img>
                </button>
              </div>
              <div className="mt-[24px] flex h-full w-full flex-col justify-between">
                <div className="flex w-full flex-col space-y-[4px]">
                  {sidebarOptions.map(({ option, icon, altIcon }) => {
                    const isActive = activeOption === option;

                    return (
                      <a
                        key={option}
                        className={clsx(
                          "group flex h-[36px] w-full items-center justify-start gap-[8px] rounded-[10px] p-[8px] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20",
                          {
                            "bg-[#FFFDFF]": isActive,
                            "hover:bg-[#FFFDFF]/70 hover:cursor-pointer active:scale-[0.96]": isActive,
                            "cursor-not-allowed": !isActive,
                          },
                        )}
                      >
                        <img
                          alt={option}
                          src={isActive ? altIcon : icon}
                          height={20}
                          width={20}
                        ></img>
                        <h3
                          className={clsx(
                            "font-medium text-[14px] leading-[130%] transition-colors duration-150",
                            {
                              "text-[#616161]": !isActive,
                              "text-[#C530C5]": isActive,
                            },
                          )}
                        >
                          {option}
                        </h3>
                      </a>
                    );
                  })}
                </div>
                <a
                  className={clsx(
                    "group flex h-[36px] w-full items-center justify-start gap-[8px] rounded-[10px] p-[8px] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20",
                    {
                      "bg-[#FFFDFF]": isSettingsActive,
                      "hover:bg-[#FFFDFF]/70 hover:cursor-pointer active:scale-[0.96]": isSettingsActive,
                      "cursor-not-allowed": !isSettingsActive,
                    },
                  )}
                >
                  <img
                    alt={settingsOption.option}
                    src={
                      isSettingsActive
                        ? settingsOption.altIcon
                        : settingsOption.icon
                    }
                    height={20}
                    width={20}
                  ></img>
                  <h3
                    className={clsx(
                      "font-medium text-[14px] leading-[130%] transition-colors duration-150",
                      {
                        "text-[#616161]": !isSettingsActive,
                        "text-[#C530C5]": isSettingsActive,
                      },
                    )}
                  >
                    {settingsOption.option}
                  </h3>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden h-full w-[188px] min-w-[188px] flex-col bg-[#FDEFFD] p-[16px] lg:flex">
        <img alt="sathi_logo" src="/images/Icon.png" width={140}></img>
        <div className="flex h-full w-full flex-col justify-between">
          <div className="mt-[24px] flex w-full flex-col space-y-[4px]">
            {sidebarOptions.map(({ option, icon, altIcon }) => {
              const isActive = activeOption === option;

              return (
                <a
                  key={option}
                  className={clsx(
                    "group flex h-[36px] w-full items-center justify-start gap-[8px] rounded-[10px] p-[8px] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20",
                    {
                      "bg-[#FFFDFF]": isActive,
                      "hover:bg-[#FFFDFF]/70 hover:cursor-pointer active:scale-[0.96]": isActive,
                      "cursor-not-allowed": !isActive,
                    },
                  )}
                >
                  <img
                    alt={option}
                    src={isActive ? altIcon : icon}
                    height={20}
                    width={20}
                  ></img>
                  <h3
                    className={clsx(
                      "font-medium text-[14px] leading-[130%] transition-colors duration-150",
                      {
                        "text-[#616161]": !isActive,
                        "text-[#C530C5]": isActive,
                      },
                    )}
                  >
                    {option}
                  </h3>
                </a>
              );
            })}
          </div>
          <a
            className={clsx(
              "group flex h-[36px] w-full items-center justify-start gap-[8px] rounded-[10px] p-[8px] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20",
              {
                "bg-[#FFFDFF]": isSettingsActive,
                "hover:bg-[#FFFDFF]/70 hover:cursor-pointer active:scale-[0.96]": isSettingsActive,
                "cursor-not-allowed": !isSettingsActive,
              },
            )}
          >
            <img
              alt={settingsOption.option}
              src={isSettingsActive ? settingsOption.altIcon : settingsOption.icon}
              height={20}
              width={20}
            ></img>
            <h3
              className={clsx(
                "font-medium text-[14px] leading-[130%] transition-colors duration-150",
                {
                  "text-[#616161]": !isSettingsActive,
                  "text-[#C530C5]": isSettingsActive,
                },
              )}
            >
              {settingsOption.option}
            </h3>
          </a>
        </div>
      </div>
    </>
  );
};

const settingsOption = {
  option: "Settings",
  icon: "/images/Profile.svg",
  altIcon: "/images/ProfilePurple.svg",
};
const sidebarOptions: {
  option: string;
  icon: string;
  altIcon: string;
}[] = [
  {
    option: "Home",
    icon: "/images/Home.svg",
    altIcon: "/images/HomePurple.svg",
  },
  {
    option: "Insights",
    icon: "/images/Brain.svg",
    altIcon: "/images/BrainPurple.svg",
  },
  {
    option: "Gamification",
    icon: "/images/Briefcase.svg",
    altIcon: "/images/BriefcasePurple.svg",
  },
  {
    option: "Applications",
    icon: "/images/APplications.svg",
    altIcon: "/images/APplicationsPurple.svg",
  },
  {
    option: "Payments",
    icon: "/images/Wallet.svg",
    altIcon: "/images/WalletPurple.svg",
  },
];
