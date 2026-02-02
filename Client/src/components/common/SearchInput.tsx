import React from "react";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "icon" | "iconEnd"
> {
  /**
   * Width of the search input. Can be any valid Tailwind width class or custom CSS value.
   * @default "w-[340px]"
   */
  width?: string;

  /**
   * Height of the search input. Can be any valid Tailwind height class or custom CSS value.
   * @default "h-11"
   */
  height?: string;

  /**
   * Custom search icon. If not provided, defaults to lucide-react Search icon.
   */
  searchIcon?: React.ReactNode;

  /**
   * Size of the search icon.
   * @default "child:size-5"
   */
  iconSize?: string;

  /**
   * Additional classes for the container.
   */
  containerClassName?: string;
}

/**
 * SearchInput - A reusable search input component with RTL support
 *
 * Features:
 * - RTL-aware: Search icon automatically positions on the right in RTL, left in LTR
 * - Flexible sizing: Customizable width and height
 * - Fully typed: Extends all Input component props
 * - Accessible: Inherits all accessibility features from base Input
 *
 * @example
 * ```tsx
 * // Default usage
 * <SearchInput placeholder="Search..." />
 *
 * // Custom width and height
 * <SearchInput width="w-full" height="h-12" placeholder="Search..." />
 *
 * // With custom icon
 * <SearchInput searchIcon={<CustomSearchIcon />} placeholder="Search..." />
 * ```
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      width = "w-[340px]",
      height = "h-11",
      searchIcon,
      iconSize = "child:size-5",
      containerClassName,
      className,
      placeholder,
      ...props
    },
    ref,
  ) => {
    // Default search icon
    const defaultIcon = <Search className="text-muted-foreground" />;

    return (
      <div className={cn("flex items-center", containerClassName)}>
        <Input
          ref={ref}
          type="text"
          icon={searchIcon || defaultIcon}
          iconSize={iconSize}
          placeholder={placeholder}
          className={cn(
            width,
            height,
            "bg-surface border-border focus:bg-white focus:border-blue-400 transition-all rounded-3xl",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
