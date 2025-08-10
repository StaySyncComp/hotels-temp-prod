// import OnlineChatbot from "@/assets/animations/lottie/OnlineChatbot.json";
import AppNotifications from "@/assets/animations/lottie/AppNotifications.json";
import WebAnalytics from "@/assets/animations/lottie/WebAnalytics.json";
import LanguageShowcase from "@/assets/animations/lottie/LanguageShowcase.json";
import SuggestionShowcase from "@/assets/animations/lottie/SuggestionShowcase.json";
import LottieAnimation from "@/components/miscellaneous/LottieAnimation";
import CoverImage from "@/assets/animations/lottie/coverimage.png";
import { useTranslation } from "react-i18next";

function VideoShowcaseSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-border/10 via-white/95 to-white">
      <div className="max-w-7xl mx-auto flex gap-4 flex-col">
        <div className="text-center mb-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("landing_page.videos_section.title")}
          </h1>
          <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed">
            {t("landing_page.videos_section.subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 md:flex-row flex-col">
            <Card
              animation={WebAnalytics}
              title={t(
                "landing_page.videos_section.cards.analytics_card.title"
              )}
              description={t(
                "landing_page.videos_section.cards.analytics_card.description"
              )}
            />
            <Card
              animation={SuggestionShowcase}
              title={t(
                "landing_page.videos_section.cards.smart_suggestions.title"
              )}
              description={t(
                "landing_page.videos_section.cards.smart_suggestions.description"
              )}
            />
            <Card
              animation={LanguageShowcase}
              title={t(
                "landing_page.videos_section.cards.language_support.title"
              )}
              description={t(
                "landing_page.videos_section.cards.language_support.description"
              )}
              Component={
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#8CC7F8] via-[#8CC7F8]/95 to-transparent pointer-events-none"></div>
                  <div className="absolute -top-2 left-0 right-0 h-20 bg-gradient-to-b from-[#A1D5FE] via-[#A1D5FE]/95 to-transparent pointer-events-none"></div>
                </>
              }
            />
          </div>

          <div className="text-center mb-4 mt-32">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("landing_page.videos_section.mini_section.title")}
            </h1>
            <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed">
              {t("landing_page.videos_section.mini_section.subtitle")}
            </p>
          </div>

          <div className="flex gap-8 flex-row-reverse">
            <Card
              animation={AppNotifications}
              title={t(
                "landing_page.videos_section.mini_section.cards.app_notifications.title"
              )}
              description={t(
                "landing_page.videos_section.mini_section.cards.app_notifications.description"
              )}
              height={400}
              Component={
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#89C5F6] via-[#89C5F6]/95 to-transparent pointer-events-none"></div>
              }
            />
            <div
              className={`flex-grow bg-gradient-to-t from-[#81C0F4] to-[#A3D6FF] rounded-[2rem] w-[66%] relative shadow-lg shadow-primary/20 flex flex-col justify-between overflow-hidden`}
            >
              <div className="rounded-lg my-10 relative flex justify-end">
                <img
                  src={CoverImage}
                  alt="Cover"
                  className="w-[85%] border-r-[3px] border-y-[3px] border-background/50 rounded-r-xl shadow-lg shadow-primary/20"
                />
              </div>

              {/* Strong dark blur transition */}
              <div className="text-white py-8 px-6 relative z-10 flex flex-col gap-2">
                <h1 className="text-xl font-semibold">
                  {t(
                    "landing_page.videos_section.mini_section.cards.advanced_admin.title"
                  )}
                </h1>
                <p className="text-background font-medium">
                  {t(
                    "landing_page.videos_section.mini_section.cards.advanced_admin.description"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoShowcaseSection;

function Card({
  animation,
  title,
  description,
  height = 300,
  className = "",
  Component,
}: {
  animation: any;
  title: string;
  description: string;
  height?: number;
  className?: string;
  Component?: React.ReactElement;
}) {
  return (
    <div
      className={`flex-grow bg-gradient-to-t from-[#81C0F4] to-[#A3D6FF] rounded-[2rem] md:w-1/2 w-full relative shadow-lg shadow-primary/20 flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div className="relative">
        <LottieAnimation
          animationData={animation}
          height={height}
          loop
          className="my-6 rounded-lg"
        />
        {Component}
      </div>

      <div className="text-white py-8 px-6 relative flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-background font-medium">{description}</p>
      </div>
    </div>
  );
}
