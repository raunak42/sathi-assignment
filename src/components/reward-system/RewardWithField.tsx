import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useState } from "react";
import clsx from "clsx";
import { Button } from "../Button";
import { DisabledActionTooltip } from "../ui/disabled-action-tooltip";
import { getBonusAmountError } from "@/lib/reward-system-validation";

type RewardWithFieldProps = {
  rewardWith: string;
  rewardWithAmount: string;
  commissionTier: string;
  rewardWithOptions: string[];
  isCommissionTierRewardDisabled: boolean;
  onRewardWithChange: (value: string) => void;
  onRewardWithAmountSave: (value: string) => void;
  onOpenCommissionTierModal: () => void;
};

export const RewardWithField: React.FC<RewardWithFieldProps> = ({
  rewardWith,
  rewardWithAmount,
  commissionTier,
  rewardWithOptions,
  isCommissionTierRewardDisabled,
  onRewardWithChange,
  onRewardWithAmountSave,
  onOpenCommissionTierModal,
}) => {
  const [isRewardWithOpen, setIsRewardWithOpen] = useState(false);
  const [draftRewardWithAmount, setDraftRewardWithAmount] = useState("");
  const [highlightedRewardWithIndex, setHighlightedRewardWithIndex] =
    useState(0);

  const hasCommissionTier = !!commissionTier.trim();
  const selectedRewardWithIndex = rewardWithOptions.findIndex((option) => {
    if (option !== rewardWith) {
      return false;
    }

    if (option === "Upgrade Commission Tier") {
      return hasCommissionTier;
    }

    return true;
  });

  const rewardWithLabel =
    rewardWith === "Flat $X bonus" && rewardWithAmount
      ? `Flat $${rewardWithAmount} bonus`
      : rewardWith === "Upgrade Commission Tier" && hasCommissionTier
        ? `Upgrade to ${commissionTier}`
        : rewardWith === "Flat $X bonus"
          ? rewardWith
          : "Select reward type";

  const isOptionDisabled = (option: string) =>
    option === "Upgrade Commission Tier" && isCommissionTierRewardDisabled;

  const getNextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
    for (let step = 1; step <= rewardWithOptions.length; step += 1) {
      const nextIndex =
        (startIndex + direction * step + rewardWithOptions.length) %
        rewardWithOptions.length;

      if (!isOptionDisabled(rewardWithOptions[nextIndex])) {
        return nextIndex;
      }
    }

    return startIndex;
  };

  const openRewardWithDropdown = () => {
    setIsRewardWithOpen(true);
    setDraftRewardWithAmount(rewardWithAmount);
    setHighlightedRewardWithIndex(
      selectedRewardWithIndex >= 0 ? selectedRewardWithIndex : 0,
    );
  };

  const closeRewardWithDropdown = () => {
    setIsRewardWithOpen(false);
  };

  const handleToggleDropdown = () => {
    if (isRewardWithOpen) {
      closeRewardWithDropdown();
      return;
    }

    openRewardWithDropdown();
  };

  const handleSelectRewardWith = (option: string) => {
    if (isOptionDisabled(option)) {
      return;
    }

    if (option === "Upgrade Commission Tier" && !hasCommissionTier) {
      closeRewardWithDropdown();
      onOpenCommissionTierModal();
      return;
    }

    onRewardWithChange(option);

    if (option === "Flat $X bonus" || option === "Upgrade Commission Tier") {
      return;
    }

    closeRewardWithDropdown();
  };

  const handleEditCommissionTier = () => {
    closeRewardWithDropdown();
    onOpenCommissionTierModal();
  };

  const bonusAmountError = getBonusAmountError(draftRewardWithAmount);
  const isRewardWithSaveDisabled =
    rewardWith === "Flat $X bonus" &&
    (!draftRewardWithAmount.trim() || !!bonusAmountError);
  const rewardWithSaveTooltipMessage =
    bonusAmountError ??
    (rewardWith === "Flat $X bonus" && !draftRewardWithAmount.trim()
      ? "Enter the bonus amount to continue"
      : "Fill the required fields to continue");

  const handleCancel = () => {
    setDraftRewardWithAmount(rewardWithAmount);
    closeRewardWithDropdown();
  };

  const handleSave = () => {
    onRewardWithAmountSave(draftRewardWithAmount);
    closeRewardWithDropdown();
  };

  const handleRewardWithKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsRewardWithOpen(true);
      setHighlightedRewardWithIndex((currentIndex) =>
        getNextEnabledIndex(currentIndex, 1),
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsRewardWithOpen(true);
      setHighlightedRewardWithIndex((currentIndex) =>
        getNextEnabledIndex(currentIndex, -1),
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isRewardWithOpen) {
        openRewardWithDropdown();
        return;
      }

      handleSelectRewardWith(rewardWithOptions[highlightedRewardWithIndex]);
    }

    if (event.key === "Escape") {
      closeRewardWithDropdown();
    }
  };

  return (
    <div className="mt-[16px] w-full" onKeyDown={handleRewardWithKeyDown}>
      <h3 className="font-normal text-[14px] leading-[140%] text-[#616161]">
        Reward with <span className="text-[#E51C00]">*</span>
      </h3>
      <div className="relative mt-[8px] w-full">
        <button
          aria-activedescendant={
            isRewardWithOpen
              ? `reward-with-${highlightedRewardWithIndex}`
              : undefined
          }
          aria-controls="reward-with-listbox"
          aria-expanded={isRewardWithOpen}
          aria-haspopup="listbox"
          onClick={handleToggleDropdown}
          className={clsx(
            "flex h-[40px] w-full items-center rounded-[8px] bg-white px-[10px] py-[9px] pr-[32px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150",
            {
              "border-[2px] border-[#C530C5]": isRewardWithOpen,
              "border border-[#E3E3E3]": !isRewardWithOpen,
              "text-[#303030]": rewardWith,
              "text-[#B5B5B5]": !rewardWith,
            },
          )}
        >
          <span className="block w-full min-w-0 truncate">
            {rewardWithLabel}
          </span>
        </button>
        <img
          alt="chevron"
          src="/images/chevron.png"
          width={13}
          className={clsx(
            "pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 transition-transform duration-150 ease-out",
            {
              "rotate-180": isRewardWithOpen,
            },
          )}
        ></img>
        <AnimatePresence>
          {isRewardWithOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={closeRewardWithDropdown}
              />
              <motion.div
                className="absolute left-0 right-0 top-[calc(100%+1px)] z-50 rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                id="reward-with-listbox"
                role="listbox"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                {rewardWithOptions.map((option, index) => {
                  const isUpgradeCommissionTier =
                    option === "Upgrade Commission Tier";
                  const isSelected =
                    rewardWith === option &&
                    (!isUpgradeCommissionTier || hasCommissionTier);
                  const optionLabel =
                    isUpgradeCommissionTier && commissionTier
                      ? `Upgrade to ${commissionTier}`
                      : option;
                  const isDisabled = isOptionDisabled(option);

                  return (
                    <div key={option}>
                      <div
                        aria-selected={isSelected}
                        id={`reward-with-${index}`}
                        onMouseEnter={() => setHighlightedRewardWithIndex(index)}
                        role="option"
                        className={clsx(
                          "group/reward-with-option flex w-full min-w-0 h-[40px] items-center justify-between rounded-[8px] px-[10px] py-[9px] text-left transition-all duration-150 ease-out",
                          {
                            "text-[#C530C5] bg-[#FFF5FF]": isSelected,
                            "bg-[#F5F5F5] text-[#303030]":
                              !isSelected && !isDisabled && highlightedRewardWithIndex === index,
                            "text-[#303030] hover:bg-[#F5F5F5]":
                              !isSelected && !isDisabled && highlightedRewardWithIndex !== index,
                            "cursor-not-allowed text-[#B5B5B5] opacity-60":
                              !isSelected && isDisabled,
                          },
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectRewardWith(option)}
                          disabled={isDisabled}
                          className={clsx("min-w-0 flex-1 text-left active:scale-[0.99]", {
                            "hover:cursor-pointer": !isDisabled,
                            "cursor-not-allowed": isDisabled,
                          })}
                        >
                          <p className="min-w-0 truncate font-normal text-[16px] leading-[140%]">
                            {optionLabel}
                          </p>
                        </button>
                        {isSelected && isUpgradeCommissionTier ? (
                          <button
                            type="button"
                            aria-label="Edit commission tier"
                            onClick={handleEditCommissionTier}
                            className="ml-[8px] flex h-[20px] w-[20px] shrink-0 items-center justify-center hover:cursor-pointer"
                          >
                            <img
                              alt="check"
                              src="/images/check.png"
                              width={15}
                              className="block group-hover/reward-with-option:hidden group-focus-within/reward-with-option:hidden"
                            />
                            <img
                              alt="edit"
                              src="/images/Edit.svg"
                              width={20}
                              height={20}
                              className="hidden group-hover/reward-with-option:block group-focus-within/reward-with-option:block"
                            />
                          </button>
                        ) : (
                          isSelected && (
                            <img
                              alt="check"
                              src="/images/check.png"
                              width={15}
                              className="shrink-0"
                            ></img>
                          )
                        )}
                      </div>
                      <AnimatePresence>
                        {rewardWith === option && option === "Flat $X bonus" && (
                          <motion.div
                            className="mt-[4px] overflow-hidden"
                            initial={{ opacity: 0, height: 0, y: -6 }}
                            animate={{
                              opacity: 1,
                              height: 40,
                              y: 0,
                              transition: {
                                duration: 0.18,
                                ease: "easeOut",
                              },
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              y: -6,
                              transition: {
                                duration: 0.18,
                                ease: "easeOut",
                              },
                            }}
                          >
                            <motion.div
                              className={clsx(
                                "relative flex h-[40px] w-full min-w-0 items-center rounded-[8px] border-[2px] bg-white",
                                {
                                  "border-[#C530C5]": !bonusAmountError,
                                  "border-[#E51C00]": !!bonusAmountError,
                                },
                              )}
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: {
                                  duration: 0.12,
                                  delay: 0.18,
                                  ease: "easeOut",
                                },
                              }}
                              exit={{
                                opacity: 0,
                                transition: {
                                  duration: 0.12,
                                  ease: "easeOut",
                                },
                              }}
                            >
                              <span className="flex shrink-0 items-center justify-center px-[16px] font-normal text-[16px] leading-[140%] text-[#616161]">
                                $
                              </span>
                              <div className="h-full w-[1px] bg-[#E3E3E3]" />
                              <input
                                autoFocus
                                value={draftRewardWithAmount}
                                onChange={(event) =>
                                  setDraftRewardWithAmount(event.target.value)
                                }
                                onKeyDown={(event) => {
                                  event.stopPropagation();

                                  if (
                                    event.key === "Enter" &&
                                    !isRewardWithSaveDisabled
                                  ) {
                                    event.preventDefault();
                                    handleSave();
                                  }
                                }}
                                onFocus={(event) => event.target.select()}
                                placeholder="e.g. 100"
                                className="h-full min-w-0 flex-1 bg-transparent px-[16px] font-normal text-[16px] leading-[140%] text-[#303030] outline-none placeholder:text-[#B5B5B5] tracking-tight"
                              />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                {rewardWith === "Flat $X bonus" && (
                  <div
                    className="mt-[8px] grid grid-cols-1 gap-[8px] min-[340px]:grid-cols-2"
                    onKeyDown={(event) => event.stopPropagation()}
                    role="none"
                  >
                    <Button
                      onClick={handleCancel}
                      pressAnimationDelayMs={110}
                      className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] active:scale-[0.96] active:shadow-[0_3px_10px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
                    >
                      <p className="whitespace-nowrap font-normal text-[15px] leading-[140%] min-[360px]:text-[16px]">
                        Cancel
                      </p>
                    </Button>
                    <DisabledActionTooltip
                      show={isRewardWithSaveDisabled}
                      message={rewardWithSaveTooltipMessage}
                      className="flex-1"
                    >
                      <Button
                        onClick={handleSave}
                        pressAnimationDelayMs={110}
                        disabled={isRewardWithSaveDisabled}
                        className={clsx(
                          "h-[40px] w-full rounded-[8px] text-white opacity-100 focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 active:scale-[0.96]",
                          {
                            "bg-[#F68DF6]": isRewardWithSaveDisabled,
                            "bg-[#C530C5] hover:bg-[#B82BB8] active:shadow-[0_6px_18px_rgba(197,48,197,0.18)]": !isRewardWithSaveDisabled,
                          },
                        )}
                      >
                        <p className="whitespace-nowrap font-normal text-[15px] leading-[140%] min-[360px]:text-[16px]">
                          Save
                        </p>
                      </Button>
                    </DisabledActionTooltip>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
