import './MascotBot.css';

interface MascotBotProps {
  mood?: 'happy' | 'thinking' | 'confused' | 'excited' | 'waving';
  size?: number;
  message?: string;
}

export function MascotBot({ mood = 'happy', size = 120, message }: MascotBotProps) {
  const animMap: Record<string, string> = {
    happy: 'mascot-bounce',
    thinking: 'mascot-wobble',
    confused: 'mascot-tilt',
    excited: 'mascot-jump',
    waving: 'mascot-wave',
  };

  return (
    <div className="mascot-container" style={{ width: size }}>
      <div className={`mascot-svg-wrapper ${animMap[mood] || 'mascot-bounce'}`}>
        <img
          src="/images/mascot.png"
          alt="小叶AI"
          width={size}
          height={size}
          className="mascot-img"
        />
      </div>
      {message && <div className="mascot-message">{message}</div>}
    </div>
  );
}
