import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { GamificationBox } from "./GamificationBox";
import { Grid } from "./Grid";
import { GridMasks } from "./GridMasks";
import TopBar from "./Topbar";
import clsx from "clsx";

export const MainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardEventOpen, setIsRewardEventOpen] = useState(false);
  const [rewardEvent, setRewardEvent] = useState("");
  const [isRewardWithOpen, setIsRewardWithOpen] = useState(false);
  const [rewardWith, setRewardWith] = useState("");
  const [rewardWithAmount, setRewardWithAmount] = useState("");
  const [draftRewardWithAmount, setDraftRewardWithAmount] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [postCount, setPostCount] = useState("");
  const [duration, setDuration] = useState("");
  const [draftRewardAmount, setDraftRewardAmount] = useState("");
  const [draftPostCount, setDraftPostCount] = useState("");
  const [draftDuration, setDraftDuration] = useState("");
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isCommissionTierModalOpen, setIsCommissionTierModalOpen] =
    useState(false);
  const [isCommissionTierDropdownOpen, setIsCommissionTierDropdownOpen] =
    useState(false);
  const [commissionTier, setCommissionTier] = useState("");
  const [draftCommissionTier, setDraftCommissionTier] = useState("");
  const [highlightedRewardEventIndex, setHighlightedRewardEventIndex] =
    useState(0);
  const [highlightedRewardWithIndex, setHighlightedRewardWithIndex] =
    useState(0);
  const [highlightedDurationIndex, setHighlightedDurationIndex] = useState(-1);
  const [highlightedCommissionTierIndex, setHighlightedCommissionTierIndex] =
    useState(0);

  const selectedRewardEventIndex = rewardEvents.findIndex(
    (event) => event === rewardEvent,
  );
  const selectedRewardWithIndex = rewardWithOptions.findIndex(
    (option) => option === rewardWith,
  );
  const selectedCommissionTierIndex = commissionTierOptions.findIndex(
    (tier) => tier === commissionTier,
  );

  const closeRewardSystemModal = () => {
    setIsModalOpen(false);
    setIsRewardEventOpen(false);
    setIsRewardWithOpen(false);
    setIsDurationOpen(false);
    setIsCommissionTierModalOpen(false);
    setIsCommissionTierDropdownOpen(false);
  };

  const openCommissionTierModal = () => {
    setDraftCommissionTier(commissionTier);
    setIsCommissionTierModalOpen(true);
    setIsCommissionTierDropdownOpen(true);
    setHighlightedCommissionTierIndex(
      selectedCommissionTierIndex >= 0 ? selectedCommissionTierIndex : 0,
    );
  };

  const closeCommissionTierModal = () => {
    setDraftCommissionTier(commissionTier);
    setIsCommissionTierModalOpen(false);
    setIsCommissionTierDropdownOpen(false);
  };

  const selectCommissionTier = (tier: string) => {
    setDraftCommissionTier(tier);
    setIsCommissionTierDropdownOpen(false);
  };

  const saveCommissionTier = () => {
    if (!draftCommissionTier) {
      setIsCommissionTierDropdownOpen(true);
      return;
    }

    setCommissionTier(draftCommissionTier);
    setRewardWith("Upgrade Commission Tier");
    setIsCommissionTierModalOpen(false);
    setIsCommissionTierDropdownOpen(false);
  };

  const openRewardEventDropdown = () => {
    setIsRewardEventOpen(true);
    setIsRewardWithOpen(false);
    setDraftRewardAmount(rewardAmount);
    setDraftPostCount(postCount);
    setDraftDuration(duration);
    setHighlightedRewardEventIndex(
      selectedRewardEventIndex >= 0 ? selectedRewardEventIndex : 0,
    );
  };

  const selectRewardEvent = (event: string) => {
    setRewardEvent(event);
  };

  const openRewardWithDropdown = () => {
    setIsRewardWithOpen(true);
    setIsRewardEventOpen(false);
    setIsCommissionTierModalOpen(false);
    setIsCommissionTierDropdownOpen(false);
    setDraftRewardWithAmount(rewardWithAmount);
    setHighlightedRewardWithIndex(
      selectedRewardWithIndex >= 0 ? selectedRewardWithIndex : 0,
    );
  };

  const selectRewardWith = (option: string) => {
    if (option === "Flat $X bonus") {
      setRewardWith(option);
      return;
    }

    setIsRewardWithOpen(false);

    if (option === "Upgrade Commission Tier") {
      openCommissionTierModal();
    }
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

      selectRewardEvent(rewardEvents[highlightedRewardEventIndex]);
    }

    if (event.key === "Escape") {
      setIsRewardEventOpen(false);
    }
  };

  const handleRewardWithKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsRewardWithOpen(true);
      setHighlightedRewardWithIndex(
        (currentIndex) => (currentIndex + 1) % rewardWithOptions.length,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsRewardWithOpen(true);
      setHighlightedRewardWithIndex(
        (currentIndex) =>
          (currentIndex - 1 + rewardWithOptions.length) %
          rewardWithOptions.length,
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isRewardWithOpen) {
        openRewardWithDropdown();
        return;
      }

      selectRewardWith(rewardWithOptions[highlightedRewardWithIndex]);
    }

    if (event.key === "Escape") {
      setIsRewardWithOpen(false);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-start">
      <TopBar />
      {/* Content */}
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
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                onClick={closeRewardSystemModal}
                className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-[156px] backdrop-blur-[6px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <motion.div
                  onClick={(event) => event.stopPropagation()}
                  className="flex flex-col p-[24px] h-fit w-[400px] rounded-[16px] bg-white shadow-[0px_18px_42px_0px_#00000026]"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="w-full flex items-center justify-between">
                    <h2 className="font-medium text-[20px] leading-[140%]">
                      Create your reward system
                    </h2>
                    <button
                      onClick={closeRewardSystemModal}
                      className="rounded-full transition-all duration-150 ease-out hover:bg-[#F5F5F5] active:scale-95"
                    >
                      <img
                        alt="cross_modal"
                        src="/images/cross.png"
                        width={24}
                        height={24}
                      ></img>
                    </button>
                  </div>
                  <div className="mt-[16px] flex flex-col items-start">
                    <h3 className="font-normal text-[14px] leading-[140%] text-[#616161]">
                      Reward event{" "}
                      <span className="text-[#E51C00]">*</span>{" "}
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
                        onClick={() => {
                          if (isRewardEventOpen) {
                            setIsRewardEventOpen(false);
                            return;
                          }

                          openRewardEventDropdown();
                        }}
                        className={`w-full h-[40px] rounded-[8px] bg-white px-[10px] py-[9px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150 flex items-center ${
                          isRewardEventOpen
                            ? "border-[2px] border-[#C530C5]"
                            : "border-[1px] border-[#E3E3E3]"
                        } ${rewardEvent ? "text-[#303030]" : "text-[#B5B5B5]"}`}
                      >
                        {rewardEvent === "Cross $X in sales" && rewardAmount
                          ? `Cross $${rewardAmount} in sales`
                          : rewardEvent === "Posts X times every Y period" &&
                              postCount &&
                              duration
                            ? `Posts ${postCount} times every ${duration}`
                            : rewardEvent || "Select an event"}
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
                              onClick={() => {
                                setIsRewardEventOpen(false);
                                setIsDurationOpen(false);
                              }}
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
                                  onMouseLeave={() =>
                                    setHighlightedRewardEventIndex(-1)
                                  }
                                >
                                  <button
                                    aria-selected={rewardEvent === event}
                                    id={`reward-event-${index}`}
                                    onClick={() => selectRewardEvent(event)}
                                    onMouseEnter={() =>
                                      setHighlightedRewardEventIndex(index)
                                    }
                                    role="option"
                                    className={clsx(
                                      "hover:cursor-pointer w-full h-[40px] py-[9px] px-[10px] text-left rounded-[8px] flex items-center justify-between transition-all duration-150 ease-out active:scale-[0.99]",
                                      {
                                        "text-[#C530C5] bg-[#FFF5FF]":
                                          rewardEvent === event,
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
                                    {rewardEvent === event &&
                                      event === "Cross $X in sales" && (
                                        <motion.div
                                          className="mt-[4px] overflow-hidden"
                                          initial={{
                                            opacity: 0,
                                            height: 0,
                                            y: -6,
                                          }}
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
                                            className="flex h-[40px] w-full items-center rounded-[8px] border-[2px] border-[#C530C5] bg-white"
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
                                              value={draftRewardAmount}
                                              onChange={(event) =>
                                                setDraftRewardAmount(
                                                  event.target.value,
                                                )
                                              }
                                              onKeyDown={(event) =>
                                                event.stopPropagation()
                                              }
                                              placeholder="e.g. 100"
                                              className="h-full flex-1 bg-transparent px-[16px] font-normal text-[16px] leading-[140%] text-[#303030] outline-none placeholder:text-[#B5B5B5] tracking-tight"
                                            />
                                          </motion.div>
                                        </motion.div>
                                      )}
                                  </AnimatePresence>
                                  {rewardEvent === event &&
                                    event ===
                                      "Posts X times every Y period" && (
                                      <div className="mt-[4px] mb-[4px] grid grid-cols-2 gap-[8px]">
                                        <input
                                          value={draftPostCount}
                                          onChange={(event) =>
                                            setDraftPostCount(
                                              event.target.value,
                                            )
                                          }
                                          onKeyDown={(event) =>
                                            event.stopPropagation()
                                          }
                                          placeholder="eg: 4"
                                          className="w-full h-[40px] rounded-[8px] border border-[#E3E3E3] bg-white px-[10px] font-normal text-[16px] leading-[140%] text-[#303030] outline-none placeholder:text-[#B5B5B5] tracking-tight focus:border-[2px] focus:border-[#C530C5]"
                                        />
                                        <div className="relative">
                                          <button
                                            onClick={() =>
                                              setIsDurationOpen(
                                                (isOpen) => !isOpen,
                                              )
                                            }
                                            className={clsx(
                                              "w-full flex h-[40px] items-center justify-between rounded-[8px] bg-white px-[10px] font-normal text-[16px] leading-[140%]",
                                              {
                                                "border-[2px] border-[#C530C5] text-[#303030]":
                                                  isDurationOpen,
                                                "border border-[#E3E3E3] text-[#B5B5B5]":
                                                  !isDurationOpen &&
                                                  !draftDuration,
                                                "border border-[#E3E3E3] text-[#303030]":
                                                  !isDurationOpen &&
                                                  draftDuration,
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
                                                  onClick={() =>
                                                    setIsDurationOpen(false)
                                                  }
                                                />
                                                <motion.div
                                                  className="absolute left-0 right-0 top-[calc(100%+1px)] z-[60] overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                                                  onMouseLeave={() =>
                                                    setHighlightedDurationIndex(
                                                      -1,
                                                    )
                                                  }
                                                  initial={{
                                                    opacity: 0,
                                                    y: -6,
                                                    scale: 0.98,
                                                  }}
                                                  animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                  }}
                                                  exit={{
                                                    opacity: 0,
                                                    y: -6,
                                                    scale: 0.98,
                                                  }}
                                                  transition={{
                                                    duration: 0.16,
                                                    ease: "easeOut",
                                                  }}
                                                >
                                                  {durationOptions.map(
                                                    (duration, index) => (
                                                      <button
                                                        key={duration}
                                                        onClick={() => {
                                                          setDraftDuration(
                                                            duration,
                                                          );
                                                          setIsDurationOpen(
                                                            false,
                                                          );
                                                        }}
                                                        onMouseEnter={() =>
                                                          setHighlightedDurationIndex(
                                                            index,
                                                          )
                                                        }
                                                        className={clsx(
                                                          "hover:cursor-pointer w-full h-[40px] py-[9px] px-[10px] text-left rounded-[8px] flex items-center justify-between transition-all duration-150 ease-out active:scale-[0.99]",
                                                          {
                                                            "text-[#C530C5] bg-[#FFF5FF]":
                                                              draftDuration ===
                                                              duration,
                                                            "bg-[#F5F5F5] text-[#303030]":
                                                              draftDuration !==
                                                                duration &&
                                                              highlightedDurationIndex ===
                                                                index,
                                                            "text-[#303030]":
                                                              draftDuration !==
                                                                duration &&
                                                              highlightedDurationIndex !==
                                                                index,
                                                          },
                                                        )}
                                                      >
                                                        <p className="font-normal text-[16px] leading-[140%]">
                                                          {duration}
                                                        </p>
                                                        {draftDuration ===
                                                          duration && (
                                                          <img
                                                            alt="check"
                                                            src="/images/check.png"
                                                            width={15}
                                                          ></img>
                                                        )}
                                                      </button>
                                                    ),
                                                  )}
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
                                  onClick={() => {
                                    setDraftRewardAmount(rewardAmount);
                                    setDraftPostCount(postCount);
                                    setDraftDuration(duration);
                                    setIsRewardEventOpen(false);
                                  }}
                                  className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5]"
                                >
                                  <p className="font-normal text-[16px] leading-[140%]">
                                    Cancel
                                  </p>
                                </Button>
                                <Button
                                  onClick={() => {
                                    setRewardAmount(draftRewardAmount);
                                    setPostCount(draftPostCount);
                                    setDuration(draftDuration);
                                    setIsRewardEventOpen(false);
                                  }}
                                  className="h-[40px] flex-1 rounded-[8px] bg-[#EA75EA] text-white hover:bg-[#C530C5]"
                                >
                                  <p className="font-normal text-[16px] leading-[140%]">
                                    Save
                                  </p>
                                </Button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                    <div
                      className="mt-[16px] w-full"
                      onKeyDown={handleRewardWithKeyDown}
                    >
                      <h3 className="font-normal text-[14px] leading-[140%] text-[#616161]">
                        Reward with{" "}
                        <span className="text-[#E51C00]">*</span>{" "}
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
                          onClick={() => {
                            if (isRewardWithOpen) {
                              setIsRewardWithOpen(false);
                              return;
                            }

                            openRewardWithDropdown();
                          }}
                          className={clsx(
                            "w-full h-[40px] rounded-[8px] bg-white px-[10px] py-[9px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150 flex items-center",
                            {
                              "border-[2px] border-[#C530C5]": isRewardWithOpen,
                              "border border-[#E3E3E3]": !isRewardWithOpen,
                              "text-[#303030]": rewardWith,
                              "text-[#B5B5B5]": !rewardWith,
                            },
                          )}
                        >
                          {rewardWith === "Flat $X bonus" && rewardWithAmount
                            ? `Flat $${rewardWithAmount} bonus`
                            : rewardWith === "Upgrade Commission Tier" &&
                                commissionTier
                              ? commissionTier
                              : rewardWith || "Select reward type"}
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
                                onClick={() => setIsRewardWithOpen(false)}
                              />
                              <motion.div
                                className="absolute left-0 right-0 top-[calc(100%+1px)] z-50 overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                                id="reward-with-listbox"
                                role="listbox"
                                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.16, ease: "easeOut" }}
                              >
                                {rewardWithOptions.map((option, index) => (
                                  <div key={option}>
                                    <button
                                      aria-selected={rewardWith === option}
                                      id={`reward-with-${index}`}
                                      onClick={() => selectRewardWith(option)}
                                      onMouseEnter={() =>
                                        setHighlightedRewardWithIndex(index)
                                      }
                                      role="option"
                                      className={clsx(
                                        "hover:cursor-pointer w-full h-[40px] py-[9px] px-[10px] text-left rounded-[8px] flex items-center justify-between transition-all duration-150 ease-out active:scale-[0.99]",
                                        {
                                          "text-[#C530C5] bg-[#FFF5FF]":
                                            rewardWith === option,
                                          "bg-[#F5F5F5] text-[#303030]":
                                            rewardWith !== option &&
                                            highlightedRewardWithIndex ===
                                              index,
                                          "text-[#303030] hover:bg-[#F5F5F5]":
                                            rewardWith !== option &&
                                            highlightedRewardWithIndex !==
                                              index,
                                        },
                                      )}
                                    >
                                      <p className="font-normal text-[16px] leading-[140%]">
                                        {option}
                                      </p>
                                      {rewardWith === option && (
                                        <img
                                          alt="check"
                                          src="/images/check.png"
                                          width={15}
                                        ></img>
                                      )}
                                    </button>
                                    <AnimatePresence>
                                      {rewardWith === option &&
                                        option === "Flat $X bonus" && (
                                          <motion.div
                                            className="mt-[4px] overflow-hidden"
                                            initial={{
                                              opacity: 0,
                                              height: 0,
                                              y: -6,
                                            }}
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
                                              className="flex h-[40px] w-full items-center rounded-[8px] border-[2px] border-[#C530C5] bg-white"
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
                                                value={draftRewardWithAmount}
                                                onChange={(event) =>
                                                  setDraftRewardWithAmount(
                                                    event.target.value,
                                                  )
                                                }
                                                onKeyDown={(event) =>
                                                  event.stopPropagation()
                                                }
                                                placeholder="e.g. 100"
                                                className="h-full flex-1 bg-transparent px-[16px] font-normal text-[16px] leading-[140%] text-[#303030] outline-none placeholder:text-[#B5B5B5] tracking-tight"
                                              />
                                            </motion.div>
                                          </motion.div>
                                        )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                                {rewardWith === "Flat $X bonus" && (
                                  <div
                                    className="mt-[8px] flex gap-[8px]"
                                    onKeyDown={(event) =>
                                      event.stopPropagation()
                                    }
                                    role="none"
                                  >
                                    <Button
                                      onClick={() => {
                                        setDraftRewardWithAmount(
                                          rewardWithAmount,
                                        );
                                        setIsRewardWithOpen(false);
                                      }}
                                      className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5]"
                                    >
                                      <p className="font-normal text-[16px] leading-[140%]">
                                        Cancel
                                      </p>
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setRewardWithAmount(
                                          draftRewardWithAmount,
                                        );
                                        setIsRewardWithOpen(false);
                                      }}
                                      className="h-[40px] flex-1 rounded-[8px] bg-[#EA75EA] text-white hover:bg-[#C530C5]"
                                    >
                                      <p className="font-normal text-[16px] leading-[140%]">
                                        Save
                                      </p>
                                    </Button>
                                  </div>
                                )}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isCommissionTierModalOpen && (
              <motion.div
                onClick={closeCommissionTierModal}
                className="fixed inset-0 z-[60] flex items-start justify-center bg-black/20 pt-[156px] backdrop-blur-[6px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <motion.div
                  onClick={(event) => event.stopPropagation()}
                  className="flex h-fit w-[400px] flex-col rounded-[16px] bg-white p-[24px] shadow-[0px_18px_42px_0px_#00000026]"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="w-full flex items-center justify-between">
                    <h2 className="font-medium text-[20px] leading-[140%]">
                      Select a commission tier
                    </h2>
                    <button
                      onClick={closeCommissionTierModal}
                      className="rounded-full transition-all duration-150 ease-out hover:bg-[#F5F5F5] active:scale-95"
                    >
                      <img
                        alt="close_commission_tier_modal"
                        src="/images/cross.png"
                        width={24}
                        height={24}
                      ></img>
                    </button>
                  </div>
                  <div className="mt-[16px] flex flex-col items-start">
                    <h3 className="font-normal text-[14px] leading-[140%] text-[#616161]">
                      Upgrade to <span className="text-[#E51C00]">*</span>
                    </h3>
                    <div className="relative mt-[8px] w-full">
                      <button
                        onClick={() =>
                          setIsCommissionTierDropdownOpen((isOpen) => !isOpen)
                        }
                        className={clsx(
                          "w-full h-[40px] rounded-[8px] bg-white px-[10px] py-[9px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150 flex items-center",
                          {
                            "border-[2px] border-[#C530C5]":
                              isCommissionTierDropdownOpen,
                            "border border-[#E3E3E3]":
                              !isCommissionTierDropdownOpen,
                            "text-[#303030]": draftCommissionTier,
                            "text-[#B5B5B5]": !draftCommissionTier,
                          },
                        )}
                      >
                        {draftCommissionTier || "Select a tier"}
                      </button>
                      <img
                        alt="chevron"
                        src="/images/chevron.png"
                        width={13}
                        className={clsx(
                          "pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 transition-transform duration-150 ease-out",
                          {
                            "rotate-180": isCommissionTierDropdownOpen,
                          },
                        )}
                      ></img>
                      <AnimatePresence>
                        {isCommissionTierDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-[70]"
                              onClick={() =>
                                setIsCommissionTierDropdownOpen(false)
                              }
                            />
                            <motion.div
                              className="absolute left-0 right-0 top-[calc(100%+1px)] z-[80] overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                              onMouseLeave={() =>
                                setHighlightedCommissionTierIndex(-1)
                              }
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.16, ease: "easeOut" }}
                            >
                              {commissionTierOptions.map((tier, index) => (
                                <button
                                  key={tier}
                                  onClick={() => selectCommissionTier(tier)}
                                  onMouseEnter={() =>
                                    setHighlightedCommissionTierIndex(index)
                                  }
                                  className={clsx(
                                    "hover:cursor-pointer w-full h-[40px] py-[9px] px-[10px] text-left rounded-[8px] flex items-center justify-between transition-all duration-150 ease-out active:scale-[0.99]",
                                    {
                                      "text-[#C530C5] bg-[#FFF5FF]":
                                        draftCommissionTier === tier,
                                      "bg-[#F5F5F5] text-[#303030]":
                                        draftCommissionTier !== tier &&
                                        highlightedCommissionTierIndex ===
                                          index,
                                      "text-[#303030] hover:bg-[#F5F5F5]":
                                        draftCommissionTier !== tier &&
                                        highlightedCommissionTierIndex !==
                                          index,
                                    },
                                  )}
                                >
                                  <p className="font-normal text-[16px] leading-[140%]">
                                    {tier}
                                  </p>
                                  {draftCommissionTier === tier && (
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
                    <div className="mt-[8px] flex w-full gap-[8px]">
                      <Button
                        onClick={closeCommissionTierModal}
                        className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5]"
                      >
                        <p className="font-normal text-[16px] leading-[140%]">
                          Cancel
                        </p>
                      </Button>
                      <Button
                        onClick={saveCommissionTier}
                        className="h-[40px] flex-1 rounded-[8px] bg-[#EA75EA] text-white hover:bg-[#C530C5]"
                      >
                        <p className="font-normal text-[16px] leading-[140%]">
                          Save
                        </p>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const rewardEvents = [
  "Cross $X in sales",
  "Posts X times every Y period",
  "Is Onboarded",
];

const durationOptions = [
  "14 days",
  "1 month",
  "2 months",
  "3 months",
  "1 year",
];

const rewardWithOptions = ["Flat $X bonus", "Upgrade Commission Tier"];

const commissionTierOptions = [
  "Tier 1",
  "Tier 2",
  "Tier 3",
  "Tier 4",
  "Tier 5",
];

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
