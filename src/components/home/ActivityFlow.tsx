import { Search, BookOpen, Bot, Trophy } from 'lucide-react';

const STEPS = [
  {
    title: '寻找叶子',
    desc: '在农场里收集有趣的叶子',
    color: '#4CAF50',
    bg: 'bg-leaf-100',
    icon: <Search size={36} strokeWidth={2.2} className="text-leaf-600" />,
  },
  {
    title: '观察记录',
    desc: '观察并记录叶子的特征',
    color: '#FF9800',
    bg: 'bg-sun-300/40',
    icon: <BookOpen size={36} strokeWidth={2.2} className="text-orange-500" />,
  },
  {
    title: '教AI学习',
    desc: '把叶子特征教给小叶AI',
    color: '#5C6BC0',
    bg: 'bg-indigo-100',
    icon: <Bot size={36} strokeWidth={2.2} className="text-indigo-500" />,
  },
  {
    title: '挑战识别',
    desc: '检验小叶AI的学习成果',
    color: '#43A047',
    bg: 'bg-leaf-200/60',
    icon: <Trophy size={36} strokeWidth={2.2} className="text-leaf-600" />,
  },
];

export function ActivityFlow() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-leaf-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-leaf-600 text-sm font-semibold mb-3">
            <span className="w-5 h-0.5 bg-leaf-300 rounded-full" />
            活动流程
            <span className="w-5 h-0.5 bg-leaf-300 rounded-full" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">一起来当叶子训练师</h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-leaf-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Icon circle */}
                <div className={`relative w-28 h-28 ${step.bg} rounded-full flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow`}>
                  {step.icon}
                </div>

                <h3 className="text-base font-bold text-gray-800 mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
