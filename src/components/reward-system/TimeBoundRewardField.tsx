import { addDays, format, isSameMonth, startOfDay, startOfMonth } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Calendar as CalendarIcon,
} from "lucide-react";
import { type ButtonHTMLAttributes, useMemo, useState } from "react";
import clsx from "clsx";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type TimeBoundRewardFieldProps = {
  isTimeBoundEnabled: boolean;
  selectedDate?: Date;
  onTimeBoundEnabledChange: (isEnabled: boolean) => void;
  onSelectedDateChange: (date: Date | undefined) => void;
};

export const TimeBoundRewardField: React.FC<TimeBoundRewardFieldProps> = ({
  isTimeBoundEnabled,
  selectedDate,
  onTimeBoundEnabledChange,
  onSelectedDateChange,
}) => {
  const minimumSelectableDate = addDays(startOfDay(new Date()), 1);
  const previewSelectedDate = minimumSelectableDate;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(selectedDate ?? previewSelectedDate);

  const calendarClassNames = useMemo(
    () => ({
      root: "w-full",
      months: "flex flex-col",
      month: "flex w-full flex-col gap-[10px]",
      nav: "absolute left-[16px] right-[14px] top-[15px] z-20 flex items-center justify-between",
      button_previous:
        "relative z-20 h-[32px] w-[32px] cursor-pointer rounded-[8px] border border-[#E3E3E3] bg-white p-0 text-[#616161] shadow-[0px_1px_2px_0px_#0000000F] hover:bg-[#F5F5F5] hover:text-[#303030] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30",
      button_next:
        "relative z-20 h-[32px] w-[32px] cursor-pointer rounded-[8px] border border-[#E3E3E3] bg-white p-0 text-[#616161] shadow-[0px_1px_2px_0px_#0000000F] hover:bg-[#F5F5F5] hover:text-[#303030] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30",
      month_caption:
        "relative flex h-[32px] w-full items-center justify-center px-[48px]",
      caption_label:
        "font-medium text-[14px] leading-[140%] text-[#303030]",
      weekdays: "mt-[10px] flex",
      weekday:
        "h-[24px] w-[36px] font-normal text-[14px] leading-[140%] text-[#616161]",
      week: "mt-[6px] flex w-full",
      day: "h-[36px] w-[36px] p-0 text-center",
      day_button:
        "h-[36px] w-[36px] cursor-pointer rounded-[8px] border-0 p-0 font-semibold text-[14px] leading-[140%] text-[#303030] shadow-none hover:bg-[#F5F5F5] hover:text-[#303030] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 data-[selected-single=true]:bg-[#C530C5] data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-[#C530C5] data-[selected-single=true]:hover:text-white",
      selected: "bg-[#C530C5] text-white rounded-[8px]",
      today: "text-[#303030]",
      outside: "text-[#616161]",
      disabled: "cursor-not-allowed text-[#303030] opacity-100",
      hidden: "invisible",
    }),
    [],
  );

  const renderNavButton = (
    props: ButtonHTMLAttributes<HTMLButtonElement>,
    direction: "left" | "right",
  ) => {
    const { className, ...buttonProps } = props;

    return (
      <button
        {...buttonProps}
        className={clsx(
          "relative z-20 flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-white text-[#616161] shadow-[0px_1px_2px_0px_#00000014] transition-colors duration-150 hover:bg-[#F5F5F5] hover:text-[#303030] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
          className,
        )}
      >
        {direction === "left" ? (
          <ArrowLeftIcon className="h-[16px] w-[16px]" strokeWidth={1.9} />
        ) : (
          <ArrowRightIcon className="h-[16px] w-[16px]" strokeWidth={1.9} />
        )}
      </button>
    );
  };

  return (
    <div className="mt-[16px] w-full">
      <div className="flex items-center justify-between gap-[12px]">
        <p className="font-medium text-[14px] leading-[140%] text-[#303030]">
          Make the reward time bound
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={isTimeBoundEnabled}
          onClick={() => {
            const nextIsEnabled = !isTimeBoundEnabled;

            if (nextIsEnabled) {
              setVisibleMonth(selectedDate ?? previewSelectedDate);
            }

            if (!nextIsEnabled) {
              setIsCalendarOpen(false);
              setVisibleMonth(selectedDate ?? previewSelectedDate);
            }

            onTimeBoundEnabledChange(nextIsEnabled);
          }}
          className={clsx(
            "relative h-[20px] w-[32px] cursor-pointer rounded-full transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C530C5]/30",
            {
              "bg-[#C530C5]": isTimeBoundEnabled,
              "bg-[#CFCFCF]": !isTimeBoundEnabled,
            },
          )}
        >
          <span
            className={clsx(
              "absolute left-[2px] top-[2px] h-[16px] w-[16px] rounded-full bg-white [box-shadow:0px_1.55px_0.52px_0px_#0000000F,0px_1.55px_4.13px_0px_#00000026] transition-transform duration-150 ease-out",
              {
                "translate-x-[12px]": isTimeBoundEnabled,
                "translate-x-0": !isTimeBoundEnabled,
              },
            )}
          />
        </button>
      </div>
      <p className="mt-[4px] w-full whitespace-nowrap font-normal text-[12px] leading-[150%] text-[#616161]">
        Choose an end date to stop this reward automatically.
      </p>
      <AnimatePresence>
        {isTimeBoundEnabled && (
          <motion.div
            className="mt-[12px] overflow-hidden"
            initial={{ opacity: 0, height: 0, y: -6 }}
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
              <Popover
                open={isCalendarOpen}
                onOpenChange={(open) => {
                  setIsCalendarOpen(open);

                  if (open) {
                    setVisibleMonth(selectedDate ?? previewSelectedDate);
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={clsx(
                      "flex h-[40px] w-full items-center gap-[10px] rounded-[8px] bg-white px-[10px] py-[9px] text-left font-normal text-[16px] leading-[140%] outline-none transition-colors duration-150 hover:cursor-pointer",
                      {
                        "border-[2px] border-[#C530C5]": isCalendarOpen,
                        "border border-[#E3E3E3]": !isCalendarOpen,
                        "text-[#303030]": selectedDate,
                        "text-[#B5B5B5]": !selectedDate,
                      },
                    )}
                  >
                    <CalendarIcon
                      className={clsx("h-[20px] w-[20px]", {
                        "text-[#616161]": selectedDate,
                        "text-[#B5B5B5]": !selectedDate,
                      })}
                    />
                    <span>
                      {selectedDate
                        ? format(selectedDate, "d MMM, yyyy")
                        : "Select End Date"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  portalled={false}
                  side="bottom"
                  align="start"
                  sideOffset={0}
                  avoidCollisions={false}
                  className="z-[90] w-[284px] rounded-[12px] border border-[#E3E3E3] bg-white p-0 shadow-[0px_12px_30px_0px_#00000026] ring-0"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={visibleMonth}
                    onMonthChange={setVisibleMonth}
                    startMonth={startOfMonth(minimumSelectableDate)}
                    disabled={(date) =>
                      date < minimumSelectableDate ||
                      !isSameMonth(date, visibleMonth)
                    }
                    className="w-full bg-white p-[16px]"
                    classNames={calendarClassNames}
                    components={{
                      PreviousMonthButton: (props) =>
                        renderNavButton(props, "left"),
                      NextMonthButton: (props) => renderNavButton(props, "right"),
                    }}
                    onSelect={(date) => {
                      onSelectedDateChange(date);

                      if (date) {
                        setVisibleMonth(date);
                        setIsCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
