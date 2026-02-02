import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Pillar = { title: string; description?: string; img: string | any };

const ThreePillarCarousel = ({ pillars: input }: { pillars: Pillar[] }) => {
  const initial =
    input.length >= 3
      ? input.slice(0, 3)
      : Array.from({ length: 3 }, (_, i) => input[i % input.length]);

  const [items, setItems] = useState<Pillar[]>(initial);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const swapWithCenter = (sideIndex: 0 | 2) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setItems((prev) => {
      const next = [...prev];
      [next[1], next[sideIndex]] = [next[sideIndex], next[1]];
      return next;
    });

    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="relative w-full">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Prev Button */}
          <button
            onClick={() => swapWithCenter(0)}
            disabled={isTransitioning}
            aria-label="Previous"
            className="p-3 sm:p-4 rounded-full bg-white shadow hover:scale-110 transition-transform"
          >
            <ChevronLeft className="rtl:rotate-180" size={20} />
          </button>

          {/* Items Wrapper */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 w-full">
            {/* Left */}
            <div
              onClick={() => swapWithCenter(0)}
              className="transform transition-all duration-300 ease-in-out cursor-pointer select-none scale-90 sm:scale-75 opacity-80 blur-sm hover:scale-95 hover:opacity-90 hover:blur-none"
            >
              <img
                src={items[0].img}
                alt={items[0].title}
                className="max-w-[200px] sm:max-w-[300px] max-h-[250px] sm:max-h-[350px] object-contain"
              />
              <h3 className="mt-4 text-center font-medium text-base sm:text-lg">
                {items[0].title}
              </h3>
            </div>

            {/* Center */}
            <div className="transform transition-all duration-300 ease-in-out select-none flex flex-col items-center">
              <div className="h-auto sm:h-[600px] flex items-end">
                <img
                  src={items[1].img}
                  alt={items[1].title}
                  className="max-w-[250px] sm:max-w-[700px] max-h-[300px] sm:max-h-[600px] object-contain"
                />
              </div>
              <h2 className="mt-4 sm:mt-6 text-center text-xl sm:text-2xl font-semibold">
                {items[1].title}
              </h2>
              {items[1].description && (
                <p className="mt-2 text-center text-foreground/75 max-w-xs sm:max-w-[450px] font-medium text-sm sm:text-base">
                  {items[1].description}
                </p>
              )}
            </div>

            {/* Right */}
            <div
              onClick={() => swapWithCenter(2)}
              className="transform transition-all duration-300 ease-in-out cursor-pointer select-none scale-90 sm:scale-75 opacity-80 blur-sm hover:scale-95 hover:opacity-90 hover:blur-none"
            >
              <img
                src={items[2].img}
                alt={items[2].title}
                className="max-w-[200px] sm:max-w-[300px] max-h-[250px] sm:max-h-[350px] object-contain"
              />
              <h3 className="mt-4 text-center font-medium text-base sm:text-lg">
                {items[2].title}
              </h3>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => swapWithCenter(2)}
            disabled={isTransitioning}
            aria-label="Next"
            className="p-3 sm:p-4 rounded-full bg-white shadow hover:scale-110 transition-transform"
          >
            <ChevronRight className="rtl:rotate-180" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreePillarCarousel;
