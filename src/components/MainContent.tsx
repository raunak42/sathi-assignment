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
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-white lg:h-full">
      <TopBar />
      <div className="flex w-full flex-1 flex-col items-center">
        <div className="h-full w-full max-w-[1280px] px-[16px] pt-[24px] sm:px-[24px] md:px-[40px] lg:px-[140px] lg:pt-[38px]">
          <div className="relative hidden h-[322px] w-full overflow-visible rounded-[16px] lg:block">
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
                  className="!rounded-[10px] w-[310px] min-h-[40px] bg-[#C530C5] rounded-[16px] mt-[24px] hover:bg-[#B82BB8] active:shadow-[0_6px_18px_rgba(197,48,197,0.18)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
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

          <div className="relative min-h-[980px] w-full overflow-visible rounded-[16px] lg:hidden sm:min-h-[760px]">
            <Grid />
            <div className="relative size-full overflow-visible">
              <GridMasks />
              <div className="absolute inset-0 z-30 flex size-full flex-col items-center justify-start px-[16px] pt-[40px] text-center sm:px-[24px]">
                <h2 className="font-semibold text-[24px] leading-[140%] tracking-tight text-[#561056]">
                  Gamify your Campaign
                </h2>
                <p className="mt-[8px] max-w-[480px] font-normal text-[16px] leading-[140%] text-[#616161]">
                  Enable gamification to start crafting
                  <br className="hidden sm:block" /> your custom reward system.
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-[24px] min-h-[40px] w-full max-w-[310px] rounded-[16px] bg-[#C530C5] hover:bg-[#B82BB8] active:shadow-[0_6px_18px_rgba(197,48,197,0.18)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
                >
                  <p className="font-normal text-[16px] leading-[140%] text-[#FFFFFF]">
                    Enable Gamification
                  </p>
                </Button>
                <div className="mt-[32px] grid w-full grid-cols-1 place-items-center gap-[16px] sm:grid-cols-2 sm:gap-[24px]">
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
