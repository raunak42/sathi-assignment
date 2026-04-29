import { Suspense, lazy, useState } from "react";
import { Button } from "./Button";
import { GamificationBox } from "./GamificationBox";
import { Grid } from "./Grid";
import { GridMasks } from "./GridMasks";
const RewardSystemModal = lazy(() =>
  import("./RewardSystemModal").then((module) => ({
    default: module.RewardSystemModal,
  })),
);
import TopBar from "./Topbar";
import { NotificationToast } from "./ui/notification-toast";

export const MainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardCreatedNotificationOpen, setIsRewardCreatedNotificationOpen] =
    useState(false);

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-start">
      <TopBar />
      <div className="h-full w-full flex flex-col items-center">
        <div className="w-full h-full max-w-[1280px] px-[140px] pt-[38px]">
          <div className="relative w-full h-[322px] rounded-[16px] overflow-visible">
            <Grid />
            <div className="relative size-full overflow-visible">
              <GridMasks />
              <div className="absolute inset-0 z-30 size-full flex flex-col items-center justify-start pt-[60px] text-center">
                <h2 className="font-semibold text-[28px] leading-[140%] text-[#561056] tracking-tight">
                  Gamify your Campaign
                </h2>
                <p className="mt-[8px] font-normal text-[16px] leading-[140%] text-[#616161]">
                  Enable gamification to start crafting <br />
                  your custom reward system.
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-[310px] min-h-[40px] bg-[#C530C5] rounded-[16px] mt-[24px] hover:bg-[#B82BB8] active:shadow-[0_6px_18px_rgba(197,48,197,0.18)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
                >
                  <p className="font-normal text-[16px] leading-[140%] text-[#FFFFFF]">
                    Enable Gamification
                  </p>
                </Button>
                <div className="flex flex-row items-start justify-between mt-[42px] px-[18px] gap-[24px]">
                  {boxContents.map((boxContent, index) => (
                    <GamificationBox
                      key={boxContent.icon}
                      {...boxContent}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 rounded-[16px] border-[0.68px] border-[#E3E3E3]" />
          </div>
          <Suspense fallback={null}>
            <RewardSystemModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreateReward={() => {
                setIsModalOpen(false);
                setIsRewardCreatedNotificationOpen(false);
                window.setTimeout(() => {
                  setIsRewardCreatedNotificationOpen(true);
                }, 0);
              }}
            />
          </Suspense>
        </div>
      </div>
      <NotificationToast
        isOpen={isRewardCreatedNotificationOpen}
        title="Reward created successfully"
        description="Your reward system is now live."
        onClose={() => setIsRewardCreatedNotificationOpen(false)}
      />
    </div>
  );
};

const boxContents = [
  {
    icon: "/images/Vector1.svg",
    title: "Reward Your Ambassadors",
    description:
      "Boost campaign performance by setting up rewards for ambassadors",
  },
  {
    icon: "/images/Vector2.svg",
    title: "Set Milestones",
    description:
      "Set up custom goals for sales, posts, or time-based achievements",
  },
  {
    icon: "/images/Vector3.svg",
    title: "Customise Incentives",
    description:
      "Create custom incentives like flat fees, free products, or special commissions.",
  },
];
