export function TrainingPreview() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left: Card preview */}
          <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="bg-white rounded-3xl border-2 border-leaf-200 shadow-xl shadow-leaf-100/50 p-6 space-y-5">
                {/* Card header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-leaf-100 rounded-xl flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M11 18C11 18 5 14 5 9.5C5 7 7.5 5 11 5C14.5 5 17 7 17 9.5C17 14 11 18 11 18Z" fill="#4CAF50" />
                      <path d="M11 8V14" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M11 10 L14 9" stroke="white" strokeWidth="1" strokeLinecap="round" />
                      <path d="M11 12 L8 11" stroke="white" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">我的训练成果</div>
                    <div className="text-xs text-gray-400">今天的学习记录</div>
                  </div>
                </div>

                {/* Leaf preview */}
                <div className="flex items-center gap-4 bg-leaf-50 rounded-2xl p-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-leaf-100 shrink-0">
                    <img src="/images/leaf-sample.jpg" alt="锯齿叶" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 text-sm">锯齿叶</div>
                    <div className="text-xs text-gray-400 mb-2">小叶AI的识别准确率</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-leaf-100 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-gradient-to-r from-leaf-400 to-leaf-500 rounded-full" />
                      </div>
                      <span className="text-sm font-black text-leaf-600">92%</span>
                    </div>
                  </div>
                </div>

                {/* Stars + stamp */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 20 20">
                        <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="#FFD54F" stroke="#FFC107" strokeWidth="0.5" />
                      </svg>
                    ))}
                  </div>
                  {/* Stamp */}
                  <div className="w-14 h-14 rounded-full border-3 border-orange-400 flex items-center justify-center bg-orange-50/50 rotate-[-8deg]">
                    <span className="text-orange-500 font-black text-xs">太棒了</span>
                  </div>
                </div>

                {/* Bottom stat */}
                <div className="text-center pt-3 border-t border-leaf-100">
                  <p className="text-sm text-gray-400">
                    你已教会小叶AI <span className="font-bold text-leaf-600">23</span> 张叶子
                  </p>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-sun-300/40 rounded-full blur-sm" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-leaf-200/50 rounded-full blur-sm" />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-5 order-1 lg:order-2">
            <span className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-semibold">
              <span className="w-5 h-0.5 bg-orange-300 rounded-full" />
              学习成果
              <span className="w-5 h-0.5 bg-orange-300 rounded-full" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-800 leading-snug">
              看看你的
              <br />
              <span className="text-leaf-600">训练成绩单</span>
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              每次训练完成后，小叶AI都会记录你的学习进度。你可以看到AI学会了哪些叶子，识别准确率有多高。
            </p>
            <button className="inline-flex items-center gap-2 text-leaf-600 font-semibold hover:text-leaf-700 transition-colors group">
              查看我的图鉴
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8H13M13 8L10 5M13 8L10 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
