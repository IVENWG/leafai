import { useState, useEffect, useRef, useCallback } from 'react';
import { PageShell } from '../components/PageShell';
import { MascotBot } from '../components/MascotBot';
import { AppButton } from '../components/AppButton';
import { LeafIcon } from '../components/LeafIcon';
import { getSessionSampleCounts, getSessionPredictionStats, clearAllData } from '../lib/db';
import { LEAF_CATEGORIES, MISTAKE_REASONS } from '../lib/constants';
import { ConfirmDialog } from '../components/ConfirmDialog';
import './ReportPage.css';

interface ReportPageProps {
  sessionId: string;
  onClearAndRestart: () => void;
  onBack: () => void;
}

export function ReportPage({ sessionId, onClearAndRestart, onBack }: ReportPageProps) {
  const [sampleCounts, setSampleCounts] = useState<Record<string, number>>({});
  const [stats, setStats] = useState({ total: 0, correct: 0, wrong: 0, reasons: {} as Record<string, number> });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSessionSampleCounts(sessionId).then(setSampleCounts);
    getSessionPredictionStats(sessionId).then(setStats);
  }, [sessionId]);

  const totalSamples = Object.values(sampleCounts).reduce((s, c) => s + c, 0);
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  const handleClear = useCallback(async () => {
    setShowClearConfirm(false);
    await clearAllData();
    onClearAndRestart();
  }, [onClearAndRestart]);

  const topReasons = Object.entries(stats.reasons)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key, count]) => {
      const found = MISTAKE_REASONS.find((r) => r.key === key);
      return { label: found?.label || key, count };
    });

  return (
    <PageShell showPrivacy={false}>
      <div className="report-page">
        <div className="report-header">
          <AppButton variant="ghost" size="small" onClick={onBack} icon="←">
            返回
          </AppButton>
          <h2 className="report-title">📊 我的AI叶子训练记录</h2>
        </div>

        {/* Report card */}
        <div className="report-card" ref={reportRef}>
          <div className="report-card-header">
            <div className="report-card-deco">🌿 AI叶子训练师 🌿</div>
            <h3 className="report-card-title">我的训练记录卡</h3>
            <p className="report-card-date">
              {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="report-card-body">
            {/* Samples */}
            <div className="report-section">
              <h4 className="report-section-title">🍃 教AI认识的叶子</h4>
              <div className="report-sample-grid">
                {Object.entries(LEAF_CATEGORIES).map(([key, cat]) => (
                  <div key={key} className="report-sample-item">
                    <LeafIcon category={key as keyof typeof LEAF_CATEGORIES} size={32} />
                    <span className="report-sample-name">{cat.name}</span>
                    <span className="report-sample-count">{sampleCounts[key] || 0} 张</span>
                  </div>
                ))}
              </div>
              <p className="report-total-samples">共采集 {totalSamples} 张叶子照片</p>
            </div>

            {/* Stats */}
            <div className="report-section">
              <h4 className="report-section-title">🏆 挑战结果</h4>
              <div className="report-stats-grid">
                <div className="report-stat-item">
                  <span className="report-stat-num">{stats.total}</span>
                  <span className="report-stat-label">挑战次数</span>
                </div>
                <div className="report-stat-item report-stat-correct">
                  <span className="report-stat-num">{stats.correct}</span>
                  <span className="report-stat-label">猜对次数</span>
                </div>
                <div className="report-stat-item report-stat-wrong">
                  <span className="report-stat-num">{stats.wrong}</span>
                  <span className="report-stat-label">猜错次数</span>
                </div>
                <div className="report-stat-item">
                  <span className="report-stat-num">{accuracy}%</span>
                  <span className="report-stat-label">准确率</span>
                </div>
              </div>
            </div>

            {/* Mistake reasons */}
            {topReasons.length > 0 && (
              <div className="report-section">
                <h4 className="report-section-title">🔍 常见猜错原因</h4>
                <div className="report-reasons-list">
                  {topReasons.map((r, i) => (
                    <div key={i} className="report-reason-item">
                      <span className="report-reason-num">{i + 1}</span>
                      <span>{r.label}（{r.count}次）</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insight */}
            <div className="report-insight-card">
              <p className="report-insight-title">🌟 今日发现</p>
              <p className="report-insight-text">
                AI会学习，但也会犯错。<br />
                人类要先观察，再教AI，再验证AI。<br />
                教好AI，是我们的责任！
              </p>
            </div>
          </div>

          <div className="report-card-footer">
            <MascotBot mood="happy" size={60} />
            <p>小叶AI · 一起学AI · 一起爱自然 🌱</p>
          </div>
        </div>

        {/* Actions */}
        <div className="report-actions">
          <AppButton variant="danger" size="medium" fullWidth onClick={() => setShowClearConfirm(true)} icon="🗑️">
            清除本场数据
          </AppButton>
        </div>

        <ConfirmDialog
          open={showClearConfirm}
          title="确定要清除数据吗？"
          message="确定要清除本场拍摄的叶子照片和训练记录吗？清除后不可恢复。"
          confirmLabel="清除全部数据"
          onConfirm={handleClear}
          onCancel={() => setShowClearConfirm(false)}
        />
      </div>
    </PageShell>
  );
}
