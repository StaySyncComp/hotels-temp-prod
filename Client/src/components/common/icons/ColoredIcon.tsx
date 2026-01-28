import { cn } from "@/lib/utils";
import React from "react";

interface ColoredIconProps {
  file: string;
  color: string;
  className?: string; // Standardize on className for size/layout tokens if needed
  height?: number | string;
  width?: number | string;
  // style?: React.CSSProperties; // Optional if existing code passes style
}

export const ColoredIcon: React.FC<ColoredIconProps> = ({
  file,
  color,
  className,
  height = 20, // Default inferred from context
  width = 20,
}) => {
  const url =
    "https://raw.githubusercontent.com/Hotels-Take-Over/hotels-icons/refs/heads/main/icons/";
  return (
    <img src={url + file} alt={file} className={cn(className, "w-5 h-5")} />
  );
};
