import { motion } from "framer-motion";
import { forwardRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  pressAnimationDelayMs?: number;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  pressAnimationDelayMs = 0,
}, ref) => {
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
      ref={ref}
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
});

Button.displayName = "Button";
