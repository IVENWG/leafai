import { useState, useCallback } from 'react';
import { PageShell } from '../components/PageShell';
import { CameraView } from '../components/CameraView';
import { MascotBot } from '../components/MascotBot';
import { AppButton } from '../components/AppButton';
import { LeafIcon } from '../components/LeafIcon';
import { useCamera } from '../hooks/useCamera';
import { captureFrame, blobToImageElement } from '../lib/imageUtils';
import { classifier } from '../lib/classifier';
import { db } from '../lib/db';
import { LEAF_CATEGORIES, type LeafCategoryKey } from '../lib/constants';
import type { Prediction } from '../lib/db';
import './ChallengePage.css';

interface ChallengePageProps {
  sessionId: string;
  onMistake: (prediction: { predictedLabel: string; confidence: number }) => void;
  onCorrect: () => void;
  onBack: () => void;
  onReport: () => void;
}

interface PredictionResult {
  label: string;
  confidence: number;
  allConfidences: Record<string, number>;
}

export function ChallengePage({ sessionId, onMistake, onCorrect, onBack, onReport }: ChallengePageProps) {
  const { videoRef, isReady, error, start, stop } = useCamera();
  const [cameraStarted, setCameraStarted] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [challengeCount, setChallengeCount] = useState(0);

  const handleStartCamera = useCallback(async () => {
    await start();
    setCameraStarted(true);
  }, [start]);

  const handlePredict = useCallback(async () => {
    if (!videoRef.current || !isReady || !classifier.isReady()) return;

    setPredicting(true);
    setResult(null);

    try {
      // Capture a temporary frame for prediction
      const { blob } = await captureFrame(videoRef.current, 512, 0.8);
      const img = await blobToImageElement(blob);
      const prediction = await classifier.predict(img);

      if (prediction) {
        const topConfidence = prediction.confidences[prediction.label] || 0;
        setResult({
          label: prediction.label,
          confidence: topConfidence,
          allConfidences: prediction.confidences,
        });
        setChallengeCount((c) => c + 1);
      } else {
        setResult({
          label: 'unknown',
          confidence: 0,
          allConfidences: {},
        });
      }
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setPredicting(false);
    }
  }, [videoRef, isReady]);

  const handleCorrect = useCallback(async () => {
    if (!result) return;
    await db.predictions.add({
      sessionId,
      predictedLabel: result.label,
      confidence: result.confidence,
      teacherMarkedCorrect: true,
      createdAt: new Date(),
    } as Prediction);
    setResult(null);
    onCorrect();
  }, [result, sessionId, onCorrect]);

  const handleWrong = useCallback(async () => {
    if (!result) return;
    onMistake({ predictedLabel: result.label, confidence: result.confidence });
  }, [result, onMistake]);

  const getConfidenceLabel = (conf: number) => {
    if (conf >= 0.75) return { text: '小叶AI比较有把握 😊', color: '#4CAF50' };
    if (conf >= 0.6) return { text: '小叶AI有点不确定 🤔', color: '#FF9800' };
    return { text: '小叶AI不太确定，可能需要更多清楚样本 😅', color: '#F44336' };
  };

  const predictedCat = result ? LEAF_CATEGORIES[result.label as LeafCategoryKey] : null;

  return (
    <PageShell>
      <div className="challenge-page">
        <div className="challenge-header">
          <AppButton variant="ghost" size="small" onClick={() => { stop(); onBack(); }} icon="←">
            返回采样
          </AppButton>
          <h2 className="challenge-title">挑战AI 🏆</h2>
          <p className="challenge-subtitle">拿一片新的叶子，看看小叶AI能不能猜对</p>
        </div>

        {!cameraStarted ? (
          <div className="challenge-camera-start">
            <MascotBot mood="happy" size={100} message="准备好了吗？" />
            <AppButton variant="primary" size="large" onClick={handleStartCamera} icon="📹">
              打开摄像头
            </AppButton>
          </div>
        ) : (
          <>
            <CameraView videoRef={videoRef} isReady={isReady} error={error} showGuide />

            {!result ? (
              <div className="challenge-action-area">
                <p className="challenge-prompt">请把一片新的叶子放在摄像头前</p>
                <AppButton
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={handlePredict}
                  disabled={predicting || !isReady}
                  icon={predicting ? '⏳' : '🤖'}
                >
                  {predicting ? 'AI正在思考中…' : '让AI猜一猜'}
                </AppButton>
              </div>
            ) : (
              <div className="challenge-result-area">
                {/* Result card */}
                <div className="challenge-result-card">
                  <MascotBot
                    mood={result.confidence >= 0.75 ? 'excited' : result.confidence >= 0.6 ? 'thinking' : 'confused'}
                    size={80}
                  />
                  <h3 className="challenge-result-title">
                    AI猜：
                  </h3>
                  {predictedCat ? (
                    <div className="challenge-result-label" style={{ color: predictedCat.color }}>
                      <LeafIcon category={result.label as LeafCategoryKey} size={40} />
                      <span>{predictedCat.emoji} {predictedCat.name}</span>
                    </div>
                  ) : (
                    <div className="challenge-result-label">无法识别 😶</div>
                  )}
                  <div className="challenge-confidence">
                    <div className="challenge-confidence-bar-bg">
                      <div
                        className="challenge-confidence-bar"
                        style={{
                          width: `${Math.round(result.confidence * 100)}%`,
                          background: result.confidence >= 0.75 ? '#4CAF50' : result.confidence >= 0.6 ? '#FF9800' : '#EF5350',
                        }}
                      />
                    </div>
                    <span className="challenge-confidence-text">
                      信心值：{Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                  <p
                    className="challenge-confidence-label"
                    style={{ color: getConfidenceLabel(result.confidence).color }}
                  >
                    {getConfidenceLabel(result.confidence).text}
                  </p>
                </div>

                {/* Judge buttons */}
                <div className="challenge-judge">
                  <p className="challenge-judge-question">AI猜得对吗？</p>
                  <div className="challenge-judge-buttons">
                    <AppButton variant="primary" size="large" onClick={handleCorrect} icon="✅">
                      猜对了
                    </AppButton>
                    <AppButton variant="danger" size="large" onClick={handleWrong} icon="❌">
                      猜错了
                    </AppButton>
                  </div>
                </div>
              </div>
            )}

            {challengeCount > 0 && !result && (
              <div className="challenge-stats">
                已挑战 {challengeCount} 次 |
                <AppButton variant="ghost" size="small" onClick={onReport} icon="📊">
                  查看报告
                </AppButton>
              </div>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
