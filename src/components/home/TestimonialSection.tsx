export function TestimonialSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-leaf-50 to-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-leaf-100/30 p-8 sm:p-10 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sun-300/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-leaf-100/30 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto mb-5">
              <path d="M8 24C8 18 12 14 18 12L19 14C14 16 12 19 12 22H18V30H8V24Z" fill="#C8E6C9" />
              <path d="M24 24C24 18 28 14 34 12L35 14C30 16 28 19 28 22H34V30H24V24Z" fill="#C8E6C9" />
            </svg>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              孩子特别喜欢这个"教AI"的过程，每次去农场都会主动找不同的叶子。
              现在他不仅认识了很多植物，观察力和耐心也提高了。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
