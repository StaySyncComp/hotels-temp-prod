import { Button } from "@/components/ui/button";
import { Users, Bot, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GetDirection } from "@/lib/i18n";
import Logo from "@/assets/logo.svg";
import LottieAnimation from "@/components/common/LottieAnimation";
import HeroAnimation from "@/assets/animations/lottie/HeroAnimation.json";
import HeroMobile from "@/assets/animations/lottie/HeroMobile.json";
export default function HeroSection() {
  const { t } = useTranslation();
  const direction = GetDirection();
  const isMobile = window.innerWidth <= 768;

  return (
    <section
      className=" overflow-hidden flex justify-center"
      dir={direction ? "rtl" : "ltr"}
    >
      {/* Left Content */}
      {/* <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-8 text-center items-center"
      >
        <h1 className="text-6xl lg:text-8xl arimo font-bold text-foreground">
          רמה חדשה של שליטה
        </h1>

        <p className="text-xl font-medium text-foreground/60 leading-relaxed max-w-2xl">
          מערכת חכמה שמחברת את כל מחלקות המלון לפלטפורמה אחת – עם תובנות בזמן
          אמת, אוטומציה מתקדמת, וסטנדרט שירות שמציב אתכם מעל כולם.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="default"
            className="bg-primary rounded-full shadow-lg text-lg px-6 py-3 h-auto"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            צור קשר
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-20 relative">
          <img
            className="max-h-96"
            src="../src/assets/websiteShowcaseSvg.svg"
          />
          <img
            className="max-h-96 absolute -bottom-3 -left-32"
            src="../src/assets/appShowcaseSvg.svg"
          />
          <div className="bg-primary/40 rounded-3xl w-fit">
            <img
              className="max-h-96 top-0 right-0 absolute -mb-20"
              src="../src/assets/chatbotShowcaseSvg.svg"
            />
          </div>
        </div>
      </motion.div> */}
      <div className="w-full h-full relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 15.5 }}
          className={`${
            isMobile
              ? "h-[10vw] w-[28vw] text-[3.25vw] bottom-[63vw]"
              : // ? "h-[4.5vh] w-[28vw] text-[3.25vw] bottom-[29vh]"
                "h-[2.75vw] w-[9vw] text-[1vw] bottom-[13.5vw]"
            // "h-[4.25vh] w-[9vw] text-[1vw] bottom-[25vh]"
          } absolute left-1/2 -translate-x-1/2  z-above-all rounded-full  bg-[#0059FF] shadow-[0_0.1vw_0.2vw_0_#0059FF] text-white font-medium hover:scale-105 transition-colors transition-transform duration-150 hover:bg-primary`}
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          צור קשר
        </motion.button>

        <LottieAnimation
          animationData={isMobile ? HeroMobile : HeroAnimation}
          loop={false}
          className=""
        />
      </div>
    </section>
  );
}
