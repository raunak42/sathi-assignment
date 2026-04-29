import { useState } from "react";
import clsx from "clsx";

export default function App() {
  const [activeOption, setActiveOption] = useState(sidebarOptions[0].option);
  const isSettingsActive = activeOption === settingsOption.option;

  return (
    <div className="w-screen h-screen flex">
      {/* side bar */}
      <div className="w-[188px] min-w-[188px] bg-[#FDEFFD] h-full p-[16px] flex flex-col">
        <img alt="sathi_logo" src="/Icon.png" width={140}></img>
        <div className="w-full flex flex-col justify-between h-full">
          <div className="w-full mt-[24px] space-y-[4px] flex flex-col">
            {sidebarOptions.map(({ option, icon, altIcon }) => {
              const isActive = activeOption === option;

              return (
                <a
                  key={option}
                  onClick={() => setActiveOption(option)}
                  className={clsx(
                    "hover:cursor-pointer w-full h-[36px] p-[8px] flex items-center justify-start gap-[8px] rounded-[10px]",
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
                    className={clsx("font-medium text-[14px] leading-[130%]", {
                      "text-[#616161]": !isActive,
                      "text-[#C530C5]": isActive,
                    })}
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
              "hover:cursor-pointer w-full h-[36px] p-[8px] flex items-center justify-start gap-[8px] rounded-[10px]",
              {
                "bg-[#FFFDFF]": isSettingsActive,
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
              className={clsx("font-medium text-[14px] leading-[130%]", {
                "text-[#616161]": !isSettingsActive,
                "text-[#C530C5]": isSettingsActive,
              })}
            >
              {settingsOption.option}
            </h3>
          </a>
        </div>
      </div>
      <div className="w-full h-full bg-white flex flex-col items-center justify-start">
        {/* Top bar */}
        <div className="w-full h-[64px] flex items-center justify-between px-[146px]">
          <h1 className="font-semibold text-[18px] leading-[140%] text-[#303030]">
            Gamification
          </h1>
        </div>
        <div className="bg-blue-200 w-full max-w-[1440px] h-full"></div>
      </div>
    </div>
  );
}

const settingsOption = {
  option: "Settings",
  icon: "/Profile.svg",
  altIcon: "/ProfilePurple.svg",
};
const sidebarOptions: {
  option: string;
  icon: string;
  altIcon: string;
}[] = [
  {
    option: "Home",
    icon: "/Home.svg",
    altIcon: "/HomePurple.svg",
  },
  {
    option: "Insights",
    icon: "/Brain.svg",
    altIcon: "/BrainPurple.svg",
  },
  {
    option: "Gamification",
    icon: "/Briefcase.svg",
    altIcon: "/BriefcasePurple.svg",
  },
  {
    option: "Applications",
    icon: "/APplications.svg",
    altIcon: "/APplicationsPurple.svg",
  },
  {
    option: "Payments",
    icon: "/Wallet.svg",
    altIcon: "/WalletPurple.svg",
  },
];
