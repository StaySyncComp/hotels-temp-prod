import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { languages } from "@/i18n/languages";
import { Check, ChevronDown, GlobeIcon } from "lucide-react";
import { useRTL } from "@/hooks/useRtl";

interface LanguagePickerProps {
  variant?: "normal" | "icon";
}

function LanguagePicker({ variant = "normal" }: LanguagePickerProps) {
  const { textAlign, flexDirection } = useRTL();
  const { i18n, t } = useTranslation();

  const normalizeCode = (code?: string) => (code || "").split("-")[0];
  const currentCode = normalizeCode(i18n.resolvedLanguage || i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("i18nextLng", lng);
    } catch (e) {
      console.log(e);
    }
  };
  const currentLanguage = languages.find((l) => l.code === currentCode);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <button
            className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-all"
            aria-label={t("Select language")}
          >
            <GlobeIcon className="size-5" />
          </button>
        ) : (
          <Button
            size="default"
            variant="outline"
            className="w-fit flex items-center gap-2 rtl:flex-row-reverse ltr:flex-row hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2">
              {currentLanguage ? (
                <>
                  <span className="text-lg leading-none">
                    {currentLanguage.flag}
                  </span>
                  <span className="font-medium text-sm">
                    {currentLanguage.name}
                  </span>
                </>
              ) : (
                <>
                  <GlobeIcon />
                  <span className="font-medium text-sm">
                    {t("Select language")}
                  </span>
                </>
              )}
            </div>
            <ChevronDown size={14} className="opacity-50" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg shadow-lg border"
        align="start"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-3 py-2 font-semibold text-sm text-muted-foreground">
          {t("languages")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-64 overflow-y-auto">
          {languages.map((language) => {
            const isSelected = language.code === i18n.language;

            return (
              <DropdownMenuItem
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-muted focus:bg-muted rounded-sm mx-1"
              >
                <div className={`flex items-center gap-3 ${flexDirection}`}>
                  <span className="text-lg leading-none w-6 text-center">
                    {language.flag}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{language.name}</span>
                    <span
                      className={`text-xs text-muted-foreground uppercase ${textAlign}`}
                    >
                      {language.code}
                    </span>
                  </div>
                </div>
                {isSelected && <Check size={16} className="text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguagePicker;
