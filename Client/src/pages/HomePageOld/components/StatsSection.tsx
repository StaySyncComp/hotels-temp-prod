import React from "react";
import { GetDirection } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const stats = [
  { label: "landing_page.stats_section.stat_1" },
  { label: "landing_page.stats_section.stat_2" },
  { label: "landing_page.stats_section.stat_3" },
  { label: "landing_page.stats_section.stat_4" },
  { label: "landing_page.stats_section.stat_5" },
  { label: "landing_page.stats_section.stat_6" },
];
export default function StatsSection() {
  const direction = GetDirection();

  return (
    <section className="py-16 bg-foreground" dir={direction ? "rtl" : "ltr"}>
      <InfiniteScrollingLogosAnimation />
    </section>
  );
}
const InfiniteScrollingLogosAnimation = () => {
  const { t } = useTranslation();
  return (
    <div className="container m-auto">
      <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-foreground before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-foreground after:to-transparent after:content-['']">
        <motion.div
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
          initial={{ translateX: 0 }}
          animate={{ translateX: "-50%" }}
          className="flex flex-none gap-20 pr-16"
        >
          {[...new Array(2)].fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {stats.map(({ label }) => (
                <h1
                  key={label}
                  className="inline-block text-center text-white/80 text-lg font-semibold "
                >
                  {t(label)}
                </h1>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
