'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = ['工作', '生活', '學習', '健康', '人際', '其他'];

const CATEGORY_COLORS: Record<string, string> = {
  工作: 'bg-orange-100 text-orange-700',
  生活: 'bg-yellow-100 text-yellow-700',
  學習: 'bg-blue-100 text-blue-700',
  健康: 'bg-green-100 text-green-700',
  人際: 'bg-purple-100 text-purple-700',
  其他: 'bg-gray-100 text-gray-700',
};

interface PainPoint {
  id: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  user_id: string;
}

export default function PainPointHubPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [form, setForm] = useState({ title: '', content: '', category: '工作' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    fetchPainPoints();
  }, []);

  async function fetchPainPoints() {
    const { data } = await supabase
      .from('pain_points')
      .select('*')
      .order('likes', { ascending: false });
    if (data) setPainPoints(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return setMessage('請先登入');
    setSubmitting(true);
    const { error } = await supabase.from('pain_points').insert({
      ...form,
      user_id: user.id,
      likes: 0,
    });
    if (!error) {
      await supabase.rpc('increment_pain_coins', { user_id: user.id, amount: 20 });
      setForm({ title: '', content: '', category: '工作' });
      setMessage('✅ 痛點已提交！獲得 20 痛痛幣');
      fetchPainPoints();
    } else {
      setMessage('提交失敗：' + error.message);
    }
    setSubmitting(false);
  }

  async function handleLike(id: string) {
    if (!user) return setMessage('請先登入才能按讚');
    await supabase.rpc('increment_pain_point_likes', { point_id: id });
    fetchPainPoints();
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">請先登入以使用痛點中心</p>
          <a href="/login" className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600">
            前往登入
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-8">💬 痛點中心</h1>

        {/* Submit Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">分享你的痛點，獲得 20 痛痛幣</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="痛點標題"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <textarea
              placeholder="描述你的痛點..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {message && <p className="text-sm text-orange-600">{message}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 disabled:opacity-50"
            >
              {submitting ? '提交中...' : '提交痛點'}
            </button>
          </form>
        </div>

        {/* Pain Points List */}
        <div className="space-y-4">
          {painPoints.map((pp) => (
            <div key={pp.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[pp.category] ?? 'bg-gray-100 text-gray-700'}`}>
                      {pp.category}
                    </span>
                    <h3 className="font-semibold text-gray-800">{pp.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{pp.content}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleLike(pp.id)}
                    className="bg-orange-100 text-orange-600 text-xs px-3 py-1.5 rounded-xl hover:bg-orange-200 transition"
                  >
                    我也有這個痛點
                  </button>
                  <span className="text-sm font-bold text-orange-500">{pp.likes} 人</span>
                </div>
              </div>
            </div>
          ))}
          {painPoints.length === 0 && (
            <p className="text-center text-gray-400 py-10">還沒有痛點，成為第一個分享的人！</p>
          )}
        </div>
      </div>
    </div>
  );
}
