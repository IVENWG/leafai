import './CameraView.css';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isReady: boolean;
  error: string | null;
  showGuide?: boolean;
  started?: boolean;
}

export function CameraView({ videoRef, isReady, error, showGuide = true, started = true }: CameraViewProps) {
  return (
    <div className="camera-container">
      {/* Video always rendered, fills container absolutely */}
      <video ref={videoRef} className="camera-video" playsInline muted />

      {/* Placeholder covers video while camera is starting */}
      {!isReady && !error && started && (
        <div className="camera-placeholder">
          <div className="camera-loading-icon">📷</div>
          <p>正在打开摄像头…</p>
          <p className="camera-hint">请允许浏览器访问摄像头</p>
        </div>
      )}

      {/* Error covers video on failure */}
      {error && (
        <div className="camera-error">
          <div className="camera-error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      )}

      {/* Guide overlay on top of live feed */}
      {isReady && showGuide && (
        <div className="camera-guide-overlay">
          <div className="camera-guide-frame" />
          <div className="camera-guide-text">请把一片叶子放在框内</div>
        </div>
      )}
    </div>
  );
}
