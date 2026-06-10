import { useState } from 'react';
import { LogoIcon } from '../../assets/illustrations/LogoIcon';

const NAV_ITEMS = [
  { label: '首页', key: 'home' },
  { label: '如何玩', key: 'how-to-play' },
  { label: '叶子图鉴', key: 'leaf-guide' },
  { label: '家长指南', key: 'parent-guide' },
  { label: '关于我们', key: 'about' },
];

interface HeaderProps {
  onStartTraining: () => void;
}

export function Header({ onStartTraining }: HeaderProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-leaf-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <LogoIcon size={42} />
            <div className="hidden sm:block">
              <div className="font-title text-xl font-bold text-leaf-800 leading-tight">AI叶子训练师</div>
              <div className="text-xs text-gray-500 leading-tight">教AI认识农场里的叶子</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`relative px-5 py-2.5 text-base font-medium rounded-lg transition-colors
                  ${activeNav === item.key
                    ? 'text-leaf-700 bg-leaf-50'
                    : 'text-gray-500 hover:text-leaf-600 hover:bg-leaf-50/50'
                  }`}
              >
                {item.label}
                {activeNav === item.key && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-leaf-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onStartTraining}
              className="font-title bg-leaf-500 hover:bg-leaf-600 text-white text-base font-bold px-6 py-3 rounded-xl shadow-md shadow-leaf-200 hover:shadow-lg hover:shadow-leaf-300 transition-all active:scale-95"
            >
              开始教AI
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-leaf-50 text-leaf-600"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-leaf-100 pt-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveNav(item.key); setMobileOpen(false); }}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors
                  ${activeNav === item.key ? 'text-leaf-700 bg-leaf-50' : 'text-gray-500 hover:bg-leaf-50/50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
