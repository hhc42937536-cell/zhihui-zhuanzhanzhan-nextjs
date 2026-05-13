'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coin_type: 'pain' | 'wisdom';
}

const PRODUCTS: Product[] = [
  { id: '1', name: '線上課程折扣券', description: '合作平台線上課程 8 折優惠券一張', price: 50, coin_type: 'pain' },
  { id: '2', name: 'AI 工具訂閱月票', description: '精選 AI 工具一個月訂閱資格', price: 30, coin_type: 'wisdom' },
  { id: '3', name: '專家一對一諮詢', description: '與平台認證專家 30 分鐘線上諮詢', price: 80, coin_type: 'pain' },
  { id: '4', name: '電子書兌換碼', description: '智慧轉運精選電子書一本', price: 20, coin_type: 'wisdom' },
  { id: '5', name: '平台高級會員（月）', description: '解鎖進階功能，享受更多資源', price: 100, coin_type: 'pain' },
  { id: '6', name: '工具箱推薦位', description: '你的工具獲得首頁推薦曝光 7 天', price: 60, coin_type: 'wisdom' },
];

const COIN_LABEL: Record<string, string> = {
  pain: '痛痛幣',
  wisdom: '智慧幣',
};

const COIN_COLOR: Record<string, string> = {
  pain: 'text-orange-600 bg-orange-100',
  wisdom: 'text-teal-600 bg-teal-100',
};

export default function CoinShopPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [redeeming, setRedeeming] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        fetchProfile(data.user.id);
      }
    });
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('users_profile').select('*').eq('id', userId).single();
    if (data) setProfile(data);
  }

  async function handleRedeem(product: Product) {
    if (!user || !profile) return setMessage('請先登入');
    const coinField = product.coin_type === 'pain' ? 'pain_coins' : 'wisdom_coins';
    const balance = profile[coinField] ?? 0;

    if (balance < product.price) {
      return setMessage(`❌ ${COIN_LABEL[product.coin_type]}不足（目前 ${balance}，需要 ${product.price}）`);
    }

    setRedeeming(product.id);
    const { error } = await supabase
      .from('users_profile')
      .update({ [coinField]: balance - product.price })
      .eq('id', user.id);

    if (!error) {
      await supabase.from('coin_transactions').insert({
        user_id: user.id,
        coin_type: product.coin_type,
        amount: -product.price,
        description: `兌換：${product.name}`,
      });
      setMessage(`✅ 成功兌換「${product.name}」！`);
      fetchProfile(user.id);
    } else {
      setMessage('兌換失敗：' + error.message);
    }
    setRedeeming(null);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">請先登入以使用兌換商店</p>
          <a href="/login" className="bg-purple-500 text-white px-6 py-2 rounded-xl hover:bg-purple-600">
            前往登入
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">🎁 兌換商店</h1>

        {/* Balance */}
        {profile && (
          <div className="flex gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm px-5 py-3">
              <div className="text-xs text-gray-400">痛痛幣</div>
              <div className="text-xl font-bold text-orange-500">{profile.pain_coins ?? 0}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-5 py-3">
              <div className="text-xs text-gray-400">智慧幣</div>
              <div className="text-xl font-bold text-teal-500">{profile.wisdom_coins ?? 0}</div>
            </div>
          </div>
        )}

        {message && (
          <div className="bg-white border border-purple-200 rounded-xl px-4 py-3 mb-6 text-sm text-purple-700">
            {message}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold px-2 py-1 rounded-xl ${COIN_COLOR[product.coin_type]}`}>
                  {product.price} {COIN_LABEL[product.coin_type]}
                </span>
                <button
                  onClick={() => handleRedeem(product)}
                  disabled={redeeming === product.id}
                  className="bg-purple-500 text-white text-sm px-4 py-1.5 rounded-xl hover:bg-purple-600 disabled:opacity-50 transition"
                >
                  {redeeming === product.id ? '處理中...' : '立即兌換'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
