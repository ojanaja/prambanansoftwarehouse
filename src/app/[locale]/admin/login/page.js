"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/helper/supabase";
import { toast } from "sonner";
import Image from "next/image";
import { IoLockClosed, IoMail, IoEye, IoEyeOff } from "react-icons/io5";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "id";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to admin chat page immediately
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace(`/${locale}/admin/chat`);
      }
    };
    checkUser();
  }, [router, locale]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(locale === "en" ? "Please fill in all fields" : "Harap isi semua kolom");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      toast.success(locale === "en" ? "Logged in successfully!" : "Berhasil masuk!");
      router.replace(`/${locale}/admin/chat`);
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(
        locale === "en" 
          ? "Invalid email or password. Please try again." 
          : "Email atau password salah. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const strings = {
    title: locale === "en" ? "Admin Portal" : "Portal Admin",
    subtitle: locale === "en" ? "Sign in to manage chat responses" : "Masuk untuk mengelola respon chat",
    email: locale === "en" ? "Email Address" : "Alamat Email",
    password: locale === "en" ? "Password" : "Kata Sandi",
    signIn: locale === "en" ? "Sign In" : "Masuk",
    signingIn: locale === "en" ? "Signing In..." : "Sedang Masuk...",
    backToHome: locale === "en" ? "Back to Homepage" : "Kembali ke Beranda"
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 text-neutral-100 z-[60]">
      {/* Background ambient red/orange glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-700/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-8 bg-neutral-900/60 border border-neutral-800 rounded-3xl backdrop-blur-2xl shadow-2xl relative z-10 mx-4">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center p-2 mb-4 border border-neutral-700 relative overflow-hidden">
            <Image
              src="/logo/logo.png"
              alt="Prambanan Digital Logo"
              fill
              className="p-2 object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{strings.title}</h1>
          <p className="text-xs text-neutral-400 mt-1.5 text-center">{strings.subtitle}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              {strings.email}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                <IoMail size={18} />
              </span>
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prambanandigital.web.id"
                className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              {strings.password}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                <IoLockClosed size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all placeholder:text-neutral-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-primary-600/10 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{strings.signingIn}</span>
              </>
            ) : (
              <span>{strings.signIn}</span>
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href={`/${locale}`}
            className="text-xs text-neutral-500 hover:text-primary-400 transition-colors"
          >
            {strings.backToHome}
          </a>
        </div>
      </div>
    </div>
  );
}
