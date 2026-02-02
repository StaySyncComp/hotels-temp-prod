import { useEffect, useState } from "react";
import Step1 from "@/features/auth/components/Step1";
import { LoginSteps } from "@/types/login/login";
import Step2 from "@/features/auth/components/Step2";
import { useLocation } from "react-router-dom";
import { decryptData } from "@/lib/crypto-js";
import LoginFooter from "@/features/auth/components/LoginFooter";
import { Toaster } from "sonner";

function Login() {
  const [step, setStep] = useState<LoginSteps>(1);
  const location = useLocation();
  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const encryptedData = searchParams.get("d");
      const data = decryptData(encryptedData || "") as {
        step: LoginSteps;
        gmail: string;
      };
      if (data && data.step) setStep(data.step);
    } else setStep(1);
  }, [location.search]);

  return (
    <div className="min-h-[750px] h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full opacity-10 blur-3xl"></div>
      {/* Floating elements */}
      <Toaster />
      <div
        className="flex items-center justify-center w-full h-screen min-h-[750px] z-20 bg-transparent"
        data-cy="login-page"
      >
        <div className="bg-white/80 backdrop-blur-sm shadow-lg w-[34rem] p-4 border border-border/30 rounded-2xl">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}

export default Login;
