import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../Button";
import { DisabledActionTooltip } from "../ui/disabled-action-tooltip";
import { ModalFrame } from "./ModalFrame";

type CommissionTierModalProps = {
  isOpen: boolean;
  commissionTier: string;
  commissionTierOptions: string[];
  onClose: () => void;
  onSave: (tier: string) => void;
};

export const CommissionTierModal: React.FC<CommissionTierModalProps> = ({
  isOpen,
  commissionTier,
  commissionTierOptions,
  onClose,
  onSave,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [draftCommissionTier, setDraftCommissionTier] =
    useState(commissionTier);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [highlightedCommissionTierIndex, setHighlightedCommissionTierIndex] =
    useState(() => {
      const selectedCommissionTierIndex = commissionTierOptions.findIndex(
        (tier) => tier === commissionTier,
      );

      return selectedCommissionTierIndex >= 0 ? selectedCommissionTierIndex : 0;
    });

  const handleClose = () => {
    onClose();
  };

  const isSaveDisabled = !draftCommissionTier;

  const focusSaveButton = () => {
    window.requestAnimationFrame(() => {
      saveButtonRef.current?.focus();
    });
  };

  const openCommissionTierDropdown = () => {
    const selectedCommissionTierIndex = commissionTierOptions.findIndex(
      (tier) => tier === draftCommissionTier,
    );

    setHighlightedCommissionTierIndex(
      selectedCommissionTierIndex >= 0 ? selectedCommissionTierIndex : 0,
    );
    setIsDropdownOpen(true);
  };

  const handleSelectCommissionTier = (tier: string) => {
    setDraftCommissionTier(tier);
    setIsDropdownOpen(false);
    focusSaveButton();
  };

  const handleSave = () => {
    if (!draftCommissionTier) {
      openCommissionTierDropdown();
      return;
    }

    setIsDropdownOpen(false);
    onSave(draftCommissionTier);
  };

  const handleCommissionTierKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!isDropdownOpen) {
        openCommissionTierDropdown();
        return;
      }

      setHighlightedCommissionTierIndex(
        (currentIndex) => (currentIndex + 1) % commissionTierOptions.length,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!isDropdownOpen) {
        openCommissionTierDropdown();
        return;
      }

      setHighlightedCommissionTierIndex(
        (currentIndex) =>
          (currentIndex - 1 + commissionTierOptions.length) %
          commissionTierOptions.length,
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isDropdownOpen) {
        openCommissionTierDropdown();
        return;
      }

      handleSelectCommissionTier(
        commissionTierOptions[highlightedCommissionTierIndex],
      );
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  return (
    <ModalFrame
      isOpen={isOpen}
      onClose={handleClose}
      title="Select a commission tier"
      closeAlt="close_commission_tier_modal"
      overlayClassName="z-[60]"
    >
      <div className="mt-[16px] flex flex-col items-start">
        <h3 className="font-normal text-[14px] leading-[140%] text-[#616161]">
          Upgrade to <span className="text-[#E51C00]">*</span>
        </h3>
        <div
          className="relative mt-[8px] w-full"
          onKeyDown={handleCommissionTierKeyDown}
        >
          <button
            type="button"
            onClick={() => {
              if (isDropdownOpen) {
                setIsDropdownOpen(false);
                return;
              }

              openCommissionTierDropdown();
            }}
            className={clsx(
              "flex h-[40px] w-full items-center rounded-[8px] bg-white px-[10px] py-[9px] pr-[32px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150",
              {
                "border-[2px] border-[#C530C5]": isDropdownOpen,
                "border border-[#E3E3E3]": !isDropdownOpen,
                "text-[#303030]": draftCommissionTier,
                "text-[#B5B5B5]": !draftCommissionTier,
              },
            )}
          >
            <span className="block w-full min-w-0 truncate">
              {draftCommissionTier || "Select a tier"}
            </span>
          </button>
          <img
            alt="chevron"
            src="/images/chevron.png"
            width={13}
            className={clsx(
              "pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 transition-transform duration-150 ease-out",
              {
                "rotate-180": isDropdownOpen,
              },
            )}
          ></img>
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-[70]"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <motion.div
                  className="absolute left-0 right-0 top-[calc(100%+1px)] z-[80] overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white p-[4px] shadow-[0px_12px_30px_0px_#00000026]"
                  onMouseLeave={() => setHighlightedCommissionTierIndex(-1)}
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  {commissionTierOptions.map((tier, index) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => {
                        handleSelectCommissionTier(tier);
                      }}
                      onMouseEnter={() =>
                        setHighlightedCommissionTierIndex(index)
                      }
                      className={clsx(
                        "hover:cursor-pointer flex w-full min-w-0 h-[40px] items-center justify-between rounded-[8px] px-[10px] py-[9px] text-left transition-all duration-150 ease-out active:scale-[0.99]",
                        {
                          "text-[#C530C5] bg-[#FFF5FF]":
                            draftCommissionTier === tier,
                          "bg-[#F5F5F5] text-[#303030]":
                            draftCommissionTier !== tier &&
                            highlightedCommissionTierIndex === index,
                          "text-[#303030] hover:bg-[#F5F5F5]":
                            draftCommissionTier !== tier &&
                            highlightedCommissionTierIndex !== index,
                        },
                      )}
                    >
                      <p className="min-w-0 flex-1 pr-[8px] truncate font-normal text-[16px] leading-[140%]">
                        {tier}
                      </p>
                      {draftCommissionTier === tier && (
                        <img
                          alt="check"
                          src="/images/check.png"
                          width={15}
                          className="shrink-0"
                        ></img>
                      )}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-[8px] grid w-full grid-cols-1 gap-[8px] min-[340px]:grid-cols-2">
          <Button
            onClick={handleClose}
            pressAnimationDelayMs={110}
            className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] active:scale-[0.96] active:shadow-[0_3px_10px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
          >
            <p className="whitespace-nowrap font-normal text-[15px] leading-[140%] min-[360px]:text-[16px]">Cancel</p>
          </Button>
          <DisabledActionTooltip
            show={isSaveDisabled}
            message="Select a commission tier to continue"
            className="flex-1"
          >
            <Button
              ref={saveButtonRef}
              onClick={handleSave}
              pressAnimationDelayMs={110}
              disabled={isSaveDisabled}
              className={clsx(
                "h-[40px] w-full rounded-[8px] text-white opacity-100 focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 active:scale-[0.96]",
                {
                  "bg-[#F68DF6]": isSaveDisabled,
                  "bg-[#C530C5] hover:bg-[#B82BB8] active:shadow-[0_6px_18px_rgba(197,48,197,0.18)]": !isSaveDisabled,
                },
              )}
            >
              <p className="whitespace-nowrap font-normal text-[15px] leading-[140%] min-[360px]:text-[16px]">Save</p>
            </Button>
          </DisabledActionTooltip>
        </div>
      </div>
    </ModalFrame>
  );
};
