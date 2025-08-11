import { CheckCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GetDirection } from "@/lib/i18n";
import { useRTL } from "@/hooks/useRtl";
import { useCallback, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CTASection() {
  const { isRtl } = useRTL();
  const { t } = useTranslation();
  const direction = GetDirection();

  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isEmailValid = useMemo(() => {
    if (!emailAddress) return false;
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
  }, [emailAddress]);

  const handleSubmitEmail = useCallback(async () => {
    if (!isEmailValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Attempt to insert email into Supabase table `interested_people`
      const normalizedEmail = emailAddress.trim().toLowerCase();
      const { error } = await supabase
        .from("interested_people")
        .insert({ email: normalizedEmail });

      if (error) {
        // If duplicate (unique email) or table policy blocks, we still surface a generic error
        setSubmitError(
          error.message || "Failed to save your email. Please try again."
        );
      } else {
        setSubmitSuccess(true);
        setEmailAddress("");
      }
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [emailAddress, isEmailValid, isSubmitting]);

  const features = [
    { text: t("custom_changes_per_hotel"), icon: Rocket },
    { text: t("no_setup_fees"), icon: CheckCircle },
    { text: t("cancel_anytime"), icon: CheckCircle },
  ];

  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-24 bg-border/25 px-4 sm:px-6"
      dir={direction ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="bg-white/65 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-20 overflow-hidden relative"
        >
          {/* Decorative background elements */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400 to-blue-900 rounded-full opacity-5 blur-2xl"></div>
          <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-900 to-blue-50 rounded-full opacity-10 blur-2xl"></div>

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 items-center w-full max-w-3xl mx-auto">
            {/* Text Content */}
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-7">
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground text-center"
              >
                {t("ready_to_transform")}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg font-medium text-foreground/70 text-center px-2 sm:px-0"
              >
                {t("contact_team_description")}
              </motion.p>
            </div>

            {/* Email Input Section */}
            <div className="w-full px-2 sm:px-6 md:px-12">
              <motion.div
                variants={itemVariants}
                className="w-full flex flex-col gap-4 relative"
              >
                {/* Mobile: Stacked layout */}
                <div className="block sm:hidden">
                  <input
                    type="email"
                    placeholder={t(
                      "landing_page.cta_section.input_placeholder"
                    )}
                    className="border bg-background/20 rounded-2xl px-4 py-4 w-full focus:outline-none focus:ring ring-primary/20 mb-3"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-accent text-white w-full h-12 px-4 rounded-2xl ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmitEmail}
                    disabled={!isEmailValid || isSubmitting}
                  >
                    {isSubmitting
                      ? t(
                          "landing_page.cta_section.submitting",
                          "Submitting..."
                        )
                      : t("landing_page.cta_section.submit_button")}
                  </motion.button>
                </div>

                {/* Desktop: Inline layout (same as original) */}
                <div className="hidden sm:block">
                  <input
                    type="email"
                    placeholder={t(
                      "landing_page.cta_section.input_placeholder"
                    )}
                    className={`border bg-background/20 rounded-3xl px-4 py-6 w-full focus:outline-none focus:ring ring-primary/20 ${
                      isRtl ? "pr-44" : "pl-44"
                    }`}
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-accent text-white w-40 h-14 px-2 rounded-2xl absolute top-2 ${
                      isRtl ? "right-2" : "left-2"
                    } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                    onClick={handleSubmitEmail}
                    disabled={!isEmailValid || isSubmitting}
                  >
                    {isSubmitting
                      ? t(
                          "landing_page.cta_section.submitting",
                          "Submitting..."
                        )
                      : t("landing_page.cta_section.submit_button")}
                  </motion.button>
                </div>
              </motion.div>

              {/* Success/Error Messages */}
              {(submitError || submitSuccess) && (
                <div
                  className={`mt-2 text-sm text-center sm:text-left ${
                    submitError ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {submitError
                    ? submitError
                    : t(
                        "landing_page.cta_section.submit_success",
                        "Thanks! We'll be in touch."
                      )}
                </div>
              )}
            </div>

            {/* Features List */}
            <div className="w-full">
              <motion.ul
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-center justify-center"
              >
                {features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-foreground/70 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground/70 text-center sm:text-left">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
