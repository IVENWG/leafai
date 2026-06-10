import { Leaf } from 'lucide-react';

export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: 'linear-gradient(135deg, #66BB6A, #43A047)' }}
    >
      <Leaf size={size * 0.55} strokeWidth={2.5} className="text-white" />
    </div>
  );
}
