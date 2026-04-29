import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";
import clsx from "clsx";

type NotificationToastProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  variant?: "success";
  duration?: number;
  onClose: () => void;
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  isOpen,
  title,
  description,
  variant = "success",
  duration = 3500,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen || duration <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [duration, isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 24, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 24, y: -8, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed right-[24px] top-[24px] z-[200] w-[340px] max-w-[calc(100vw-32px)]"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-[12px] rounded-[12px] border border-[#E3E3E3] bg-white p-[12px] shadow-[0px_12px_30px_0px_#00000026]">
            <div
              className={clsx(
                "mt-[2px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full",
                {
                  "bg-[#E9F9EE] text-[#16A34A]": variant === "success",
                },
              )}
            >
              <CheckIcon className="h-[14px] w-[14px]" strokeWidth={3} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-[14px] leading-[140%] text-[#303030]">
                {title}
              </p>
              {description ? (
                <p className="mt-[2px] font-normal text-[12px] leading-[140%] text-[#616161]">
                  {description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[#616161] transition-colors duration-150 hover:cursor-pointer hover:bg-[#F5F5F5] hover:text-[#303030]"
              aria-label="Close notification"
            >
              <XIcon className="h-[14px] w-[14px]" strokeWidth={2.2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
