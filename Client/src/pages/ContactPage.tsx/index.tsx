import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { GetDirection } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/fullLogo.svg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const direction = GetDirection();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const alignmentClass = direction ? "text-right" : "text-left";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotel, setHotel] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const isNameValid = useMemo(() => name.trim().length > 0, [name]);

  const isFormValid = useMemo(
    () => isNameValid && isEmailValid && !isSubmitting,
    [isNameValid, isEmailValid, isSubmitting]
  );

  const handlePhoneChange = useCallback((value: string) => {
    const sanitized = value.replace(/[^\d+()\-\s]/g, "");
    setPhone(sanitized);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      const { error } = await supabase.from("interested_people").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        hotel: hotel.trim() || null,
        message: message.trim() || null,
      });
      if (error) {
        setSubmitError(
          error.message ||
            t("submit_error_generic", "Something went wrong. Please try again.")
        );
      } else {
        setSubmitSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setHotel("");
        setMessage("");
      }
    } catch (err: any) {
      setSubmitError(
        err?.message ||
          t("submit_error_generic", "Something went wrong. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [email, name, phone, hotel, message, isFormValid]);

  return (
    <div className="max-w-4xl p-8 mx-auto relative overflow-hidden">
      {/* background shapes */}
      {/* <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-300 rounded-full opacity-10 blur-3xl"></div> */}

      <div className={`flex flex-col gap-8 ${alignmentClass}`}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-foreground text-center"
        >
          {t("contact_page.title", "Contact our team")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-foreground/70 text-center max-w-2xl mx-auto"
        >
          {t(
            "contact_page.description",
            "Fill in your details and we will get back to you shortly."
          )}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder={t(
              "contact_page.fields.full_name_placeholder",
              "Full Name*"
            )}
            className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("contact_page.fields.email_placeholder", "Email*")}
            className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("contact_page.fields.phone_placeholder", "Phone")}
            className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            inputMode="tel"
            pattern="^[0-9()+\-\s]*$"
          />
          <input
            type="text"
            name="hotel"
            placeholder={t(
              "contact_page.fields.hotel_placeholder",
              "Hotel Name"
            )}
            className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
          <textarea
            name="message"
            placeholder={t(
              "contact_page.fields.message_placeholder",
              "Message"
            )}
            className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 sm:col-span-2 h-32 ${alignmentClass} resize-none`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="sm:col-span-2 flex">
            <button
              type="submit"
              className={`bg-accent text-white rounded-2xl px-6 py-3 font-semibold shadow-lg transform transition hover:scale-105 w-full sm:w-auto ${
                !isFormValid ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid}
            >
              {isSubmitting
                ? t("contact_page.submitting", "Submitting...")
                : t("contact_page.submit_button", "Submit")}
            </button>
          </div>
        </motion.form>

        {(submitError || submitSuccess) && (
          <div
            className={`text-sm text-center ${
              submitError ? "text-red-600" : "text-green-700"
            }`}
          >
            {submitError
              ? submitError
              : t(
                  "contact_page.submit_success",
                  "Thanks! We'll be in touch within 24 hours."
                )}
          </div>
        )}
      </div>
    </div>
  );
  // return (
  //   <section
  //     className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white px-6 sm:px-10"
  //     dir={direction ? "rtl" : "ltr"}
  //   >
  //     {/* Top navigation bar (same style as landing) */}
  //     <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-white/70 py-3 px-5">
  //       <div className="flex justify-between max-w-7xl w-full m-auto items-center">
  //         <div className="flex items-center gap-3">
  //           <div>
  //             <img src={logo} alt={t("bloom_logo")} className="h-full object-contain" />
  //           </div>
  //         </div>
  //         <div className={`flex justify-start gap-2 ${direction ? "flex-row-reverse" : "flex-row"}`}>
  //           <Link to="/login" className="sm:flex hidden">
  //             <Button className="bg-accent py-2 px-7">{t("website_titles.login")}</Button>
  //           </Link>
  //         </div>
  //       </div>
  //     </nav>

  //     <div className="h-16" />
  //     <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 sm:p-12 lg:p-20 relative overflow-hidden">
  //       {/* background shapes */}
  //       <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
  //       <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>

  //       <div className={`flex flex-col gap-8 ${alignmentClass}`}>
  //         <motion.h2
  //           initial={{ opacity: 0, y: 30 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //           className="text-3xl sm:text-4xl font-bold text-foreground text-center"
  //         >
  //           {t("contact_page.title", "Contact our team")}
  //         </motion.h2>

  //         {/* Back to landing button */}
  //         <div className={`flex ${direction ? "justify-start" : "justify-end"}`}>
  //           <button
  //             type="button"
  //             onClick={() => navigate("/")}
  //             className="inline-flex items-center gap-2 border border-accent/70 text-accent bg-white rounded-2xl px-5 py-2.5 font-semibold transition hover:shadow-md hover:bg-accent/5 focus:outline-none focus-visible:ring ring-primary/20"
  //           >
  //             {direction ? (
  //               <ArrowRight className="h-4 w-4" aria-hidden="true" />
  //             ) : (
  //               <ArrowLeft className="h-4 w-4" aria-hidden="true" />
  //             )}
  //             <span>{t("contact_page.back_to_landing", "Back to landing")}</span>
  //           </button>
  //         </div>

  //         <motion.p
  //           initial={{ opacity: 0, y: 20 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.2, duration: 0.8 }}
  //           className="text-lg text-foreground/70 text-center max-w-2xl mx-auto"
  //         >
  //           {t("contact_page.description", "Fill in your details and we will get back to you shortly.")}
  //         </motion.p>

  //         <motion.form
  //           initial={{ opacity: 0, scale: 0.95 }}
  //           whileInView={{ opacity: 1, scale: 1 }}
  //           transition={{ delay: 0.4, duration: 0.8 }}
  //           onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
  //           className="grid grid-cols-1 sm:grid-cols-2 gap-4"
  //         >
  //           <input
  //             type="text"
  //             name="fullName"
  //             placeholder={t("contact_page.fields.full_name_placeholder", "Full Name*")}
  //             className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             required
  //           />
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder={t("contact_page.fields.email_placeholder", "Email*")}
  //             className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //           />
  //           <input
  //             type="tel"
  //             name="phone"
  //             placeholder={t("contact_page.fields.phone_placeholder", "Phone")}
  //             className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
  //             value={phone}
  //             onChange={(e) => handlePhoneChange(e.target.value)}
  //             inputMode="tel"
  //             pattern="^[0-9()+\-\s]*$"
  //           />
  //           <input
  //             type="text"
  //             name="hotel"
  //             placeholder={t("contact_page.fields.hotel_placeholder", "Hotel Name")}
  //             className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 ${alignmentClass}`}
  //             value={hotel}
  //             onChange={(e) => setHotel(e.target.value)}
  //           />
  //           <textarea
  //             name="message"
  //             placeholder={t("contact_page.fields.message_placeholder", "Message")}
  //             className={`border rounded-2xl px-4 py-3 focus:outline-none focus:ring ring-primary/30 sm:col-span-2 h-32 ${alignmentClass}`}
  //             value={message}
  //             onChange={(e) => setMessage(e.target.value)}
  //           />

  //           <div className="sm:col-span-2 flex">
  //             <button
  //               type="submit"
  //               className={`bg-accent text-white rounded-2xl px-6 py-3 font-semibold shadow-lg transform transition hover:scale-105 w-full sm:w-auto ${
  //                 !isFormValid ? "opacity-60 cursor-not-allowed" : ""
  //               }`}
  //               disabled={!isFormValid}
  //             >
  //               {isSubmitting
  //                 ? t("contact_page.submitting", "Submitting...")
  //                 : t("contact_page.submit_button", "Submit")}
  //             </button>
  //           </div>
  //         </motion.form>

  //         {(submitError || submitSuccess) && (
  //           <div
  //             className={`text-sm text-center ${
  //               submitError ? "text-red-600" : "text-green-700"
  //             }`}
  //           >
  //             {submitError
  //               ? submitError
  //               : t("contact_page.submit_success", "Thanks! We'll be in touch within 24 hours.")}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </section>
  // );
}
