import { useState } from 'react';
import { PageShell } from '../components/PageShell';
import { MascotBot } from '../components/MascotBot';
import { AppButton } from '../components/AppButton';
import { db } from '../lib/db';
import { LEAF_CATEGORIES, MISTAKE_REASONS, type LeafCategoryKey } from '../lib/constants';
import type { Prediction } from '../lib/db';
import './MistakePage.css';

interface MistakePageProps {
  sessionId: string;
  prediction: { predictedLabel: string; confidence: number };
  onRetry: () => void;
  onAddSamples: () => void;
}

export function MistakePage({ sessionId, prediction, onRetry, onAddSamples }: MistakePageProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const toggleReason = (key: string) => {
    setSelectedReasons((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
    );
  };

  const handleSaveAndRetry = async () => {
    await db.predictions.add({
      sessionId,
      predictedLabel: prediction.predictedLabel,
      confidence: prediction.confidence,
      teacherMarkedCorrect: false,
      mistakeReasons: selectedReasons,
      createdAt: new Date(),
    } as Prediction);
    setSelectedReasons([]);
    onRetry();
  };

  const predictedCat = LEAF_CATEGORIES[prediction.predictedLabel as LeafCategoryKey];

  return (
    <PageShell>
      <div className="mistake-page">
        <div className="mistake-mascot">
          <MascotBot mood="confused" size={100} message="我猜错了…" />
        </div>

        <h2 className="mistake-title">AI为什么猜错了？🤔</h2>

        {predictedCat && (
          <div className="mistake-guess-info">
            AI猜的是 <strong>{predictedCat.emoji} {predictedCat.name}</strong>，
            但猜错了。
          </div>
        )}

        <div className="mistake-reasons-card">
          <p className="mistake-reasons-label">你觉得可能是哪个原因？</p>
          <div className="mistake-reasons-list">
            {MISTAKE_REASONS.map((reason) => (
              <button
                key={reason.key}
                className={`mistake-reason-btn ${selectedReasons.includes(reason.key) ? 'mistake-reason-selected' : ''}`}
                onClick={() => toggleReason(reason.key)}
              >
                <span className="mistake-reason-check">
                  {selectedReasons.includes(reason.key) ? '☑️' : '⬜'}
                </span>
                <span>{reason.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mistake-insight-card">
          <span className="mistake-insight-icon">💡</span>
          <p className="mistake-insight-text">
            AI猜错不是坏掉了，可能是我们给它看的例子还不够好。
          </p>
        </div>

        <div className="mistake-actions">
          <AppButton variant="primary" size="large" fullWidth onClick={handleSaveAndRetry} icon="🔄">
            重新挑战AI
          </AppButton>
          <AppButton variant="secondary" size="medium" fullWidth onClick={onAddSamples} icon="📸">
            补充更好的样本
          </AppButton>
        </div>
      </div>
    </PageShell>
  );
}
