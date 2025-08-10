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
  // const pillars = [
  //   {
  //     icon: Monitor,
  //     title: t("management_dashboard"),
  //     description: t("management_dashboard_desc"),
  //     features: [
  //       t("employee_management"),
  //       t("call_tracking"),
  //       t("call_creation"),
  //       t("performance_analytics"),
  //     ],
  //     gradient: "from-blue-500 to-indigo-600",
  //     shadow: "blue-500",
  //     bgGradient: "from-blue-50 to-indigo-50",
  //     img: websiteShowcase,
  //   },
  //   {
  //     icon: Smartphone,
  //     title: t("employee_app_title"),
  //     description: t("employee_app_desc"),
  //     features: [
  //       t("task_assignment"),
  //       t("issue_resolution"),
  //       t("team_communication"),
  //       t("real_time_updates"),
  //     ],
  //     gradient: "from-purple-500 to-pink-600",
  //     shadow: "shadow-purple-500/20",
  //     bgGradient: "from-purple-50 to-pink-50",
  //     img: appShowcase,
  //   },
  //   {
  //     icon: Bot,
  //     title: t("smart_guest_assistant"),
  //     description: t("smart_guest_assistant_desc"),
  //     features: [
  //       t("hotel_data_lake"),
  //       t("instant_response"),
  //       t("multilingual_support"),
  //       t("smart_routing"),
  //     ],
  //     gradient: "from-cyan-500 to-teal-600",
  //     shadow: "cyan-500",
  //     bgGradient: "from-cyan-50 to-teal-50",
  //     img: chatbotShowcase,
  //   },
  // ];

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
