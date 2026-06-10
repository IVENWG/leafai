const ABILITIES = [
  {
    title: '认真学习',
    desc: '仔细观察每一张你教给它的叶子图片',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L14.5 8.5L20 9.5L16 13.5L17 19L12 16.5L7 19L8 13.5L4 9.5L9.5 8.5L12 3Z" fill="#FFD54F" stroke="#FFC107" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: '耐心倾听',
    desc: '认真听你说叶子的特征和分类',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C12 21 4 16 4 10C4 6.5 7.5 4 12 4C16.5 4 20 6.5 20 10C20 16 12 21 12 21Z" fill="#81C784" stroke="#4CAF50" strokeWidth="1" />
        <path d="M9 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 13H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: '不断进步',
    desc: '样本越多，AI就越聪明',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 20L8 12L12 16L16 8L20 14" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 8H20V12" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function MascotIntro() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mascot */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/images/mascot.png"
                alt="小叶AI"
                className="w-full max-w-[280px] h-auto drop-shadow-lg"
              />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-sun-300/20 rounded-full blur-xl" />
              <div className="absolute bottom-10 -right-6 w-16 h-16 bg-leaf-200/30 rounded-full blur-xl" />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="text-center lg:text-left space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-leaf-600 text-sm font-semibold mb-3">
                <span className="w-5 h-0.5 bg-leaf-300 rounded-full" />
                认识小叶AI
                <span className="w-5 h-0.5 bg-leaf-300 rounded-full" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 leading-snug">
                你的小伙伴
                <br />
                <span className="text-leaf-600">学习小助手</span>
              </h2>
            </div>

            <p className="text-base text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              小叶AI喜欢每一片叶子。它会认真学习你教给它的内容，变得越来越聪明，
              还能和你一起探索更多有趣的叶子知识。
            </p>

            {/* Abilities */}
            <div className="grid sm:grid-cols-3 gap-4">
              {ABILITIES.map((a, i) => (
                <div
                  key={i}
                  className="bg-leaf-50 rounded-xl p-4 text-center lg:text-left hover:bg-leaf-100/60 transition-colors"
                >
                  <div className="flex justify-center lg:justify-start mb-2">{a.icon}</div>
                  <div className="text-sm font-bold text-gray-700 mb-1">{a.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
