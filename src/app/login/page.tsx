"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === "register" && !acceptedTerms) return;
    window.localStorage.setItem("profileEmail", email);
    setMessage(mode === "login" ? "登入成功" : "註冊成功");
  };

  const submitDisabled = mode === "register" && !acceptedTerms;

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-12 text-stone-900">
      <section className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-orange-600">會員登入</p>
        <h1 className="mt-2 text-3xl font-bold">{mode === "login" ? "登入帳號" : "註冊帳號"}</h1>

        <div className="mt-6 flex rounded-lg bg-stone-100 p-1">
          <button onClick={() => setMode("login")} className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-white text-orange-600 shadow-sm" : "text-stone-600"}`}>
            登入
          </button>
          <button onClick={() => setMode("register")} className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold ${mode === "register" ? "bg-white text-orange-600 shadow-sm" : "text-stone-600"}`}>
            註冊
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="min-h-11 rounded-lg border border-stone-300 px-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            密碼
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="min-h-11 rounded-lg border border-stone-300 px-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </label>

          {mode === "register" ? (
            <label className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-stone-700">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-500 focus:ring-orange-500"
              />
              <span>
                我已閱讀並同意
                <Link className="font-semibold text-orange-600 hover:text-orange-700" href="/terms-of-service">
                  《服務條款》
                </Link>
                和
                <Link className="font-semibold text-orange-600 hover:text-orange-700" href="/privacy-policy">
                  《隱私政策》
                </Link>
              </span>
            </label>
          ) : null}

          <button
            type="submit"
            disabled={submitDisabled}
            className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {mode === "login" ? "登入" : "註冊"}
          </button>
          {message ? <p className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}
