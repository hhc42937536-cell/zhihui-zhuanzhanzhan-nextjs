"use client";

import { useEffect, useMemo, useState } from "react";
import { SHOP_ITEMS, type ShopItem } from "@/lib/mock-data";

const categories = ["全部", "服務", "特權", "獎品"] as const;
const coinTypes = [
  { label: "全部", value: "all" },
  { label: "痛痛幣", value: "pain" },
  { label: "智慧幣", value: "wisdom" },
] as const;

const coinMeta: Record<ShopItem["coinType"], { label: string; emoji: string; key: "painCoins" | "wisdomCoins" }> = {
  pain: { label: "痛痛幣", emoji: "🩹", key: "painCoins" },
  wisdom: { label: "智慧幣", emoji: "💡", key: "wisdomCoins" },
};

export default function CoinShopPage() {
  const [painCoins, setPainCoins] = useState(1200);
  const [wisdomCoins, setWisdomCoins] = useState(900);
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const [coinType, setCoinType] = useState<(typeof coinTypes)[number]["value"]>("all");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedPain = window.localStorage.getItem("painCoins");
    const savedWisdom = window.localStorage.getItem("wisdomCoins");
    if (savedPain) setPainCoins(Number(savedPain));
    if (savedWisdom) setWisdomCoins(Number(savedWisdom));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("painCoins", String(painCoins));
    window.localStorage.setItem("wisdomCoins", String(wisdomCoins));
  }, [painCoins, wisdomCoins]);

  const filtered = useMemo(() => {
    return SHOP_ITEMS.filter((item) => {
      const matchCategory = category === "全部" || item.category === category;
      const matchCoin = coinType === "all" || item.coinType === coinType;
      return matchCategory && matchCoin;
    });
  }, [category, coinType]);

  const confirmExchange = () => {
    if (!selectedItem) return;
    const meta = coinMeta[selectedItem.coinType];
    if (meta.key === "painCoins") {
      setPainCoins((value) => Math.max(0, value - selectedItem.price));
    } else {
      setWisdomCoins((value) => Math.max(0, value - selectedItem.price));
    }
    setSelectedItem(null);
    setToast("兌換成功！");
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">幣值商店</p>
            <h1 className="mt-2 text-3xl font-bold">用貢獻兌換服務、特權與獎品</h1>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-orange-200 bg-white px-4 py-3 shadow-sm">🩹 痛痛幣 <span className="font-bold text-orange-600">{painCoins}</span></div>
            <div className="rounded-lg border border-amber-200 bg-white px-4 py-3 shadow-sm">💡 智慧幣 <span className="font-bold text-amber-600">{wisdomCoins}</span></div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {coinTypes.map((item) => (
              <button key={item.value} onClick={() => setCoinType(item.value)} className={`rounded-full px-4 py-2 text-sm font-semibold ${coinType === item.value ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => {
            const meta = coinMeta[item.coinType];
            return (
              <article key={item.id} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-4xl">{item.emoji}</div>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">庫存 {item.stock}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold">{item.name}</h2>
                <p className="mt-2 min-h-20 text-sm leading-6 text-stone-600">{item.description}</p>
                <div className="mt-4 font-bold text-orange-600">
                  {item.price} {meta.emoji} {meta.label}
                </div>
                <button onClick={() => setSelectedItem(item)} className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600">
                  兌換
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {selectedItem ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">確認兌換</h2>
            <p className="mt-3 text-stone-600">確定要兌換「{selectedItem.name}」並扣除 {selectedItem.price} {coinMeta[selectedItem.coinType].label}？</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setSelectedItem(null)} className="rounded-lg bg-stone-100 px-4 py-2 font-semibold text-stone-700 hover:bg-stone-200">
                取消
              </button>
              <button onClick={confirmExchange} className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600">
                確認兌換
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-stone-900 px-5 py-3 font-semibold text-white shadow-lg">{toast}</div> : null}
    </main>
  );
}
