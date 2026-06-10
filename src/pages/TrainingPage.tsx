import { useState, useEffect } from 'react';
import { PageShell } from '../components/PageShell';
import { MascotBot } from '../components/MascotBot';
import { AppButton } from '../components/AppButton';
import { LEAF_CATEGORIES } from '../lib/constants';
import './TrainingPage.css';

interface TrainingPageProps {
  sampleCounts: Record<string, number>;
  onComplete: () => void;
}

export function TrainingPage({ sampleCounts, onComplete }: TrainingPageProps) {
  const [phase, setPhase] = useState<'learning' | 'done'>('learning');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('done');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const categories = Object.values(LEAF_CATEGORIES);
  const total = categories.reduce((s, c) => s + (sampleCounts[c.key] || 0), 0);

  return (
    <PageShell>
      <div className="training-page">
        {phase === 'learning' ? (
          <>
            <div className="training-mascot">
              <MascotBot mood="thinking" size={140} message="正在努力学习…" />
            </div>
            <h2 className="training-title">小叶AI正在学习叶子的样子……</h2>

            <div className="training-samples-card">
              {categories.map((cat) => (
                <div key={cat.key} className="training-sample-row">
                  <span className="training-sample-emoji">{cat.emoji}</span>
                  <span className="training-sample-name">{cat.name}</span>
                  <span className="training-sample-count">{sampleCounts[cat.key] || 0} 张</span>
                </div>
              ))}
              <div className="training-sample-total">
                共 {total} 张叶子照片
              </div>
            </div>

            <div className="training-dots">
              <span className="training-dot" style={{ animationDelay: '0s' }}>🟢</span>
              <span className="training-dot" style={{ animationDelay: '0.3s' }}>🟢</span>
              <span className="training-dot" style={{ animationDelay: '0.6s' }}>🟢</span>
            </div>
          </>
        ) : (
          <>
            <div className="training-mascot">
              <MascotBot mood="excited" size={140} message="学习完成！" />
            </div>
            <h2 className="training-title-done">学习完成！🎉</h2>
            <p className="training-done-desc">现在可以挑战AI了，看看它能不能猜对叶子。</p>

            <div className="training-confetti">
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className="confetti-leaf"
                  style={{
                    left: `${10 + i * 11}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  🍃
                </span>
              ))}
            </div>

            <AppButton variant="success" size="large" fullWidth onClick={onComplete} icon="🏆">
              开始挑战AI
            </AppButton>
          </>
        )}
      </div>
    </PageShell>
  );
}
