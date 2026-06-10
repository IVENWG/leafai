import { useState, useEffect } from 'react';
import { PageShell } from '../components/PageShell';
import { MascotBot } from '../components/MascotBot';
import { AppButton } from '../components/AppButton';
import { hasAnyData, getLatestSessionId, getSessionSampleCounts } from '../lib/db';
import { LEAF_CATEGORIES } from '../lib/constants';
import './StartPage.css';

interface StartPageProps {
  onStart: () => void;
  onRestore: (sessionId: string) => void;
}

export function StartPage({ onStart, onRestore }: StartPageProps) {
  const [hasData, setHasData] = useState(false);
  const [prevSessionId, setPrevSessionId] = useState<string | null>(null);
  const [prevCounts, setPrevCounts] = useState<Record<string, number> | null>(null);
  const [showRestore, setShowRestore] = useState(false);

  useEffect(() => {
    hasAnyData().then((exists) => {
      if (exists) {
        setHasData(true);
        getLatestSessionId().then((sid) => {
          if (sid) {
            setPrevSessionId(sid);
            getSessionSampleCounts(sid).then(setPrevCounts);
          }
        });
      }
    });
  }, []);

  return (
    <PageShell>
      <div className="start-page">
        {/* Hero section */}
        <div className="start-hero">
          <div className="start-sun">☀️</div>
          <MascotBot mood="waving" size={100} />
          <h1 className="start-title">AI叶子训练师</h1>
          <p className="start-subtitle">教AI认识农场里的叶子 🌱</p>
        </div>

        {/* Intro card */}
        <div className="start-intro-card">
          <p className="start-intro-text">
            今天不是AI教我们，而是<strong>我们来教AI</strong>。
            给AI看很多清楚的叶子照片，它就会慢慢学会判断。
          </p>
        </div>

        {/* Activity info */}
        <div className="start-info-grid">
          <div className="start-info-item">
            <span className="start-info-icon">👧</span>
            <span className="start-info-label">适合年龄</span>
            <span className="start-info-value">小学1-2年级</span>
          </div>
          <div className="start-info-item">
            <span className="start-info-icon">⏰</span>
            <span className="start-info-label">活动时长</span>
            <span className="start-info-value">90分钟</span>
          </div>
          <div className="start-info-item">
            <span className="start-info-icon">🎯</span>
            <span className="start-info-label">活动目标</span>
            <span className="start-info-value">观察·分类·训练·测试·纠错</span>
          </div>
        </div>

        {/* Actions */}
        <div className="start-actions">
          <AppButton variant="primary" size="large" fullWidth onClick={onStart} icon="🚀">
            开始教AI
          </AppButton>

          {hasData && prevSessionId && (
            <AppButton
              variant="secondary"
              size="medium"
              fullWidth
              onClick={() => setShowRestore(true)}
              icon="📂"
            >
              查看上次训练
            </AppButton>
          )}
        </div>

        {/* Restore panel */}
        {showRestore && hasData && prevSessionId && prevCounts && (
          <div className="start-restore-card">
            <h3 className="start-restore-title">发现上一场训练数据</h3>
            <div className="start-restore-counts">
              {Object.entries(LEAF_CATEGORIES).map(([key, info]) => (
                <div key={key} className="start-restore-count-item">
                  <span>{info.emoji} {info.name}</span>
                  <span className="start-restore-count-num">{prevCounts[key] || 0} 张</span>
                </div>
              ))}
            </div>
            <div className="start-restore-actions">
              <AppButton variant="primary" size="medium" onClick={() => onRestore(prevSessionId)}>
                恢复训练
              </AppButton>
              <AppButton variant="secondary" size="medium" onClick={() => setShowRestore(false)}>
                取消
              </AppButton>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
