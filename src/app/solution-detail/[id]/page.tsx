import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SolutionSubmitForm from './SolutionSubmitForm';

export const metadata: Metadata = { title: '解法詳情 | 智慧轉運站' };

const LEVEL_COLORS: Record<string, string> = {
  基礎: 'bg-amber-100 text-amber-700',
  進階: 'bg-orange-100 text-orange-700',
  專家: 'bg-red-100 text-red-700',
};

export default async function SolutionDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: solution } = await supabase
    .from('solutions')
    .select('*, pain_points(*)')
    .eq('id', params.id)
    .single();

  if (!solution) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  const painPoint = solution.pain_points as any;

  return (
    <div className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <a href="/solution-gallery" className="text-amber-600 text-sm hover:underline">← 返回解法列表</a>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">解法詳情</h1>
        </div>

        {/* Solution Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[solution.level] ?? 'bg-gray-100 text-gray-700'}`}>
              {solution.level}
            </span>
            <div className="text-sm text-amber-600 font-bold">TPS {solution.tps_score ?? 0}</div>
          </div>
          <p className="text-gray-700 leading-relaxed">{solution.content}</p>
        </div>

        {/* Related Pain Point */}
        {painPoint && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-orange-600 mb-2">相關痛點</h2>
            <h3 className="font-semibold text-gray-800">{painPoint.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{painPoint.content}</p>
          </div>
        )}

        {/* Submit New Solution */}
        {user ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">為此痛點提交解法</h2>
            <SolutionSubmitForm
              userId={user.id}
              painPointId={solution.pain_point_id}
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <p className="text-gray-600 mb-3">登入後可提交解法並獲得智慧幣</p>
            <a href="/login" className="bg-amber-500 text-white px-6 py-2 rounded-xl hover:bg-amber-600">
              前往登入
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
