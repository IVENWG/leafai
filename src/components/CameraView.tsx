import { useRef, useEffect } from 'react';
import './CameraView.css';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isReady: boolean;
  error: string | null;
  showGuide?: boolean;
  /** Whether the user has requested camera start — controls placeholder visibility */
  started?: boolean;
}

export function CameraView({ videoRef, isReady, error, showGuide = true, started = true }: CameraViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-fit video
  }, [isReady]);

  return (
    <div className="camera-container" ref={containerRef}>
      {/* Only show placeholder after user requested camera (not on initial mount) */}
      {!isReady && !error && started && (
        <div className="camera-placeholder">
          <div className="camera-loading-icon">📷</div>
          <p>正在打开摄像头…</p>
          <p className="camera-hint">请允许浏览器访问摄像头</p>
        </div>
      )}
      {error && (
        <div className="camera-error">
          <div className="camera-error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      )}
      <video
        ref={videoRef}
        className={`camera-video ${isReady ? 'camera-video-active' : ''}`}
        autoPlay
        playsInline
        muted
      />
      {isReady && showGuide && (
        <div className="camera-guide-overlay">
          <div className="camera-guide-frame" />
          <div className="camera-guide-text">请把一片叶子放在框内</div>
        </div>
      )}
    </div>
  );
}
