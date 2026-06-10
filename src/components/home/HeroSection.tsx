interface HeroSectionProps {
  onStartTraining: () => void;
  onRestoreTraining: () => void;
}

export function HeroSection({ onStartTraining, onRestoreTraining }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-white to-leaf-50">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-sun-300/20 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-20 w-60 h-60 bg-leaf-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-sky-100/40 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-leaf-50 border border-leaf-200 text-leaf-700 px-5 py-2 rounded-full text-base font-medium">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M8 14C8 14 3 10 3 6.5C3 4 5 3 8 3C11 3 13 4 13 6.5C13 10 8 14 8 14Z" fill="#4CAF50" />
                <path d="M8 5V10" stroke="white" strokeWidth="1" strokeLinecap="round" />
              </svg>
              和小叶AI一起探索大自然
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-leaf-900 leading-tight tracking-tight whitespace-nowrap">
              <span className="relative inline-block">
                AI叶子训练师
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 280 12" fill="none">
                  <path d="M2 8 Q70 2 140 6 Q210 10 278 4" stroke="#FFE082" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-amber-800 font-semibold">
              教AI认识农场里的叶子
            </p>

            {/* Description */}
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              在农场里寻找不同的叶子，观察它们的形状、颜色和纹理，
              把你的发现教给小叶AI，让它变得更聪明吧！
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={onStartTraining}
                className="group inline-flex items-center justify-center gap-2.5 bg-leaf-500 hover:bg-leaf-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-leaf-200 hover:shadow-xl hover:shadow-leaf-300 transition-all active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 8V17H8V12H12V17H17V8L10 2Z" fill="white" opacity="0.9" />
                </svg>
                开始教AI
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={onRestoreTraining}
                className="inline-flex items-center justify-center gap-2.5 bg-white border-2 border-leaf-200 hover:border-leaf-300 text-leaf-700 font-semibold text-lg px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9C3 5.7 5.7 3 9 3C12.3 3 15 5.7 15 9C15 12.3 12.3 15 9 15C7 15 5.2 14 4 12.5" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 5V9H7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                恢复训练
              </button>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none">
              <img
                src="/images/hero.jpg"
                alt="和小叶AI一起在农场探索叶子"
                className="w-full h-auto rounded-3xl drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
