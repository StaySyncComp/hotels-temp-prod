import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
  label?: string | React.ReactNode;
  className?: string;
  type?: string;
  iconSize?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconEnd,
      iconSize = "child:size-5",
      label,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative flex flex-col gap-2", className)}>
        {/* Label */}
        {label && (
          <div className="w-full rtl:text-right ltr:text-left">
            <Label htmlFor={String(label)}>{label}</Label>
          </div>
        )}

        {/* Start Icon */}
        {icon && (
          <div
            className={`absolute rtl:right-3 ltr:left-3 bottom-0 h-full flex items-center justify-center ${iconSize}`}
          >
            {icon}
          </div>
        )}

        {/* End Icon */}
        {iconEnd && (
          <div className="absolute ltr:right-3 rtl:left-3 bottom-0 flex items-center justify-center h-full child:size-5">
            {iconEnd}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          id={String(label)}
          {...props}
          className={cn(
            // Core layout
            "w-full px-4 py-3 rounded-lg transition-all",

            // Base colors
            "bg-surface border border-gray-300 text-foreground placeholder:text-muted-foreground",

            // Focus ring
            "focus:outline-none focus:ring-[1.5px] focus:ring-blue-500",

            // Disabled state
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

            // Error state via aria-invalid
            "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",

            // RTL input alignment
            "rtl:text-right ltr:text-left",

            // Icon spacing adjustments
            icon && "rtl:pr-10 ltr:pl-10",
            iconEnd && "ltr:pr-10 rtl:pl-10",

            className
          )}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
