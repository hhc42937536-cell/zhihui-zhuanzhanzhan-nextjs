"use client";

import { useMemo, useState } from "react";
import { PAIN_POINTS, SOLUTIONS, type Solution } from "@/lib/mock-data";

const categories = ["全部", "工作效率", "AI創作", "溝通協作", "投資分析"] as const;
const levels = [
  { label: "全部", value: "all" },
  { label: "基礎", value: "basic" },
  { label: "進階", value: "intermediate" },
  { label: "專家", value: "advanced" },
] as const;

const levelText: Record<Solution["level"], string> = {
  basic: "基礎",
  intermediate: "進階",
  advanced: "專家",
};

const levelClass: Record<Solution["level"], string> = {
  basic: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-800",
  advanced: "bg-orange-100 text-orange-700",
};

export default function SolutionGalleryPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const [level, setLevel] = useState<(typeof levels)[number]["value"]>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return SOLUTIONS.filter((solution) => {
      const matchCategory = category === "全部" || solution.category === category;
      const matchLevel = level === "all" || solution.level === level;
      const matchSearch =
        !keyword ||
        solution.title.toLowerCase().includes(keyword) ||
        solution.description.toLowerCase().includes(keyword) ||
        solution.author.toLowerCase().includes(keyword) ||
        solution.tools.some((tool) => tool.toLowerCase().includes(keyword));
      return matchCategory && matchLevel && matchSearch;
    });
  }, [category, level, search]);

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-orange-600">解法展示牆</p>
          <h1 className="mt-2 text-3xl font-bold">找到可複製的 AI 工作流</h1>
        </div>

        <div className="mb-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜尋解法、工具或作者"
            className="min-h-11 rounded-lg border border-stone-300 px-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((item) => (
              <button
                key={item.value}
                onClick={() => setLevel(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${level === item.value ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <form className="mb-6 grid gap-3 rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold">投稿你的解法</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <select className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500">
              {PAIN_POINTS.map((painPoint) => (
                <option key={painPoint.id} value={painPoint.id}>
                  {painPoint.title}
                </option>
              ))}
            </select>
            <select className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500">
              <option value="basic">基礎</option>
              <option value="intermediate">進階</option>
              <option value="advanced">專家</option>
            </select>
          </div>
          <textarea className="min-h-24 rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="描述步驟、輸入資料、工具設定與成果" />
          <input className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="參考連結或範本 URL" />
          <button type="button" className="w-fit rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">
            送出解法
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((solution) => (
            <article key={solution.id} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{solution.category}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${levelClass[solution.level]}`}>{levelText[solution.level]}</span>
              </div>
              <h3 className="text-xl font-bold">{solution.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{solution.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {solution.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-stone-500">TPS</p>
                  <p className="font-bold text-orange-600">{solution.tpsScore}</p>
                </div>
                <div>
                  <p className="text-stone-500">作者</p>
                  <p className="font-semibold">{solution.author}</p>
                </div>
                <div>
                  <p className="text-stone-500">喜歡</p>
                  <p className="font-semibold">{solution.likes}</p>
                </div>
              </div>
              <button className="mt-5 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600">查看解法 →</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
