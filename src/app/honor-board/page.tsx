"use client";

import { useMemo, useState } from "react";

type Period = "week" | "month" | "total";
type RankingType = "overall" | "replies" | "painCoins" | "wisdomCoins";

interface RankingUser {
  id: number;
  user: string;
  coins: number;
  replies: number;
  likes: number;
  painCoins: number;
  wisdomCoins: number;
}

const periodTabs: { label: string; value: Period }[] = [
  { label: "本週", value: "week" },
  { label: "本月", value: "month" },
  { label: "總榜", value: "total" },
];

const typeTabs: { label: string; value: RankingType }[] = [
  { label: "綜合排名", value: "overall" },
  { label: "最佳回覆", value: "replies" },
  { label: "痛痛幣", value: "painCoins" },
  { label: "智慧幣", value: "wisdomCoins" },
];

const data: Record<Period, RankingUser[]> = {
  week: [
    { id: 1, user: "流程拆解王 Aki", coins: 980, replies: 18, likes: 246, painCoins: 320, wisdomCoins: 660 },
    { id: 2, user: "PM 小林", coins: 860, replies: 14, likes: 221, painCoins: 410, wisdomCoins: 450 },
    { id: 3, user: "自動化 Leo", coins: 790, replies: 16, likes: 198, painCoins: 260, wisdomCoins: 530 },
    { id: 4, user: "投資阿哲", coins: 620, replies: 9, likes: 174, painCoins: 210, wisdomCoins: 410 },
    { id: 5, user: "內容 Mina", coins: 590, replies: 11, likes: 166, painCoins: 240, wisdomCoins: 350 },
  ],
  month: [
    { id: 1, user: "流程拆解王 Aki", coins: 3880, replies: 64, likes: 1024, painCoins: 1260, wisdomCoins: 2620 },
    { id: 2, user: "自動化 Leo", coins: 3420, replies: 58, likes: 931, painCoins: 1040, wisdomCoins: 2380 },
    { id: 3, user: "PM 小林", coins: 3160, replies: 47, likes: 882, painCoins: 1510, wisdomCoins: 1650 },
    { id: 4, user: "內容 Mina", coins: 2750, replies: 43, likes: 746, painCoins: 980, wisdomCoins: 1770 },
    { id: 5, user: "投資阿哲", coins: 2410, replies: 31, likes: 690, painCoins: 870, wisdomCoins: 1540 },
  ],
  total: [
    { id: 1, user: "流程拆解王 Aki", coins: 18880, replies: 312, likes: 6040, painCoins: 5920, wisdomCoins: 12960 },
    { id: 2, user: "自動化 Leo", coins: 16420, replies: 286, likes: 5488, painCoins: 4860, wisdomCoins: 11560 },
    { id: 3, user: "PM 小林", coins: 15160, replies: 244, likes: 5021, painCoins: 6880, wisdomCoins: 8280 },
    { id: 4, user: "內容 Mina", coins: 13750, replies: 226, likes: 4596, painCoins: 4320, wisdomCoins: 9430 },
    { id: 5, user: "投資阿哲", coins: 12410, replies: 181, likes: 3910, painCoins: 3880, wisdomCoins: 8530 },
  ],
};

export default function HonorBoardPage() {
  const [period, setPeriod] = useState<Period>("week");
  const [rankingType, setRankingType] = useState<RankingType>("overall");

  const ranking = useMemo(() => {
    return [...data[period]].sort((a, b) => {
      if (rankingType === "overall") return b.coins + b.likes + b.replies * 10 - (a.coins + a.likes + a.replies * 10);
      return b[rankingType] - a[rankingType];
    });
  }, [period, rankingType]);

  const topThree = ranking.slice(0, 3);

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-orange-600">榮譽榜</p>
          <h1 className="mt-2 text-3xl font-bold">看見最會拆痛點與分享解法的人</h1>
        </div>

        <div className="mb-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {periodTabs.map((tab) => (
              <button key={tab.value} onClick={() => setPeriod(tab.value)} className={`rounded-full px-4 py-2 text-sm font-semibold ${period === tab.value ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {typeTabs.map((tab) => (
              <button key={tab.value} onClick={() => setRankingType(tab.value)} className={`rounded-full px-4 py-2 text-sm font-semibold ${rankingType === tab.value ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid items-end gap-4 md:grid-cols-3">
          {topThree.map((member, index) => (
            <article key={member.id} className={`rounded-lg border bg-white p-5 text-center shadow-sm ${index === 0 ? "border-orange-300 md:order-2 md:scale-105" : "border-stone-200"} ${index === 1 ? "md:order-1" : ""} ${index === 2 ? "md:order-3" : ""}`}>
              <div className="text-3xl font-black text-orange-500">#{index + 1}</div>
              <h2 className="mt-3 text-xl font-bold">{member.user}</h2>
              <p className="mt-2 text-sm text-stone-500">{member.coins.toLocaleString()} coins · {member.replies} 回覆 · {member.likes} 喜歡</p>
            </article>
          ))}
        </div>

        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          {ranking.map((member, index) => (
            <div key={member.id} className="grid grid-cols-[64px_1fr] gap-3 border-b border-stone-100 p-4 last:border-b-0 md:grid-cols-[80px_1fr_120px_120px_120px] md:items-center">
              <div className="text-xl font-black text-orange-500">#{index + 1}</div>
              <div className="font-semibold">{member.user}</div>
              <div className="text-sm text-stone-600">{member.coins.toLocaleString()} 幣</div>
              <div className="text-sm text-stone-600">{member.replies} 回覆</div>
              <div className="text-sm text-stone-600">{member.likes} 喜歡</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
