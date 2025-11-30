import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Zap,
  HelpCircle,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
// import { LangSwitcher } from "../ui/Complete/LangSwitcher";
import { useTranslation } from "react-i18next";
import LanguagePicker from "@/components/LanguagePicker";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation("sidebar");
  const { t: tCommon } = useTranslation("common");
  const [notificationCount] = useState(3);

  return (
    <header className="w-full bg-sidebar border-b border-gray-200 h-16 flex items-center px-6 justify-between backdrop-blur-sm">
      <div className="flex gap-4 flex-1 items-center max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            className="w-full h-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400 transition-all rounded-lg"
            placeholder={tCommon("search")}
          />
        </div>
        {/* <Button
          variant="ghost"
          className="flex gap-2 items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition-all"
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">{t("quickActions")}</span>
        </Button> */}
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>
          <LanguagePicker variant="icon" />

          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-all">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                {user?.logo ? (
                  <img
                    src={user?.logo}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {user?.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="ml-2 h-4 w-4" />
              <span>הגדרות</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="ml-2 h-4 w-4" />
              <span>התנתק</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navigation;
