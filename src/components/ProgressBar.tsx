import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ current, target, label, color = '#4CAF50' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  const done = current >= target;

  return (
    <div className="progress-bar-wrapper">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${pct}%`,
            backgroundColor: done ? '#66BB6A' : color,
          }}
        />
      </div>
      <div className="progress-numbers">
        <span>{current} / {target}</span>
        {done && <span className="progress-check">✅</span>}
      </div>
    </div>
  );
}
