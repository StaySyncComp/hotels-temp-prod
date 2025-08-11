import { Monitor, Smartphone, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GetDirection } from "@/lib/i18n";
import appShowcase from "@/assets/appShowcaseSvg.svg";
import chatbotShowcase from "@/assets/chatbotShowcaseSvg.svg";
import websiteShowcase from "@/assets/websiteShowcaseSvg.svg";
import Carousel from "./Carousel";

export default function FeaturePillars() {
  const { t } = useTranslation();
  const direction = GetDirection();

  const pillars = [
    {
      icon: Monitor,
      title: t("management_dashboard"),
      description: t("landing_page.feature_section.monitor_description"),
      img: websiteShowcase,
    },
    {
      icon: Smartphone,
      title: t("employee_app_title"),
      description: t("landing_page.feature_section.employee_app_description"),
      img: appShowcase,
    },
    {
      icon: Bot,
      title: t("smart_guest_assistant"),
      description: t("landing_page.feature_section.guest_app_description"),
      img: chatbotShowcase,
    },
  ];

  return (
    <section
      id="features"
      className="py-24 px-6"
      dir={direction ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("three_platforms_part1")} {""}
            <span className="bg-accent bg-clip-text text-transparent">
              {t("three_platforms_highlight")}
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            {t("built_for_all_users")}
          </p>
        </motion.div>

        <Carousel pillars={pillars} />
      </div>
    </section>
  );
}
