type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`hover:cursor-pointer transition-all duration-150 ease-out active:scale-[0.96] focus-visible:outline-none ${className}`}
    >
      {children}
    </button>
  );
};
