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
          <div className="flex min-h-full w-full items-start justify-center px-[16px] pt-[80px] pb-[48px] md:pt-[156px]">
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="flex h-fit w-[400px] max-w-full flex-col rounded-[16px] bg-white p-[24px] shadow-[0px_18px_42px_0px_#00000026]"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="w-full flex items-center justify-between">
                <h2 className="font-medium text-[20px] leading-[140%]">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-full transition-all duration-150 ease-out hover:bg-[#F5F5F5] active:scale-95"
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
