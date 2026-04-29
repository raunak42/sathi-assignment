import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  pressAnimationDelayMs?: number;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  pressAnimationDelayMs = 0,
}) => {
  const handleClick = () => {
    if (!onClick) {
      return;
    }

    if (pressAnimationDelayMs > 0) {
      window.setTimeout(() => {
        onClick();
      }, pressAnimationDelayMs);
      return;
    }

    onClick();
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={`transform-gpu transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 ${disabled ? "cursor-not-allowed opacity-60" : "hover:cursor-pointer"} ${className}`}
    >
      {children}
    </motion.button>
  );
};
