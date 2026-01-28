import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/i18n/languages";
import { Plus } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LanguageSelector({
  selectedLanguages,
  setSelectedLanguages,
}: LanguageSelectorProps) {
  const availableLanguages = languages.filter(
    (lang) => !selectedLanguages.includes(lang.code),
  );

  const handleSelect = (code: string) => {
    setSelectedLanguages((prev) => [...prev, code]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-full w-full flex items-center justify-center cursor-pointer">
          <Plus className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="gap-2"
          >
            {lang.flag}
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
