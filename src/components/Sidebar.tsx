import clsx from "clsx";
import { useState } from "react";

export const Sidebar: React.FC = () => {
  const [activeOption, setActiveOption] = useState(sidebarOptions[0].option);
  const isSettingsActive = activeOption === settingsOption.option;

  return (
    <div className="w-[188px] min-w-[188px] bg-[#FDEFFD] h-full p-[16px] flex flex-col">
      <img alt="sathi_logo" src="/images/Icon.png" width={140}></img>
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full mt-[24px] space-y-[4px] flex flex-col">
          {sidebarOptions.map(({ option, icon, altIcon }) => {
            const isActive = activeOption === option;

            return (
              <a
                key={option}
                onClick={() => setActiveOption(option)}
                className={clsx(
                  "group hover:cursor-pointer w-full h-[36px] p-[8px] flex items-center justify-start gap-[8px] rounded-[10px] transition-all duration-150 ease-out hover:bg-[#FFFDFF]/70 active:scale-[0.96] -----active:shadow-[0_6px_18px_rgba(197,48,197,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20",
                  {
                    "bg-[#FFFDFF]": isActive,
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
          onClick={() => setActiveOption(settingsOption.option)}
          className={clsx(
            "group hover:cursor-pointer w-full h-[36px] p-[8px] flex items-center justify-start gap-[8px] rounded-[10px] transition-all duration-150 ease-out hover:bg-[#FFFDFF]/70 active:scale-[0.96] -----active:shadow-[0_6px_18px_rgba(197,48,197,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/20",
            {
              "bg-[#FFFDFF]": isSettingsActive,
            },
          )}
        >
          <img
            alt={settingsOption.option}
            src={
              isSettingsActive ? settingsOption.altIcon : settingsOption.icon
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
    </div>
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
