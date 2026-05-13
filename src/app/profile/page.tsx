"use client";

import { useEffect, useMemo, useState } from "react";

interface ProfileUser {
  email?: string;
}

const badgeTiers = [
  { name: "青銅徽章", threshold: 100 },
  { name: "白銀徽章", threshold: 500 },
  { name: "黃金徽章", threshold: 1000 },
] as const;

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [painCoins, setPainCoins] = useState(0);
  const [wisdomCoins, setWisdomCoins] = useState(0);

  useEffect(() => {
    const savedPain = Number(window.localStorage.getItem("painCoins") ?? "320");
    const savedWisdom = Number(window.localStorage.getItem("wisdomCoins") ?? "260");
    setPainCoins(savedPain);
    setWisdomCoins(savedWisdom);

    const savedEmail = window.localStorage.getItem("profileEmail");
    setUser({ email: savedEmail ?? "member@example.com" });
  }, []);

  const totalCoins = useMemo(() => painCoins + wisdomCoins, [painCoins, wisdomCoins]);

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-orange-600">會員中心</p>
          <h1 className="mt-2 text-3xl font-bold">個人檔案</h1>
          <p className="mt-3 text-stone-600">{user?.email ?? "尚未登入"}</p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-orange-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">痛痛幣</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">{painCoins}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">智慧幣</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{wisdomCoins}</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">總幣值</p>
            <p className="mt-2 text-3xl font-bold">{totalCoins}</p>
          </div>
        </div>

        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Badges</h2>
          <div className="mt-5 grid gap-4">
            {badgeTiers.map((badge) => {
              const progress = Math.min(100, Math.round((totalCoins / badge.threshold) * 100));
              const unlocked = totalCoins >= badge.threshold;
              return (
                <div key={badge.name} className="rounded-lg border border-stone-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{badge.name}</h3>
                      <p className="mt-1 text-sm text-stone-500">{badge.threshold} coins threshold</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${unlocked ? "bg-orange-100 text-orange-700" : "bg-stone-100 text-stone-600"}`}>
                      {unlocked ? "已解鎖" : `${progress}%`}
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
