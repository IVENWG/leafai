const LEAF_TYPES = [
  {
    key: 'long_leaf',
    name: '长条叶',
    desc: '又长又窄，像小剑一样',
    color: '#4CAF50',
    lightColor: '#E8F5E9',
    image: '/images/leaf-long.jpg',
  },
  {
    key: 'round_leaf',
    name: '圆圆叶',
    desc: '圆圆的，像小扇子',
    color: '#66BB6A',
    lightColor: '#F1F8E9',
    image: '/images/leaf-round.jpg',
  },
  {
    key: 'tooth_leaf',
    name: '锯齿叶',
    desc: '边缘有小锯齿',
    color: '#2E7D32',
    lightColor: '#E8F5E9',
    image: '/images/leaf-tooth.jpg',
  },
  {
    key: 'big_leaf',
    name: '大菜叶',
    desc: '又大又宽，比较柔软',
    color: '#43A047',
    lightColor: '#E8F5E9',
    image: '/images/leaf-big.jpg',
  },
];

export function LeafGalleryPreview() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-cream-50 to-leaf-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-leaf-600 text-sm font-semibold mb-3">
            <span className="w-5 h-0.5 bg-leaf-300 rounded-full" />
            叶子图鉴
            <span className="w-5 h-0.5 bg-leaf-300 rounded-full" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-3">探索常见的叶子类型</h2>
          <p className="text-base text-gray-400 max-w-md mx-auto">
            农场里有各种各样的叶子，先认识一下我们要教给AI的四种叶子吧
          </p>
        </div>

        {/* Leaf cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LEAF_TYPES.map((leaf) => (
            <div
              key={leaf.key}
              className="group bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {/* Leaf photo */}
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={leaf.image}
                  alt={leaf.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tag */}
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: leaf.lightColor, color: leaf.color }}
              >
                {leaf.name}
              </span>

              <p className="text-sm text-gray-400 leading-relaxed">{leaf.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
