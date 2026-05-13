'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  downloads: number;
  user_id: string;
}

export default function ToolLibraryPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [form, setForm] = useState({ name: '', description: '', url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    fetchTools();
  }, []);

  async function fetchTools() {
    const { data } = await supabase.from('tools').select('*').order('downloads', { ascending: false });
    if (data) setTools(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return setMessage('請先登入');
    setSubmitting(true);
    const { error } = await supabase.from('tools').insert({
      ...form,
      user_id: user.id,
      downloads: 0,
    });
    if (!error) {
      await supabase.rpc('increment_wisdom_coins', { user_id: user.id, amount: 50 });
      setForm({ name: '', description: '', url: '' });
      setMessage('✅ 工具已上傳！獲得 50 智慧幣');
      fetchTools();
    } else {
      setMessage('上傳失敗：' + error.message);
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-600 mb-8">🔧 工具箱</h1>

        {/* Upload Form */}
        {user ? (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">上傳工具，獲得 50 智慧幣</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="工具名稱"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <textarea
                placeholder="工具描述..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <input
                type="url"
                placeholder="工具連結 (https://...)"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              {message && <p className="text-sm text-teal-600">{message}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="bg-teal-500 text-white px-6 py-2 rounded-xl hover:bg-teal-600 disabled:opacity-50"
              >
                {submitting ? '上傳中...' : '上傳工具'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center">
            <p className="text-gray-600 mb-3">登入後可上傳工具並獲得 50 智慧幣</p>
            <a href="/login" className="bg-teal-500 text-white px-6 py-2 rounded-xl hover:bg-teal-600">
              前往登入
            </a>
          </div>
        )}

        {/* Tools List */}
        <div className="grid gap-4">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 text-sm hover:underline"
                  >
                    前往工具 →
                  </a>
                </div>
                <div className="text-center text-sm text-teal-600">
                  <div className="font-bold">{tool.downloads}</div>
                  <div className="text-xs text-gray-400">下載數</div>
                </div>
              </div>
            </div>
          ))}
          {tools.length === 0 && (
            <p className="text-center text-gray-400 py-10">還沒有工具，成為第一個貢獻者！</p>
          )}
        </div>
      </div>
    </div>
  );
}
