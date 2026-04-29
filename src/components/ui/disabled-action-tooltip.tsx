import * as React from "react";

import { cn } from "@/lib/utils";

type DisabledActionTooltipProps = {
  show: boolean;
  message: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

function DisabledActionTooltip({
  show,
  message,
  className,
  contentClassName,
  children,
}: DisabledActionTooltipProps) {
  return (
    <div className={cn("relative group/disabled-tooltip", className)}>
      {children}
      {show && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-[100] w-max max-w-[calc(100vw-32px)] -translate-x-1/2 translate-y-[-4px] rounded-[8px] bg-[#303030] p-[8px] text-center font-normal text-[12px] leading-[140%] text-[#FFFFFF] opacity-0 shadow-[0px_10px_28px_0px_#00000033] transition-all duration-150 ease-out whitespace-normal break-words sm:max-w-[600px] sm:whitespace-nowrap group-hover/disabled-tooltip:translate-y-0 group-hover/disabled-tooltip:opacity-100 group-focus-within/disabled-tooltip:translate-y-0 group-focus-within/disabled-tooltip:opacity-100",
            contentClassName,
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export { DisabledActionTooltip };
