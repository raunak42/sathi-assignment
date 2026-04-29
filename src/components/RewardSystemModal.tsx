import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DisabledActionTooltip } from "./ui/disabled-action-tooltip";
import { CommissionTierModal } from "./reward-system/CommissionTierModal";
import {
  commissionTierOptions,
  durationOptions,
  rewardEvents,
  rewardWithOptions,
} from "./reward-system/constants";
import { ModalFrame } from "./reward-system/ModalFrame";
import { RewardEventField } from "./reward-system/RewardEventField";
import { RewardWithField } from "./reward-system/RewardWithField";
import { TimeBoundRewardField } from "./reward-system/TimeBoundRewardField";

type RewardSystemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateReward: () => void;
};

export const RewardSystemModal: React.FC<RewardSystemModalProps> = ({
  isOpen,
  onClose,
  onCreateReward,
}) => {
  const [rewardEvent, setRewardEvent] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [postCount, setPostCount] = useState("");
  const [duration, setDuration] = useState("");
  const [rewardWith, setRewardWith] = useState("");
  const [rewardWithAmount, setRewardWithAmount] = useState("");
  const [commissionTier, setCommissionTier] = useState("");
  const [isTimeBoundEnabled, setIsTimeBoundEnabled] = useState(false);
  const [rewardEndDate, setRewardEndDate] = useState<Date>();
  const [isCommissionTierModalOpen, setIsCommissionTierModalOpen] =
    useState(false);
  const isCommissionTierRewardDisabled =
    rewardEvent === "Posts X times every Y period" ||
    rewardEvent === "Is Onboarded";

  useEffect(() => {
    if (isCommissionTierRewardDisabled && rewardWith === "Upgrade Commission Tier") {
      setRewardWith("");
      setIsCommissionTierModalOpen(false);
    }
  }, [isCommissionTierRewardDisabled, rewardWith]);

  const isRewardEventComplete =
    rewardEvent === "Cross $X in sales"
      ? !!rewardAmount.trim()
      : rewardEvent === "Posts X times every Y period"
        ? !!postCount.trim() && !!duration.trim()
        : rewardEvent === "Is Onboarded";
  const isRewardWithComplete =
    rewardWith === "Flat $X bonus"
      ? !!rewardWithAmount.trim()
      : rewardWith === "Upgrade Commission Tier"
        ? !!commissionTier.trim()
        : false;
  const isTimeBoundComplete = !isTimeBoundEnabled || !!rewardEndDate;
  const isCreateRewardDisabled =
    !isRewardEventComplete || !isRewardWithComplete || !isTimeBoundComplete;
  const createRewardTooltipMessage =
    isTimeBoundEnabled &&
    isRewardEventComplete &&
    isRewardWithComplete &&
    !rewardEndDate
      ? "Choose reward end date to continue"
      : "Choose a reward trigger and a reward to continue";

  const resetRewardSystemForm = () => {
    setRewardEvent("");
    setRewardAmount("");
    setPostCount("");
    setDuration("");
    setRewardWith("");
    setRewardWithAmount("");
    setCommissionTier("");
    setIsTimeBoundEnabled(false);
    setRewardEndDate(undefined);
    setIsCommissionTierModalOpen(false);
  };

  const closeRewardSystemModal = () => {
    setIsCommissionTierModalOpen(false);
    onClose();
  };

  const handleCreateReward = () => {
    if (isCreateRewardDisabled) {
      return;
    }

    resetRewardSystemForm();
    onCreateReward();
  };

  const handleAnimatedClose = () => {
    window.setTimeout(() => {
      closeRewardSystemModal();
    }, 110);
  };

  const handleAnimatedCreateReward = () => {
    window.setTimeout(() => {
      handleCreateReward();
    }, 110);
  };

  return (
    <>
      <ModalFrame
        isOpen={isOpen}
        onClose={closeRewardSystemModal}
        title="Create your reward system"
        closeAlt="cross_modal"
      >
        <div className="mt-[16px] flex flex-col items-start">
          <RewardEventField
            rewardEvent={rewardEvent}
            rewardAmount={rewardAmount}
            postCount={postCount}
            duration={duration}
            rewardEvents={rewardEvents}
            durationOptions={durationOptions}
            onRewardEventChange={setRewardEvent}
            onRewardDetailsSave={({ rewardAmount, postCount, duration }) => {
              setRewardAmount(rewardAmount);
              setPostCount(postCount);
              setDuration(duration);
            }}
          />
          <RewardWithField
            rewardWith={rewardWith}
            rewardWithAmount={rewardWithAmount}
            commissionTier={commissionTier}
            rewardWithOptions={rewardWithOptions}
            isCommissionTierRewardDisabled={isCommissionTierRewardDisabled}
            onRewardWithChange={setRewardWith}
            onRewardWithAmountSave={setRewardWithAmount}
            onOpenCommissionTierModal={() => setIsCommissionTierModalOpen(true)}
          />
          <TimeBoundRewardField
            isTimeBoundEnabled={isTimeBoundEnabled}
            selectedDate={rewardEndDate}
            onTimeBoundEnabledChange={setIsTimeBoundEnabled}
            onSelectedDateChange={setRewardEndDate}
          />
          <div className="mt-[24px] flex items-start justify-between w-full gap-[16px]">
            <motion.button
              type="button"
              onClick={handleAnimatedClose}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="border border-[#E3E3E3] px-[16px] py-[8px] rounded-[8px] hover:cursor-pointer font-normal text-[16px] leading-[140%] text-[#303030] w-[50%] bg-white transform-gpu transition-all duration-150 ease-out hover:bg-[#F5F5F5] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] active:shadow-[0_3px_10px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
            >
              Cancel
            </motion.button>
            <DisabledActionTooltip
              show={isCreateRewardDisabled}
              message={createRewardTooltipMessage}
              className="w-[50%]"
              contentClassName="top-[calc(100%+12px)]"
            >
              <motion.button
                type="button"
                disabled={isCreateRewardDisabled}
                onClick={handleAnimatedCreateReward}
                whileTap={isCreateRewardDisabled ? undefined : { scale: 0.96 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="px-[16px] py-[8px] rounded-[8px] font-normal text-[16px] leading-[140%] text-[#FFFFFF] w-full transform-gpu transition-all duration-150 ease-out enabled:hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-[#F68DF6] enabled:bg-[#C530C5] enabled:hover:bg-[#B82BB8] enabled:active:shadow-[0_6px_18px_rgba(197,48,197,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
              >
                Create Reward
              </motion.button>
            </DisabledActionTooltip>
          </div>
        </div>
      </ModalFrame>

      {isOpen && isCommissionTierModalOpen && (
        <CommissionTierModal
          isOpen
          commissionTier={commissionTier}
          commissionTierOptions={commissionTierOptions}
          onClose={() => setIsCommissionTierModalOpen(false)}
          onSave={(tier) => {
            setCommissionTier(tier);
            setRewardWith("Upgrade Commission Tier");
            setIsCommissionTierModalOpen(false);
          }}
        />
      )}
    </>
  );
};
