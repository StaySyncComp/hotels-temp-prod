import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { languages } from "@/i18n/languages";
import { Check, ChevronDown, GlobeIcon, Plus } from "lucide-react";
import { useRTL } from "@/hooks/useRtl";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
}

function LanguageSelector({
  selectedLanguages,
  setSelectedLanguages,
}: LanguageSelectorProps) {
  const { textAlign, flexDirection } = useRTL();
  const { t } = useTranslation();

  const handleSelectLanguage = (langCode: string) => {
    if (!selectedLanguages.includes(langCode)) {
      setSelectedLanguages([...selectedLanguages, langCode]);
    }
  };

  // Get available languages (not yet selected, excluding Hebrew which is always there)
  const availableLanguages = languages.filter(
    (lang) => !selectedLanguages.includes(lang.code) && lang.code !== "he"
  );

  if (availableLanguages.length === 0) {
    return null; // No more languages to add
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-all flex items-center justify-center"
          style={{ pointerEvents: 'auto' }}
          aria-label={t("add_language")}
        >
          <Plus className="size-5 flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg shadow-lg border"
        align="start"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-3 py-2 font-semibold text-sm text-muted-foreground">
          {t("add_language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-64 overflow-y-auto">
          {availableLanguages.map((language) => {
            return (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleSelectLanguage(language.code)}
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
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;

