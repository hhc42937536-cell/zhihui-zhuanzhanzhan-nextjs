'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const LEVELS = ['基礎', '進階', '專家'];

interface Props {
  userId: string;
  painPointId: string;
}

export default function SolutionSubmitForm({ userId, painPointId }: Props) {
  const supabase = createClient();
  const [form, setForm] = useState({ content: '', level: '基礎' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('solutions').insert({
      ...form,
      user_id: userId,
      pain_point_id: painPointId,
      tps_score: 0,
    });
    if (!error) {
      await supabase.rpc('increment_wisdom_coins', { user_id: userId, amount: 30 });
      setForm({ content: '', level: '基礎' });
      setMessage('✅ 解法已提交！獲得 30 智慧幣');
    } else {
      setMessage('提交失敗：' + error.message);
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="描述你的 AI 解法..."
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
        rows={4}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <select
        value={form.level}
        onChange={(e) => setForm({ ...form, level: e.target.value })}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>
      {message && <p className="text-sm text-amber-600">{message}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-amber-500 text-white px-6 py-2 rounded-xl hover:bg-amber-600 disabled:opacity-50"
      >
        {submitting ? '提交中...' : '提交解法（+30 智慧幣）'}
      </button>
    </form>
  );
}
