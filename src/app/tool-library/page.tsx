"use client";

import { useMemo, useState } from "react";
import { TOOLS, type Tool } from "@/lib/mock-data";

const categories = ["全部", "工作效率", "AI創作", "溝通協作", "職涯發展", "數據分析", "投資理財"] as const;
const pricingOptions = [
  { label: "全部", value: "all" },
  { label: "免費", value: "free" },
  { label: "Freemium", value: "freemium" },
  { label: "付費", value: "paid" },
] as const;
const pricingText: Record<Tool["pricing"], string> = { free: "免費", freemium: "Freemium", paid: "付費" };

export default function ToolLibraryPage() {
  const [activeTab, setActiveTab] = useState<"library" | "redeemed">("library");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const [pricing, setPricing] = useState<(typeof pricingOptions)[number]["value"]>("all");
  const [sortBy, setSortBy] = useState<"rating" | "downloads" | "latest">("rating");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchCategory = category === "全部" || tool.category === category;
      const matchPricing = pricing === "all" || tool.pricing === pricing;
      const matchSearch =
        !keyword ||
        tool.name.toLowerCase().includes(keyword) ||
        tool.description.toLowerCase().includes(keyword) ||
        tool.category.toLowerCase().includes(keyword);
      return matchCategory && matchPricing && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "downloads") return b.downloads - a.downloads;
      if (sortBy === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.rating - a.rating;
    });
  }, [category, pricing, search, sortBy]);

  const redeemed = TOOLS.slice(0, 3);

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">工具圖書館</p>
            <h1 className="mt-2 text-3xl font-bold">兌換、收藏與分享 AI 生產力工具</h1>
          </div>
          <div className="flex rounded-lg bg-stone-200 p-1">
            <button onClick={() => setActiveTab("library")} className={`rounded-md px-4 py-2 text-sm font-semibold ${activeTab === "library" ? "bg-white text-orange-600 shadow-sm" : "text-stone-600"}`}>
              工具庫
            </button>
            <button onClick={() => setActiveTab("redeemed")} className={`rounded-md px-4 py-2 text-sm font-semibold ${activeTab === "redeemed" ? "bg-white text-orange-600 shadow-sm" : "text-stone-600"}`}>
              已兌換工具
            </button>
          </div>
        </div>

        {activeTab === "library" ? (
          <>
            <div className="mb-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜尋工具名稱、用途或分類" className="min-h-11 rounded-lg border border-stone-300 px-3 outline-none focus:border-orange-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {pricingOptions.map((item) => (
                  <button key={item.value} onClick={() => setPricing(item.value)} className={`rounded-full px-4 py-2 text-sm font-medium ${pricing === item.value ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}>
                    {item.label}
                  </button>
                ))}
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value as "rating" | "downloads" | "latest")} className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-orange-500">
                  <option value="rating">評分</option>
                  <option value="downloads">下載數</option>
                  <option value="latest">最新</option>
                </select>
              </div>
            </div>

            <form className="mb-6 grid gap-3 rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-bold">上傳工具</h2>
              <div className="grid gap-3 md:grid-cols-3">
                <input className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="工具名稱" />
                <select className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500">
                  {categories.filter((item) => item !== "全部").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500">
                  <option value="free">免費</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">付費</option>
                </select>
              </div>
              <textarea className="min-h-20 rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="描述工具能解決什麼流程痛點" />
              <input className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="工具 URL" />
              <button type="button" className="w-fit rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">
                上傳並送審
              </button>
            </form>

            <ToolGrid tools={filtered} />
          </>
        ) : (
          <ToolGrid tools={redeemed} />
        )}
      </section>
    </main>
  );
}

function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {tools.map((tool) => (
        <article key={tool.id} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{tool.category}</span>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{pricingText[tool.pricing]}</span>
          </div>
          <h3 className="text-lg font-bold">{tool.name}</h3>
          <p className="mt-2 min-h-20 text-sm leading-6 text-stone-600">{tool.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <p>★ {tool.rating.toFixed(1)}</p>
            <p>{tool.downloads.toLocaleString()} 下載</p>
            <p className="col-span-2 font-semibold text-orange-600">{tool.coins} 智慧幣</p>
          </div>
          <button className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600">兌換工具</button>
        </article>
      ))}
    </div>
  );
}
