// components/ColoredIcon.tsx
import { useEffect, useState } from "react";
import { getIconUrl } from "@/lib/iconUtils";

interface ColoredIconProps {
  file?: string | null;
  className?: string;
  fill?: string; // optional – defaults to currentColor
  stroke?: string; // stroke color (hex, rgb, etc.)
}

export function ColoredIcon({
  file,
  className = "w-6 h-6",
  fill = "currentColor",
  stroke = "currentColor",
}: ColoredIconProps) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(getIconUrl(file || ""));
      if (!res.ok) return;
      let txt = await res.text();

      // Remove inline width & height
      txt = txt.replace(/width="[^"]*"/g, "");
      txt = txt.replace(/height="[^"]*"/g, "");

      // Fill: use currentColor so Tailwind text-* works
      txt = txt.replace(/fill="[^"]*"/g, `fill="currentColor"`);

      // Stroke: use CSS var, fallback to currentColor
      txt = txt.replace(
        /stroke="[^"]*"/g,
        `stroke="var(--icon-stroke, currentColor)"`
      );

      // Scale to container
      txt = txt.replace(
        "<svg",
        `<svg style="width:100%;height:100%;display:block;"`
      );

      setSvg(txt);
    }

    if (file) load();
    else setSvg("");
  }, [file]);

  return (
    <span
      className={className}
      style={
        {
          color: fill, // for fill (currentColor)
          "--icon-stroke": stroke, // for stroke
        } as React.CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
