import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../Button";
import { DisabledActionTooltip } from "../ui/disabled-action-tooltip";
import {
  getPostCountError,
  getSalesTargetAmountError,
} from "@/lib/reward-system-validation";

type RewardEventFieldProps = {
  rewardEvent: string;
  rewardAmount: string;
  postCount: string;
  duration: string;
  rewardEvents: string[];
  durationOptions: string[];
  onRewardEventChange: (event: string) => void;
  onRewardDetailsSave: (values: {
    rewardAmount: string;
    postCount: string;
    duration: string;
  }) => void;
};

export const RewardEventField: React.FC<RewardEventFieldProps> = ({
  rewardEvent,
  rewardAmount,
  postCount,
  duration,
  rewardEvents,
  durationOptions,
  onRewardEventChange,
  onRewardDetailsSave,
}) => {
  const [isRewardEventOpen, setIsRewardEventOpen] = useState(false);
  const [draftRewardAmount, setDraftRewardAmount] = useState("");
  const [draftPostCount, setDraftPostCount] = useState("");
  const [draftDuration, setDraftDuration] = useState("");
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [highlightedRewardEventIndex, setHighlightedRewardEventIndex] =
    useState(0);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [highlightedDurationIndex, setHighlightedDurationIndex] = useState(-1);

  const selectedRewardEventIndex = rewardEvents.findIndex(
    (event) => event === rewardEvent,
  );

  const rewardEventLabel =
    rewardEvent === "Cross $X in sales" && rewardAmount
      ? `Cross $${rewardAmount} in sales`
      : rewardEvent === "Posts X times every Y period" && postCount && duration
        ? `Posts ${postCount} times every ${duration}`
        : rewardEvent || "Select an event";

  const openRewardEventDropdown = () => {
    setIsRewardEventOpen(true);
    setDraftRewardAmount(rewardAmount);
    setDraftPostCount(postCount);
    setDraftDuration(duration);
    setHighlightedRewardEventIndex(
      selectedRewardEventIndex >= 0 ? selectedRewardEventIndex : 0,
    );
  };

  const closeRewardEventDropdown = () => {
    setIsRewardEventOpen(false);
    setIsDurationOpen(false);
  };

  const handleToggleDropdown = () => {
    if (isRewardEventOpen) {
      closeRewardEventDropdown();
      return;
    }

    openRewardEventDropdown();
  };

  const handleCancel = () => {
    setDraftRewardAmount(rewardAmount);
    setDraftPostCount(postCount);
    setDraftDuration(duration);
    closeRewardEventDropdown();
  };

  const salesTargetAmountError = getSalesTargetAmountError(draftRewardAmount);
  const postCountError = getPostCountError(draftPostCount);
  const isRewardEventSaveDisabled =
    !rewardEvent ||
    (rewardEvent === "Cross $X in sales" &&
      (!draftRewardAmount.trim() || !!salesTargetAmountError)) ||
    (rewardEvent === "Posts X times every Y period" &&
      (!draftPostCount.trim() || !draftDuration.trim() || !!postCountError));
  const rewardEventSaveTooltipMessage =
    !rewardEvent
      ? "Select an event to continue"
      : rewardEvent === "Cross $X in sales"
        ? salesTargetAmountError ??
          (!draftRewardAmount.trim()
            ? "Enter the sales target amount to continue"
            : "Fill the required fields to continue")
        : rewardEvent === "Posts X times every Y period"
          ? postCountError ??
            (!draftPostCount.trim()
              ? "Enter the post count to continue"
              : !draftDuration.trim()
                ? "Select duration to continue"
                : "Fill the required fields to continue")
          : "Fill the required fields to continue";

  const focusSaveButton = () => {
    window.requestAnimationFrame(() => {
      saveButtonRef.current?.focus();
    });
  };

  const handleSave = () => {
    onRewardDetailsSave({
      rewardAmount: draftRewardAmount,
      postCount: draftPostCount,
      duration: draftDuration,
    });
    closeRewardEventDropdown();
  };

  const handleRewardEventKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsRewardEventOpen(true);
      setHighlightedRewardEventIndex(
        (currentIndex) => (currentIndex + 1) % rewardEvents.length,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsRewardEventOpen(true);
      setHighlightedRewardEventIndex(
        (currentIndex) =>
          (currentIndex - 1 + rewardEvents.length) % rewardEvents.length,
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isRewardEventOpen) {
        openRewardEventDropdown();
        return;
      }

      onRewardEventChange(rewardEvents[highlightedRewardEventIndex]);
    }

    if (event.key === "Escape") {
      closeRewardEventDropdown();
    }
  };

  return (
    <>
      <h3 className="font-normal text-[14px] leading-[140%] text-[#616161]">
        Reward event <span className="text-[#E51C00]">*</span>
      </h3>
      <div
        className="relative mt-[8px] w-full"
        onKeyDown={handleRewardEventKeyDown}
      >
        <button
          aria-activedescendant={
            isRewardEventOpen
              ? `reward-event-${highlightedRewardEventIndex}`
              : undefined
          }
          aria-controls="reward-event-listbox"
          aria-expanded={isRewardEventOpen}
          aria-haspopup="listbox"
          onClick={handleToggleDropdown}
          className={`w-full h-[40px] rounded-[8px] bg-white px-[10px] py-[9px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150 flex items-center ${
            isRewardEventOpen
              ? "border-[2px] border-[#C530C5]"
              : "border-[1px] border-[#E3E3E3]"
          } ${rewardEvent ? "text-[#303030]" : "text-[#B5B5B5]"}`}
        >
          {rewardEventLabel}
        </button>
        <img
          alt="chevron"
          src="/images/chevron.png"
          width={13}
          className={`pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 transition-transform duration-150 ease-out ${
            isRewardEventOpen ? "rotate-180" : ""
          }`}
        ></img>
        <AnimatePresence>
          {isRewardEventOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={closeRewardEventDropdown}
              />
              <motion.div
                className="absolute left-0 right-0 top-[calc(100%+1px)] z-50 rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                id="reward-event-listbox"
                role="listbox"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                {rewardEvents.map((event, index) => (
                  <div
                    key={event}
                    onMouseLeave={() => setHighlightedRewardEventIndex(-1)}
                  >
                    <button
                      aria-selected={rewardEvent === event}
                      id={`reward-event-${index}`}
                      onClick={() => {
                        onRewardEventChange(event);

                        if (event === "Is Onboarded") {
                          focusSaveButton();
                        }
                      }}
                      onMouseEnter={() => setHighlightedRewardEventIndex(index)}
                      role="option"
                      className={clsx(
                        "hover:cursor-pointer w-full h-[40px] py-[9px] px-[10px] text-left rounded-[8px] flex items-center justify-between transition-all duration-150 ease-out active:scale-[0.99]",
                        {
                          "text-[#C530C5] bg-[#FFF5FF]": rewardEvent === event,
                          "bg-[#F5F5F5] text-[#303030]":
                            rewardEvent !== event &&
                            highlightedRewardEventIndex === index,
                          "text-[#303030] hover:bg-[#F5F5F5]":
                            rewardEvent !== event &&
                            highlightedRewardEventIndex !== index,
                        },
                      )}
                    >
                      <p className="font-normal text-[16px] leading-[140%]">
                        {event}
                      </p>
                      {rewardEvent === event && (
                        <img
                          alt="check"
                          src="/images/check.png"
                          width={15}
                        ></img>
                      )}
                    </button>
                    <AnimatePresence>
                      {rewardEvent === event && event === "Cross $X in sales" && (
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
                              delay: 0.12,
                              ease: "easeOut",
                            },
                          }}
                        >
                          <motion.div
                            className={clsx(
                              "relative flex h-[40px] w-full items-center rounded-[8px] border-[2px] bg-white",
                              {
                                "border-[#C530C5]": !salesTargetAmountError,
                                "border-[#E51C00]": !!salesTargetAmountError,
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
                            <span className="font-normal text-[16px] leading-[140%] text-[#616161] px-[16px] flex items-center justify-center">
                              $
                            </span>
                            <div className="h-full w-[1px] bg-[#E3E3E3]" />
                            <input
                              autoFocus
                              value={draftRewardAmount}
                              onChange={(event) =>
                                setDraftRewardAmount(event.target.value)
                              }
                              onKeyDown={(event) => {
                                event.stopPropagation();

                                if (
                                  event.key === "Enter" &&
                                  !isRewardEventSaveDisabled
                                ) {
                                  event.preventDefault();
                                  handleSave();
                                }
                              }}
                              onFocus={(event) => event.target.select()}
                              placeholder="e.g. 100"
                              className="h-full flex-1 bg-transparent px-[16px] font-normal text-[16px] leading-[140%] text-[#303030] outline-none placeholder:text-[#B5B5B5] tracking-tight"
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {rewardEvent === event &&
                      event === "Posts X times every Y period" && (
                        <div className="mt-[4px] mb-[4px] grid grid-cols-2 gap-[8px]">
                          <div className="relative">
                            <input
                              autoFocus
                              value={draftPostCount}
                              onChange={(event) =>
                                setDraftPostCount(event.target.value)
                              }
                              onKeyDown={(event) => {
                                event.stopPropagation();

                                if (
                                  event.key === "Enter" &&
                                  !isRewardEventSaveDisabled
                                ) {
                                  event.preventDefault();
                                  handleSave();
                                }
                              }}
                              onFocus={(event) => event.target.select()}
                              placeholder="eg: 4"
                              className={clsx(
                                "w-full h-[40px] rounded-[8px] border bg-white px-[10px] font-normal text-[16px] leading-[140%] text-[#303030] outline-none placeholder:text-[#B5B5B5] tracking-tight focus:border-[2px]",
                                {
                                  "border-[#E3E3E3] focus:border-[#C530C5]": !postCountError,
                                  "border-[#E51C00] focus:border-[#E51C00]":
                                    !!postCountError,
                                },
                              )}
                            />
                          </div>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setIsDurationOpen((isOpen) => !isOpen)
                              }
                              className={clsx(
                                "w-full flex h-[40px] items-center justify-between rounded-[8px] bg-white px-[10px] font-normal text-[16px] leading-[140%]",
                                {
                                  "border-[2px] border-[#C530C5] text-[#303030]":
                                    isDurationOpen,
                                  "border border-[#E3E3E3] text-[#B5B5B5]":
                                    !isDurationOpen && !draftDuration,
                                  "border border-[#E3E3E3] text-[#303030]":
                                    !isDurationOpen && draftDuration,
                                },
                              )}
                            >
                              {draftDuration || "Select duration"}
                              <img
                                alt="chevron"
                                src="/images/chevron.png"
                                width={13}
                                className={clsx(
                                  "transition-transform duration-150 ease-out",
                                  {
                                    "rotate-180": isDurationOpen,
                                  },
                                )}
                              ></img>
                            </button>
                            <AnimatePresence>
                              {isDurationOpen && (
                                <>
                                  <div
                                    className="fixed inset-0 z-50"
                                    onClick={() => setIsDurationOpen(false)}
                                  />
                                  <motion.div
                                    className="absolute left-0 right-0 top-[calc(100%+1px)] z-[60] overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                                    onMouseLeave={() =>
                                      setHighlightedDurationIndex(-1)
                                    }
                                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                    transition={{
                                      duration: 0.16,
                                      ease: "easeOut",
                                    }}
                                  >
                                    {durationOptions.map((duration, index) => (
                                      <button
                                        key={duration}
                                        onClick={() => {
                                          setDraftDuration(duration);
                                          setIsDurationOpen(false);
                                          focusSaveButton();
                                        }}
                                        onMouseEnter={() =>
                                          setHighlightedDurationIndex(index)
                                        }
                                        className={clsx(
                                          "hover:cursor-pointer w-full h-[40px] py-[9px] px-[10px] text-left rounded-[8px] flex items-center justify-between transition-all duration-150 ease-out active:scale-[0.99]",
                                          {
                                            "text-[#C530C5] bg-[#FFF5FF]":
                                              draftDuration === duration,
                                            "bg-[#F5F5F5] text-[#303030]":
                                              draftDuration !== duration &&
                                              highlightedDurationIndex ===
                                                index,
                                            "text-[#303030]":
                                              draftDuration !== duration &&
                                              highlightedDurationIndex !==
                                                index,
                                          },
                                        )}
                                      >
                                        <p className="font-normal text-[16px] leading-[140%]">
                                          {duration}
                                        </p>
                                        {draftDuration === duration && (
                                          <img
                                            alt="check"
                                            src="/images/check.png"
                                            width={15}
                                          ></img>
                                        )}
                                      </button>
                                    ))}
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
                <div
                  className="mt-[8px] flex gap-[8px]"
                  onKeyDown={(event) => event.stopPropagation()}
                  role="none"
                >
                  <Button
                    onClick={handleCancel}
                    pressAnimationDelayMs={110}
                    className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] active:scale-[0.96] active:shadow-[0_3px_10px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
                  >
                    <p className="font-normal text-[16px] leading-[140%]">
                      Cancel
                    </p>
                  </Button>
                  <DisabledActionTooltip
                    show={isRewardEventSaveDisabled}
                    message={rewardEventSaveTooltipMessage}
                    className="flex-1"
                  >
                    <Button
                      ref={saveButtonRef}
                      onClick={handleSave}
                      pressAnimationDelayMs={110}
                      disabled={isRewardEventSaveDisabled}
                      className={clsx(
                        "h-[40px] w-full rounded-[8px] text-white opacity-100 focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 active:scale-[0.96]",
                        {
                          "bg-[#F68DF6]": isRewardEventSaveDisabled,
                          "bg-[#C530C5] hover:bg-[#B82BB8] active:shadow-[0_6px_18px_rgba(197,48,197,0.18)]": !isRewardEventSaveDisabled,
                        },
                      )}
                    >
                      <p className="font-normal text-[16px] leading-[140%]">
                        Save
                      </p>
                    </Button>
                  </DisabledActionTooltip>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
