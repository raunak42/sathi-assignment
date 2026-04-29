import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [draftCommissionTier, setDraftCommissionTier] =
    useState(commissionTier);
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

  const handleSave = () => {
    if (!draftCommissionTier) {
      setIsDropdownOpen(true);
      return;
    }

    setIsDropdownOpen(false);
    onSave(draftCommissionTier);
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
        <div className="relative mt-[8px] w-full">
          <button
            onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
            className={clsx(
              "w-full h-[40px] rounded-[8px] bg-white px-[10px] py-[9px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150 flex items-center",
              {
                "border-[2px] border-[#C530C5]": isDropdownOpen,
                "border border-[#E3E3E3]": !isDropdownOpen,
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
                      onClick={() => {
                        setDraftCommissionTier(tier);
                        setIsDropdownOpen(false);
                      }}
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
                            highlightedCommissionTierIndex === index,
                          "text-[#303030] hover:bg-[#F5F5F5]":
                            draftCommissionTier !== tier &&
                            highlightedCommissionTierIndex !== index,
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
            onClick={handleClose}
            pressAnimationDelayMs={110}
            className="h-[40px] flex-1 rounded-[8px] border border-[#E3E3E3] bg-white text-[#303030] hover:bg-[#F5F5F5] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] active:scale-[0.96] active:shadow-[0_3px_10px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30"
          >
            <p className="font-normal text-[16px] leading-[140%]">Cancel</p>
          </Button>
          <DisabledActionTooltip
            show={isSaveDisabled}
            message="Select a commission tier to continue"
            className="flex-1"
          >
            <Button
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
              <p className="font-normal text-[16px] leading-[140%]">Save</p>
            </Button>
          </DisabledActionTooltip>
        </div>
      </div>
    </ModalFrame>
  );
};
