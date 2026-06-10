const FEATURES = [
  {
    title: '观察叶子',
    desc: '走进农场，发现各种叶子，仔细观察它们的特征。',
    bg: 'bg-leaf-50',
    border: 'border-leaf-200',
    titleColor: 'text-leaf-700',
    image: '/images/feature-observe.jpg',
  },
  {
    title: '训练AI',
    desc: '把叶子样本交给小叶AI，帮助它记住更多特征。',
    bg: 'bg-cream-100',
    border: 'border-sun-300',
    titleColor: 'text-orange-600',
    image: '/images/feature-train.jpg',
  },
  {
    title: '挑战识别',
    desc: '看看小叶AI能不能认出你教过的叶子。',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    titleColor: 'text-sky-700',
    image: '/images/feature-challenge.jpg',
  },
];

export function FeatureCards() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`group relative ${f.bg} rounded-2xl border ${f.border} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default`}
            >
              {/* Title on top */}
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <h3 className={`text-xl sm:text-2xl font-bold ${f.titleColor} mb-2`}>{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
              {/* Image below */}
              <div className="p-6 sm:p-8 pt-4 sm:pt-4">
                <div className="aspect-[3/2] rounded-xl overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
