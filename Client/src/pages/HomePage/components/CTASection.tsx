import { CheckCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GetDirection } from "@/lib/i18n";
import { useNavigate } from "react-router-dom";
import ContactPage from "@/pages/ContactPage.tsx";

export default function ContactCTA() {
  const { t } = useTranslation();
  const direction = GetDirection();
  const navigate = useNavigate();

  const features = [
    { text: t("custom_changes_per_hotel"), icon: Rocket },
    { text: t("no_setup_fees"), icon: CheckCircle },
    { text: t("cancel_anytime"), icon: CheckCircle },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-border/5 via-white to-white px-6 sm:px-10"
      dir={direction ? "rtl" : "ltr"}
    >
      <ContactPage />
    </section>
  );
  //   <section
  //     className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white px-6 sm:px-10"
  //     dir={direction ? "rtl" : "ltr"}
  //   >
  //     <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 sm:p-12 lg:p-20 relative overflow-hidden">
  //       {/* optional background shapes */}
  //       <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
  //       <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>

  //       <div className="flex flex-col gap-8">
  //         <motion.h2
  //           initial={{ opacity: 0, y: 30 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //           className="text-3xl sm:text-4xl font-bold text-foreground text-center"
  //         >
  //           {t("ready_to_transform")}
  //         </motion.h2>

  //         <motion.p
  //           initial={{ opacity: 0, y: 20 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.2, duration: 0.8 }}
  //           className="text-lg text-foreground/70 text-center max-w-2xl mx-auto"
  //         >
  //           {t("contact_team_description")}
  //         </motion.p>

  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.95 }}
  //           whileInView={{ opacity: 1, scale: 1 }}
  //           transition={{ delay: 0.4, duration: 0.8 }}
  //           className="flex justify-center"
  //         >
  //           <button
  //             type="button"
  //             onClick={() => navigate("/ContactPage")}
  //             className="border border-accent text-accent bg-white rounded-xl px-6 py-3 font-semibold transition hover:shadow-sm"
  //           >
  //             {t("landing_page.cta_section.full_contact_button", "Full Contact Page")}
  //           </button>
  //         </motion.div>

  //         {/* No inline submit/status on landing - redirect to full contact page */}

  //         <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
  //           {features.map(({ text, icon: Icon }) => (
  //             <motion.div
  //               key={text}
  //               initial={{ opacity: 0, y: 20 }}
  //               whileInView={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.6, duration: 0.6 }}
  //               className="flex items-center gap-2"
  //             >
  //               <Icon className="w-6 h-6 text-primary" />
  //               <span className="text-base text-foreground/80">{text}</span>
  //             </motion.div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}
