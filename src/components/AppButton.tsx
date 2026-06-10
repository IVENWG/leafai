import './AppButton.css';

interface AppButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: string;
  className?: string;
}

export function AppButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
}: AppButtonProps) {
  return (
    <button
      className={`app-btn app-btn-${variant} app-btn-${size} ${fullWidth ? 'app-btn-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="app-btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
