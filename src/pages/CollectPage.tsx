import { useState, useCallback } from 'react';
import { PageShell } from '../components/PageShell';
import { CameraView } from '../components/CameraView';
import { AppButton } from '../components/AppButton';
import { LeafIcon } from '../components/LeafIcon';
import { useCamera } from '../hooks/useCamera';
import { captureFrame, blobToImageElement } from '../lib/imageUtils';
import { classifier } from '../lib/classifier';
import { db, getSessionSampleCounts } from '../lib/db';
import { LEAF_CATEGORIES, PHOTO_TIPS, type LeafCategoryKey } from '../lib/constants';
import type { Sample } from '../lib/db';
import './CollectPage.css';

interface CollectPageProps {
  sessionId: string;
  sampleCounts: Record<string, number>;
  onCountsChange: (counts: Record<string, number>) => void;
  onToTraining: () => void;
  onToChallenge: () => void;
  onBack: () => void;
}

export function CollectPage({
  sessionId,
  sampleCounts,
  onCountsChange,
  onToTraining,
  onToChallenge,
  onBack,
}: CollectPageProps) {
  const { videoRef, isReady, error, start, stop } = useCamera();
  const [capturing, setCapturing] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const refreshCounts = useCallback(async () => {
    const counts = await getSessionSampleCounts(sessionId);
    onCountsChange(counts);
  }, [sessionId, onCountsChange]);

  const handleStartCamera = useCallback(async () => {
    await start();
    setCameraStarted(true);
  }, [start]);

  const handleCapture = useCallback(async (label: LeafCategoryKey) => {
    if (!videoRef.current || !isReady) return;
    if (!classifier.isReady()) return;

    const catInfo = LEAF_CATEGORIES[label];
    setCapturing(label);
    setFeedback(null);

    try {
      // 1. Capture frame
      const { blob, dataUrl } = await captureFrame(videoRef.current, 512, 0.8);

      // 2. Save to IndexedDB
      const sample: Sample = {
        sessionId,
        label,
        source: 'live',
        imageBlob: blob,
        imageUrl: dataUrl,
        createdAt: new Date(),
      };
      await db.samples.add(sample);

      // 3. Feed to classifier
      const img = await blobToImageElement(blob);
      await classifier.addExample(img, label);

      // 4. Update counts
      await refreshCounts();

      // 5. Show feedback
      setFeedback(`小叶AI又学习了一张${catInfo.name}！ ${catInfo.emoji}`);
      setTimeout(() => setFeedback(null), 2500);
    } catch (err) {
      console.error('Capture error:', err);
      setFeedback('拍照出了点问题，请再试一次 😅');
    } finally {
      setCapturing(null);
    }
  }, [videoRef, isReady, sessionId, refreshCounts]);

  const handleLoadPresets = useCallback(async () => {
    if (!classifier.isReady()) return;

    const categories = Object.keys(LEAF_CATEGORIES) as LeafCategoryKey[];
    for (const label of categories) {
      for (let i = 1; i <= 4; i++) {
        // Try .jpg first, then .svg
        let url = `/samples/${label}_${i}.jpg`;
        let resp = await fetch(url);
        if (!resp.ok) {
          url = `/samples/${label}_${i}.svg`;
          resp = await fetch(url);
        }
        if (!resp.ok) continue;
        const blob = await resp.blob();

        try {
          // Save to DB
          await db.samples.add({
            sessionId,
            label,
            source: 'preset',
            imageBlob: blob,
            createdAt: new Date(),
          });

          // Feed to classifier
          const img = await blobToImageElement(blob);
          await classifier.addExample(img, label);
        } catch {
          // Skip missing presets
        }
      }
    }
    await refreshCounts();
    setFeedback('预置样本加载完成！ 🎉');
    setTimeout(() => setFeedback(null), 2500);
  }, [sessionId, refreshCounts]);

  const allReady = Object.values(LEAF_CATEGORIES).every(
    (cat) => (sampleCounts[cat.key] || 0) >= 8
  );

  const canChallenge = Object.values(LEAF_CATEGORIES).every(
    (cat) => (sampleCounts[cat.key] || 0) >= 5
  );

  const totalSamples = Object.values(sampleCounts).reduce((s, c) => s + c, 0);

  return (
    <PageShell>
      <div className="collect-page">
        {/* Header */}
        <div className="collect-header">
          <AppButton variant="ghost" size="small" onClick={() => { stop(); onBack(); }} icon="←">
            返回
          </AppButton>
          <h2 className="collect-title">采集叶子样本 📸</h2>
          <p className="collect-subtitle">给AI看很多叶子照片，让它学会分类</p>
        </div>

        {/* CameraView is ALWAYS mounted so <video> ref is always available.
            Before camera starts: gray box with invisible video.
            After start: placeholder → live feed. */}
        <CameraView
          videoRef={videoRef}
          isReady={isReady}
          error={error}
          showGuide
          started={cameraStarted}
        />

        {/* Start button overlay — shown before camera opens */}
        {!cameraStarted && !error && (
          <div className="collect-camera-start">
            <div className="collect-camera-icon">📷</div>
            <p>准备好摄像头，开始给AI看叶子</p>
            <AppButton variant="primary" size="large" onClick={handleStartCamera} icon="📹">
              打开摄像头
            </AppButton>
          </div>
        )}

        {/* Controls — only shown after camera is started */}
        {cameraStarted && (
          <>
            {/* Photo tips */}
            <div className="collect-tips">
              <span className="collect-tip-icon">💡</span>
              <span className="collect-tip-text">{PHOTO_TIPS[tipIndex]}</span>
              <button
                className="collect-tip-next"
                onClick={() => setTipIndex((i) => (i + 1) % PHOTO_TIPS.length)}
              >
                换一条
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="collect-feedback">
                {feedback}
              </div>
            )}

            {/* Category buttons */}
            <div className="collect-category-buttons">
              {Object.values(LEAF_CATEGORIES).map((cat) => {
                const count = sampleCounts[cat.key] || 0;
                const reached = count >= 8;
                return (
                  <button
                    key={cat.key}
                    className={`collect-cat-btn ${reached ? 'collect-cat-btn-done' : ''} ${capturing === cat.key ? 'collect-cat-btn-capturing' : ''}`}
                    style={{ borderColor: cat.color }}
                    onClick={() => handleCapture(cat.key)}
                    disabled={!!capturing}
                  >
                    <div className="collect-cat-btn-left">
                      <LeafIcon category={cat.key} size={36} />
                      <div className="collect-cat-btn-info">
                        <span className="collect-cat-btn-name">给AI看一张{cat.name}</span>
                        <span className="collect-cat-btn-count">
                          已学习 {count} 张 {reached && '✅'}
                        </span>
                      </div>
                    </div>
                    {capturing === cat.key && (
                      <div className="collect-cat-btn-loading">
                        <div className="spinner" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sample progress */}
            <div className="collect-progress">
              <p className="collect-progress-text">
                总共已采集 <strong>{totalSamples}</strong> 张样本
              </p>
              {allReady && (
                <p className="collect-progress-ready">🎉 AI准备好挑战啦！</p>
              )}
            </div>

            {/* Actions */}
            <div className="collect-actions">
              <AppButton
                variant="secondary"
                size="medium"
                fullWidth
                onClick={handleLoadPresets}
                icon="📦"
                disabled={!!capturing}
              >
                加载预置样本
              </AppButton>

              <AppButton
                variant="success"
                size="large"
                fullWidth
                onClick={canChallenge ? onToChallenge : onToTraining}
                icon={canChallenge ? '🏆' : '🎓'}
                disabled={!!capturing}
              >
                {canChallenge ? '进入AI挑战' : '进入学习动画'}
              </AppButton>

              {!canChallenge && (
                <p className="collect-warning">
                  ⚠️ AI还没有看够叶子，请每一类至少收集5张。
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
