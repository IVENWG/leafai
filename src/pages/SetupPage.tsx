import { PageShell } from '../components/PageShell';
import { LeafIcon } from '../components/LeafIcon';
import { AppButton } from '../components/AppButton';
import { ProgressBar } from '../components/ProgressBar';
import { LEAF_CATEGORIES } from '../lib/constants';
import './SetupPage.css';

interface SetupPageProps {
  sampleCounts: Record<string, number>;
  onContinue: () => void;
  onBack: () => void;
}

export function SetupPage({ sampleCounts, onContinue, onBack }: SetupPageProps) {
  const categories = Object.values(LEAF_CATEGORIES);

  return (
    <PageShell>
      <div className="setup-page">
        <div className="setup-header">
          <AppButton variant="ghost" size="small" onClick={onBack} icon="←">
            返回
          </AppButton>
          <h2 className="setup-title">今天要教AI认识 4 种叶子 🍃</h2>
          <p className="setup-desc">
            先认识这四种叶子，然后我们去采集样本给AI学习。
          </p>
        </div>

        <div className="setup-cards">
          {categories.map((cat) => {
            const count = sampleCounts[cat.key] || 0;
            return (
              <div
                key={cat.key}
                className="setup-card"
                style={{ borderColor: cat.color, background: cat.lightColor }}
              >
                <div className="setup-card-icon">
                  <LeafIcon category={cat.key} size={56} animated />
                </div>
                <div className="setup-card-info">
                  <h3 className="setup-card-name" style={{ color: cat.color }}>
                    {cat.emoji} {cat.name}
                  </h3>
                  <p className="setup-card-desc">{cat.description}</p>
                  <ProgressBar current={count} target={8} label="已收集样本" color={cat.color} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="setup-tip-card">
          <span className="setup-tip-icon">💡</span>
          <p className="setup-tip-text">
            每一类建议至少收集 <strong>8 张</strong>叶子照片，AI 才更容易猜对。
          </p>
        </div>

        <AppButton variant="primary" size="large" fullWidth onClick={onContinue} icon="📸">
          进入采样
        </AppButton>
      </div>
    </PageShell>
  );
}
