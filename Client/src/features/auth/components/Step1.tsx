import { useState, useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { AuthContext } from "@/features/auth/context/auth-context";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { encryptData } from "@/lib/crypto-js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo.svg";

type Step1FormValues = {
  mail: string;
  password: string;
};

function Step1() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!auth) throw new Error("AuthContext must be used within an AuthProvider");
  const { login } = auth;

  // Schema depends on translations → useMemo so it updates when `t` changes
  const schema = useMemo(
    () =>
      z.object({
        mail: z
          .string()
          .min(1, {
            message:
              t("validation.email_required") || "כתובת מייל היא שדה חובה",
          })
          .email({
            message: t("validation.email_invalid") || "כתובת מייל לא תקינה",
          }),
        password: z.string().min(6, {
          message:
            t("validation.password_min") || "הסיסמה חייבת להכיל לפחות 6 תווים",
        }),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  const onSubmit = async (data: Step1FormValues) => {
    setErrorMessage(null);

    const response = await login({
      email: data.mail,
      password: data.password,
    });

    if (response && response.status === 202 && response.data) {
      const encryptedData = encryptData({ step: 2 });
      navigate(`/login?d=${encryptedData}`);
    } else {
      setErrorMessage(t(response?.error) || "אירעה שגיאה, נסה שוב.");
    }
  };

  return (
    <Card className="w-full h-full border-0 shadow-none">
      <CardHeader className="text-center pb-2 justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="mx-auto mb-4 w-16 h-16 shadow-md shadow-primary/10 rounded-2xl border border-border/20"
        />
        <CardTitle className="text-2xl font-bold text-primary">
          {t("login_welcome")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <form
          data-cy="login-step1-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email field */}
          <div className="space-y-2">
            <label htmlFor="mail" className="text-sm font-medium text-gray-700">
              כתובת מייל
            </label>
            <div className="relative">
              <Input
                icon={<Mail className="text-muted-foreground my-1" />}
                type="email"
                placeholder="הקלד כתובת מייל"
                data-cy="login-email"
                id="mail"
                className="h-12"
                {...register("mail")}
              />
            </div>
            {errors.mail && (
              <p className="text-xs text-red-500 mt-1">{errors.mail.message}</p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              סיסמה
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="הקלד סיסמה"
                data-cy="login-password"
                id="password"
                icon={<Lock className="text-muted-foreground my-1" />}
                className="h-12"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground duration-150"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p
              className="text-red-500 font-normal text-sm"
              data-cy="login-error-message"
            >
              {errorMessage}
            </p>
          )}

          {/* forgot password */}
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              שכחתי סיסמה
            </a>
          </div>

          {/* Sign in button */}
          <Button
            type="submit"
            loading={isSubmitting}
            data-cy="login-submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            {isSubmitting ? t("reports.loading") || "טוען..." : t("continue")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Step1;
