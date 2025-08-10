import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LottieAnimation from "@/components/miscellaneous/LottieAnimation";
import AppShowcase from "@/assets/animations/lottie/AppShowcase.json";
import Chatbot from "@/assets/animations/lottie/Chatbot.json";
import { useTranslation } from "react-i18next";

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
  const ref = useRef(null);
  // Fallback when viewport is extremely tall / zoomed-out
  const isZoomedOut = useMediaQuery("(min-height: 1700px)");
  const isZoomedIn = useMediaQuery("(max-height: 700px)");
  const useFallback = isZoomedOut || isZoomedIn;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Text transition range
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

  // Lottie crossfade timing inside text transition
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

  // Static fallback for zoomed-out
  if (useFallback) {
    return (
      <section className="py-40 bg-border/20">
        <div className=" max-w-7xl m-auto">
          {/* App Showcase */}
          <div className="flex justify-between w-full items-center">
            <div className="max-w-[50%] -mt-44">
              <h1 className="text-5xl font-semibold mb-10">
                {t("landing_page.mobile_showcase_section.first_showcase.title")}
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
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
            <div className="relative ">
              <div className="absolute inset-0 h-[600px] w-[23rem] shadow-2xl shadow-primary/80 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></div>
              <LottieAnimation animationData={AppShowcase} height={800} loop />
            </div>
          </div>
          {/* End of App Showcase */}
          {/* Bot Showcase */}
          <div className="flex justify-between w-full items-center mt-40">
            <div className="max-w-[50%] -mt-44">
              <h1 className="text-5xl font-semibold mb-4 -mt-24">
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.title"
                )}
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
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
            <div className="relative ">
              <div className="absolute inset-0 h-[600px] w-[23rem] shadow-2xl shadow-primary/80 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></div>
              <LottieAnimation animationData={Chatbot} height={800} loop />
            </div>
          </div>
          {/* End of Bot Showcase */}
        </div>
      </section>
    );
  }

  // Parallax effect
  return (
    <section ref={ref} className="relative h-[250vh] bg-border/20 ">
      {/* Sticky showcase container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="flex flex-row-reverse w-full max-w-7xl gap-12">
          {/* Lottie animations (left) */}
          <div className="relative w-1/2 flex justify-end">
            <motion.div className="absolute" style={{ opacity: appOpacity }}>
              <div className="absolute h-[600px] w-full shadow-2xl shadow-primary/60 top-32 left-0"></div>
              <LottieAnimation animationData={AppShowcase} height={800} loop />
            </motion.div>
            <motion.div className="absolute" style={{ opacity: botOpacity }}>
              <div className="absolute h-[600px] w-full shadow-2xl shadow-primary/60 top-32 left-0"></div>

              <LottieAnimation animationData={Chatbot} height={800} loop />
            </motion.div>
          </div>

          {/* Text container (right) */}
          <div className="w-1/2 relative h-[600px] overflow-visible">
            <motion.div
              style={{ y: oldY, opacity: oldOpacity }}
              className="absolute top-0 left-0 w-full flex flex-col justify-center h-full"
            >
              <h1 className="text-5xl font-semibold mb-4 -mt-24">
                {t("landing_page.mobile_showcase_section.first_showcase.title")}
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
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
              className="absolute top-0 left-0 w-full flex flex-col justify-center h-full"
            >
              <h1 className="text-5xl font-semibold mb-4 -mt-24">
                {t(
                  "landing_page.mobile_showcase_section.second_showcase.title"
                )}
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
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
      {/* Extra scroll space to extend parallax */}
      <div className="h-[200vh]" />
    </section>
  );
}
