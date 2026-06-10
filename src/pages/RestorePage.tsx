import { useState, useCallback } from 'react';
import { PageShell } from '../components/PageShell';
import { MascotBot } from '../components/MascotBot';
import { AppButton } from '../components/AppButton';
import { db, getSessionSampleCounts, clearAllData } from '../lib/db';
import { classifier } from '../lib/classifier';
import { blobToImageElement, urlToImageElement } from '../lib/imageUtils';
import { LEAF_CATEGORIES, type LeafCategoryKey } from '../lib/constants';
import { ConfirmDialog } from '../components/ConfirmDialog';
import './RestorePage.css';

interface RestorePageProps {
  sessionId: string;
  onRestored: (counts: Record<string, number>) => void;
  onClearAndStart: () => void;
}

export function RestorePage({ sessionId, onRestored, onClearAndStart }: RestorePageProps) {
  const [restoring, setRestoring] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [statusMsg, setStatusMsg] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleRestore = useCallback(async () => {
    setRestoring(true);

    try {
      // Load MobileNet
      setStatusMsg('正在加载AI模型…');
      await classifier.loadModel((msg) => setStatusMsg(msg));

      // Get all samples from IndexedDB
      const samples = await db.samples.where('sessionId').equals(sessionId).toArray();
      setProgress({ current: 0, total: samples.length });

      // Rebuild KNN classifier
      classifier.clearAll();

      for (let i = 0; i < samples.length; i++) {
        const sample = samples[i];
        setStatusMsg(`正在恢复训练：${i + 1} / ${samples.length}`);
        setProgress({ current: i + 1, total: samples.length });

        try {
          let img: HTMLImageElement;
          if (sample.imageBlob) {
            img = await blobToImageElement(sample.imageBlob);
          } else if (sample.imageUrl) {
            img = await urlToImageElement(sample.imageUrl);
          } else {
            continue;
          }
          await classifier.addExample(img, sample.label as LeafCategoryKey);
        } catch (err) {
          console.error('Failed to restore sample:', err);
        }
      }

      // Also try to load preset samples
      const categories = Object.keys(LEAF_CATEGORIES) as LeafCategoryKey[];
      for (const label of categories) {
        for (let i = 1; i <= 4; i++) {
          try {
            let url = `/samples/${label}_${i}.jpg`;
            let resp = await fetch(url);
            if (!resp.ok) {
              url = `/samples/${label}_${i}.svg`;
              resp = await fetch(url);
            }
            if (!resp.ok) continue;
            const blob = await resp.blob();
            const img = await blobToImageElement(blob);
            await classifier.addExample(img, label);
          } catch {
            // Skip
          }
        }
      }

      const counts = await getSessionSampleCounts(sessionId);
      onRestored(counts);
    } catch (err) {
      console.error('Restore error:', err);
      setStatusMsg('恢复失败，请重试');
    } finally {
      setRestoring(false);
    }
  }, [sessionId, onRestored]);

  const handleClear = useCallback(async () => {
    setShowClearConfirm(false);
    await clearAllData();
    classifier.clearAll();
    onClearAndStart();
  }, [onClearAndStart]);

  return (
    <PageShell>
      <div className="restore-page">
        <MascotBot mood="happy" size={120} message="欢迎回来！" />

        <h2 className="restore-title">发现上一场训练数据 📂</h2>

        <div className="restore-info-card">
          <p className="restore-session-id">活动编号：{sessionId.replace('session_', '')}</p>
          <p className="restore-session-hint">检测到之前保存的叶子样本，可以继续训练。</p>
        </div>

        {!restoring ? (
          <div className="restore-actions">
            <AppButton variant="primary" size="large" fullWidth onClick={handleRestore} icon="🔄">
              恢复训练
            </AppButton>
            <AppButton variant="danger" size="medium" fullWidth onClick={() => setShowClearConfirm(true)} icon="🗑️">
              清除重新开始
            </AppButton>
          </div>
        ) : (
          <div className="restore-progress-card">
            <p className="restore-status">{statusMsg}</p>
            <div className="restore-progress-bar-bg">
              <div
                className="restore-progress-bar"
                style={{ width: `${progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0}%` }}
              />
            </div>
            <p className="restore-progress-text">
              {progress.current} / {progress.total}
            </p>
          </div>
        )}

        <ConfirmDialog
          open={showClearConfirm}
          title="确定要清除数据吗？"
          message="清除后所有拍摄的叶子照片和训练记录将不可恢复。"
          confirmLabel="清除全部数据"
          onConfirm={handleClear}
          onCancel={() => setShowClearConfirm(false)}
        />
      </div>
    </PageShell>
  );
}
