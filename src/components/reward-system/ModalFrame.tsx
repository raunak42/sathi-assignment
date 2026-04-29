import { AnimatePresence, motion } from "framer-motion";

type ModalFrameProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeAlt: string;
  overlayClassName?: string;
  children: React.ReactNode;
};

export const ModalFrame: React.FC<ModalFrameProps> = ({
  isOpen,
  onClose,
  title,
  closeAlt,
  overlayClassName = "z-50",
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className={`fixed inset-0 ${overlayClassName} overflow-y-scroll bg-black/20 backdrop-blur-[6px] pb-[300px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="flex min-h-full w-full items-start justify-center px-[12px] pb-[48px] pt-[72px] min-[360px]:px-[16px] min-[360px]:pt-[80px] md:pt-[156px]">
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="flex h-fit w-full max-w-[400px] flex-col rounded-[16px] bg-white p-[18px] min-[360px]:p-[24px] shadow-[0px_18px_42px_0px_#00000026]"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative z-[120] flex w-full items-start justify-between gap-[12px]">
                <h2 className="min-w-0 flex-1 font-medium text-[18px] leading-[140%] min-[360px]:text-[20px]">{title}</h2>
                <button
                  onClick={onClose}
                  className="relative z-[120] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full transition-all duration-150 ease-out hover:cursor-pointer hover:bg-[#F5F5F5] active:scale-95"
                >
                  <img
                    alt={closeAlt}
                    src="/images/cross.png"
                    width={24}
                    height={24}
                  ></img>
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
