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
      const tmp = next[1];
      next[1] = next[sideIndex];
      next[sideIndex] = tmp;
      return next;
    });

    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 ">
      <div className="relative w-full">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => swapWithCenter(0)}
            disabled={isTransitioning}
            aria-label="Previous"
            className="p-4 rounded-full bg-white shadow hover:scale-110 transition-transform "
          >
            <ChevronLeft className="rtl:rotate-180" size={24} />
          </button>

          <div className="flex items-end justify-center gap-16 min-h-[500px]">
            {/* Left */}
            <div
              onClick={() => swapWithCenter(0)}
              className={`transform transition-all duration-300 ease-in-out cursor-pointer select-none scale-75 opacity-70 blur-sm hover:scale-80 hover:opacity-90 hover:blur-none`}
            >
              <img
                src={items[0].img}
                alt={items[0].title}
                className="max-w-[300px] max-h-[350px] object-contain"
              />
              <h3 className="mt-4 text-center font-medium text-lg">
                {items[0].title}
              </h3>
            </div>

            {/* Center */}
            <div
              className={`transform transition-all duration-300 ease-in-out select-none flex flex-col items-center`}
            >
              <div className="h-[600px] flex items-end">
                <img
                  src={items[1].img}
                  alt={items[1].title}
                  className="max-w-[700px] max-h-[600px] object-contain "
                />
              </div>
              <h2 className="mt-6 text-center text-2xl font-semibold">
                {items[1].title}
              </h2>
              {items[1].description && (
                <p className="mt-2 text-center text-foreground/75 w-[450px] font-medium">
                  {items[1].description}
                </p>
              )}
            </div>

            {/* Right */}
            <div
              onClick={() => swapWithCenter(2)}
              className={`transform transition-all duration-300 ease-in-out cursor-pointer select-none scale-75 opacity-70 blur-sm hover:scale-80 hover:opacity-90 hover:blur-none`}
            >
              <img
                src={items[2].img}
                alt={items[2].title}
                className="max-w-[300px] max-h-[350px] object-contain"
              />
              <h3 className="mt-4 text-center font-medium text-lg">
                {items[2].title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => swapWithCenter(2)}
            disabled={isTransitioning}
            aria-label="Next"
            className="p-4 rounded-full bg-white shadow hover:scale-110 transition-transform"
          >
            <ChevronRight className="rtl:rotate-180" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreePillarCarousel;
