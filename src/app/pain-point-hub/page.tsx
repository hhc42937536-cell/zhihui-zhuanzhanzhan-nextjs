"use client";

import { useMemo, useState } from "react";
import { PAIN_POINTS, type PainPoint } from "@/lib/mock-data";

const categories = ["全部", "投資", "工作", "生活", "創業", "自動化", "AI創作"] as const;
type CategoryFilter = (typeof categories)[number];
type SortMode = "熱門" | "最新";

export default function PainPointHubPage() {
  const [category, setCategory] = useState<CategoryFilter>("全部");
  const [sortMode, setSortMode] = useState<SortMode>("熱門");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [formCategory, setFormCategory] = useState<PainPoint["category"]>("工作");

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return PAIN_POINTS.filter((item) => {
      const matchCategory = category === "全部" || item.category === category;
      const matchTag = !tag || item.tags.includes(tag);
      const matchSearch =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.poster.toLowerCase().includes(keyword) ||
        item.tags.some((itemTag) => itemTag.toLowerCase().includes(keyword));
      return matchCategory && matchTag && matchSearch;
    }).sort((a, b) =>
      sortMode === "熱門"
        ? b.likes + b.comments - (a.likes + a.comments)
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [category, search, sortMode, tag]);

  const selectTag = (nextTag: string) => {
    setTag(nextTag === tag ? "" : nextTag);
    setCategory("全部");
  };

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">痛點交換所</p>
            <h1 className="mt-2 text-3xl font-bold">把卡住的流程變成可解決的任務</h1>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            發布痛點 +20 痛痛幣，回覆有效解法 +50 智慧幣。
          </div>
        </div>

        <div className="mb-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  setTag("");
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item && !tag ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜尋痛點、標籤或發問者"
              className="min-h-11 flex-1 rounded-lg border border-stone-300 px-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
            <div className="flex rounded-lg bg-stone-100 p-1">
              {(["熱門", "最新"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setSortMode(item)}
                  className={`rounded-md px-4 py-2 text-sm font-semibold ${sortMode === item ? "bg-white text-orange-600 shadow-sm" : "text-stone-600"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {tag ? (
            <button onClick={() => setTag("")} className="w-fit rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800">
              標籤：{tag} x
            </button>
          ) : null}
        </div>

        <form className="mb-6 grid gap-3 rounded-lg border border-orange-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold">發布你的痛點</h2>
          <div className="grid gap-3 md:grid-cols-[1fr_180px]">
            <input className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="痛點標題" />
            <select
              value={formCategory}
              onChange={(event) => setFormCategory(event.target.value as PainPoint["category"])}
              className="rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
            >
              {categories.filter((item) => item !== "全部").map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <textarea className="min-h-24 rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" placeholder="描述目前流程、卡點與希望達成的結果" />
          <button type="button" className="w-fit rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">
            發布並領取 +20 痛痛幣
          </button>
        </form>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">找不到結果</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.id} className="flex flex-col rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-stone-600">{item.poster}</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((itemTag) => (
                    <button key={itemTag} onClick={() => selectTag(itemTag)} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700 hover:bg-orange-100 hover:text-orange-700">
                      #{itemTag}
                    </button>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <div className="text-sm text-stone-500">
                    <span className="font-semibold text-stone-800">{item.likes}</span> 喜歡 · <span className="font-semibold text-stone-800">{item.comments}</span> 回覆
                  </div>
                  <button className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600">回覆賺幣 +50💡</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
