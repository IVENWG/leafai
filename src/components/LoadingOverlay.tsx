interface LoadingOverlayProps {
  message: string;
  progress?: { current: number; total: number };
}

export function LoadingOverlay({ message, progress }: LoadingOverlayProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255,255,255,0.92)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      gap: 16,
      padding: 24,
    }}>
      <div style={{ fontSize: '3rem', animation: 'pulse 1.5s ease-in-out infinite' }}>🌿</div>
      <p style={{ fontSize: '1.1rem', color: '#2E7D32', fontWeight: 700, textAlign: 'center' }}>
        {message}
      </p>
      {progress && (
        <>
          <div style={{
            width: '200px',
            height: '8px',
            background: '#E8F5E9',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.round((progress.current / progress.total) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #81C784, #4CAF50)',
              borderRadius: '4px',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#777' }}>
            {progress.current} / {progress.total}
          </p>
        </>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
