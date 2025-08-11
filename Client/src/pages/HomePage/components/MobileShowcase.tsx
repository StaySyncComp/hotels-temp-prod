import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LottieAnimation from "@/components/miscellaneous/LottieAnimation";
import AppShowcase from "@/assets/animations/lottie/AppShowcase.json";
import Chatbot from "@/assets/animations/lottie/Chatbot.json";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

// Hook for media queries
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

export default function MobileShowcase() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const ref = useRef(null);

  // Detect extreme zooms
  const isZoomedOut = useMediaQuery("(min-height: 1700px)");
  const isZoomedIn = useMediaQuery("(max-height: 700px)");
  const useFallback = isZoomedOut || isZoomedIn;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const textStart = 0.2;
  const textEnd = 0.6;
  const slideRange = [textStart, textEnd];

  const oldY = useTransform(scrollYProgress, slideRange, ["0%", "-100%"]);
  const newY = useTransform(scrollYProgress, slideRange, ["100%", "0%"]);

  const oldOpacity = useTransform(
    scrollYProgress,
    [0, textStart, textEnd, 1],
    [1, 1, 0, 0]
  );
  const newOpacity = useTransform(
    scrollYProgress,
    [0, textStart, textEnd, 1],
    [0, 0, 1, 1]
  );

  const crossStart = textStart + (textEnd - textStart) * 0.4;
  const crossEnd = crossStart + 0.1;
  const appOpacity = useTransform(
    scrollYProgress,
    [crossStart, crossEnd],
    [1, 0]
  );
  const botOpacity = useTransform(
    scrollYProgress,
    [crossStart, crossEnd],
    [0, 1]
  );

  // 📱 Fallback layout — mobile-friendly now
  if (useFallback) {
    return (
      <section className="py-20 sm:py-40 bg-border/20">
        <div className="max-w-7xl m-auto px-4">
          {/* App Showcase */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="lg:max-w-[50%] text-center lg:text-left">
              <h1 className="text-3xl sm:text-5xl font-semibold mb-6 sm:mb-10">
                {t("landing_page.mobile_showcase_section.first_showcase.title")}
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground font-medium">
                {t(
                  "landing_page.mobile_showcase_section.first_showcase.main_description"
                )}
                <span className="text-foreground">
                  {t(
                    "landing_page.mobile_showcase_section.first_showcase.highlighted"
                  )}
                </span>
                {t(
                  "landing_page.mobile_showcase_section.first_showcase.continued_description"
                )}
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 h-[400px] sm:h-[600px] w-[15rem] sm:w-[23rem] shadow-2xl shadow-primary/80 top-1/2 -translate-y-1/2"></div>
              <LottieAnimation
                animationData={AppShowcase}
                height={500}
                smHeight={800}
                loop
              />
            </div>
          </div>

          {/* Bot Showcase */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mt-20 sm:mt-40">
            <div className="lg:max-w-[50%] text-center lg:text-left">
              <h1 className="text-3xl sm:text-5xl font-semibold mb-6 sm:mb-10">
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.title"
                )}
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground font-medium">
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.main_description"
                )}
                <span className="text-foreground">
                  {t(
                    "landing_page.mobile_showcase_section.second_showcase.highlighted"
                  )}
                </span>
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.continued_description"
                )}
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 h-[400px] sm:h-[600px] w-[15rem] sm:w-[23rem] shadow-2xl shadow-primary/80 top-1/2 -translate-y-1/2"></div>
              <LottieAnimation
                animationData={Chatbot}
                height={isMobile ? 500 : 800} // detect mobile in JS
                loop
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 🎯 Parallax version — responsive
  return (
    <section ref={ref} className="relative h-[250vh] bg-border/20">
      <div className="sticky top-0 h-[150dvh] flex items-center justify-center px-4 overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row-reverse w-full max-w-7xl gap-8 lg:gap-12">
          {/* Animations */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div className="absolute" style={{ opacity: appOpacity }}>
              <div className="absolute h-[400px] sm:h-[600px] w-full shadow-2xl shadow-primary/60 top-10 lg:top-32"></div>
              <LottieAnimation
                animationData={AppShowcase}
                height={isMobile ? 500 : 800} // detect mobile in JS
                loop
              />
            </motion.div>
            <motion.div className="absolute" style={{ opacity: botOpacity }}>
              <div className="absolute h-[400px] sm:h-[600px] w-full shadow-2xl shadow-primary/60 top-10 lg:top-32"></div>
              <LottieAnimation
                animationData={Chatbot}
                height={isMobile ? 500 : 800} // detect mobile in JS
                loop
              />
            </motion.div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[600px]">
            <motion.div
              style={{ y: oldY, opacity: oldOpacity }}
              className="absolute top-0 left-0 w-full flex flex-col justify-center h-full text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
                {t("landing_page.mobile_showcase_section.first_showcase.title")}
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground font-medium">
                {t(
                  "landing_page.mobile_showcase_section.first_showcase.main_description"
                )}
                <span className="text-foreground">
                  {t(
                    "landing_page.mobile_showcase_section.first_showcase.highlighted"
                  )}
                </span>
                {t(
                  "landing_page.mobile_showcase_section.first_showcase.continued_description"
                )}
              </p>
            </motion.div>
            <motion.div
              style={{ y: newY, opacity: newOpacity }}
              className="absolute top-0 left-0 w-full flex flex-col justify-center h-full text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.title"
                )}
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground font-medium">
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.main_description"
                )}
                <span className="text-foreground">
                  {t(
                    "landing_page.mobile_showcase_section.second_showcase.highlighted"
                  )}
                </span>
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.continued_description"
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-[200vh]" />
    </section>
  );
}
