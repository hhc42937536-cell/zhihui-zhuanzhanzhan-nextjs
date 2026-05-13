"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("tab") === "register") setTab("register");
  }, [searchParams]);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message === "Invalid login credentials" ? "帳號或密碼錯誤" : error.message);
    } else {
      router.push("/");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("兩次輸入的密碼不一致");
      return;
    }
    if (password.length < 6) {
      setError("密碼至少需要 6 個字元");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // If email confirmation is disabled, session is created immediately
      if (data.session) {
        router.push("/");
      } else {
        setSuccess("註冊成功！請查收驗證信以啟用帳號。");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎯</div>
          <h1 className="text-2xl font-bold text-gray-900">智慧轉運站</h1>
          <p className="text-sm text-gray-400 mt-1">把痛點變成機會</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
          <button
            onClick={() => { setTab("login"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              tab === "login"
                ? "bg-white text-orange-500 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            登入
          </button>
          <button
            onClick={() => { setTab("register"); setError(""); setSuccess(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              tab === "register"
                ? "bg-white text-orange-500 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            註冊
          </button>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電子信箱</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition"
            >
              {loading ? "登入中…" : "登入"}
            </button>
            <p className="text-center text-sm text-gray-400">
              還沒有帳號？{" "}
              <button
                type="button"
                onClick={() => { setTab("register"); setError(""); }}
                className="text-orange-500 hover:underline font-medium"
              >
                立刻註冊
              </button>
            </p>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電子信箱</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="至少 6 個字元"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">確認密碼</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再輸入一次密碼"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition"
            >
              {loading ? "註冊中…" : "免費註冊"}
            </button>
            <p className="text-center text-sm text-gray-400">
              已有帳號？{" "}
              <button
                type="button"
                onClick={() => { setTab("login"); setError(""); }}
                className="text-orange-500 hover:underline font-medium"
              >
                立刻登入
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
