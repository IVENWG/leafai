export function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#FFFDE7" />
        </linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Background sky */}
      <rect width="560" height="440" rx="24" fill="url(#sky)" />

      {/* Sun */}
      <circle cx="480" cy="70" r="40" fill="#FFE082" opacity="0.7" />
      <circle cx="480" cy="70" r="28" fill="#FFD54F" opacity="0.9" />

      {/* Clouds */}
      <g opacity="0.6">
        <ellipse cx="100" cy="60" rx="40" ry="20" fill="white" />
        <ellipse cx="130" cy="55" rx="30" ry="18" fill="white" />
        <ellipse cx="70" cy="55" rx="25" ry="15" fill="white" />
      </g>
      <g opacity="0.4">
        <ellipse cx="350" cy="40" rx="35" ry="16" fill="white" />
        <ellipse cx="380" cy="36" rx="25" ry="14" fill="white" />
      </g>

      {/* Distant hills */}
      <ellipse cx="140" cy="320" rx="180" ry="60" fill="#A5D6A7" opacity="0.4" />
      <ellipse cx="420" cy="330" rx="200" ry="70" fill="#C8E6C9" opacity="0.3" />

      {/* Ground */}
      <path d="M0 340 Q140 310 280 330 Q420 350 560 320 V440 H0Z" fill="url(#grass)" />
      <path d="M0 360 Q100 345 200 355 Q350 370 560 345 V440 H0Z" fill="#66BB6A" opacity="0.6" />

      {/* Fence */}
      <g stroke="#D7CCC8" strokeWidth="3" fill="#EFEBE9">
        {[80, 140, 200].map((x, i) => (
          <g key={i}>
            <rect x={x} y={290} width="6" height="50" rx="2" fill="#D7CCC8" />
            <polygon points={`${x + 3},285 ${x - 2},292 ${x + 8},292`} fill="#D7CCC8" />
          </g>
        ))}
        <line x1="70" y1="305" x2="210" y2="305" stroke="#BCAAA4" strokeWidth="4" strokeLinecap="round" />
        <line x1="70" y1="320" x2="210" y2="320" stroke="#BCAAA4" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Tree */}
      <rect x="440" y="240" width="16" height="80" rx="4" fill="#8D6E63" />
      <circle cx="448" cy="220" r="45" fill="#66BB6A" opacity="0.8" />
      <circle cx="430" cy="230" r="30" fill="#81C784" opacity="0.7" />
      <circle cx="465" cy="225" r="28" fill="#4CAF50" opacity="0.6" />

      {/* Flowers */}
      {[320, 360, 400, 470, 510].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${340 + (i % 3) * 8})`}>
          <line x1="0" y1="0" x2="0" y2="15" stroke="#81C784" strokeWidth="2" />
          <circle cx="0" cy="-2" r="5" fill={['#FFB74D', '#FF8A80', '#FFE082', '#B39DDB', '#FFB74D'][i]} opacity="0.8" />
        </g>
      ))}

      {/* Child character */}
      <g transform="translate(200, 260)">
        {/* Body */}
        <rect x="-18" y="30" width="36" height="45" rx="12" fill="#FFE0B2" />
        {/* Overalls */}
        <rect x="-18" y="42" width="36" height="33" rx="10" fill="#90CAF9" />
        <line x1="-8" y1="42" x2="-8" y2="55" stroke="#64B5F6" strokeWidth="2" />
        <line x1="8" y1="42" x2="8" y2="55" stroke="#64B5F6" strokeWidth="2" />
        {/* Head */}
        <circle cx="0" cy="18" r="18" fill="#FFE0B2" />
        {/* Hat */}
        <ellipse cx="0" cy="6" rx="24" ry="6" fill="#FFB74D" />
        <rect x="-16" y="-2" width="32" height="10" rx="4" fill="#FFB74D" />
        <rect x="-10" y="-8" width="20" height="12" rx="5" fill="#FFB74D" />
        {/* Face */}
        <circle cx="-6" cy="17" r="2" fill="#5D4037" />
        <circle cx="6" cy="17" r="2" fill="#5D4037" />
        <path d="M-4 23 Q0 27 4 23" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="-10" cy="22" rx="3" ry="2" fill="#FFAB91" opacity="0.5" />
        <ellipse cx="10" cy="22" rx="3" ry="2" fill="#FFAB91" opacity="0.5" />
        {/* Arm holding magnifying glass */}
        <line x1="18" y1="48" x2="35" y2="38" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" />
        {/* Magnifying glass */}
        <circle cx="40" cy="32" r="10" fill="#E3F2FD" stroke="#90A4AE" strokeWidth="3" />
        <line x1="48" y1="40" x2="55" y2="48" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />
        {/* Leaf in magnifying glass */}
        <path d="M38 30 Q40 26 42 30 Q40 34 38 30Z" fill="#66BB6A" />
        {/* Left arm */}
        <line x1="-18" y1="48" x2="-30" y2="55" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" />
        {/* Legs */}
        <line x1="-8" y1="75" x2="-10" y2="92" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" />
        <line x1="8" y1="75" x2="10" y2="92" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="-12" cy="94" rx="8" ry="4" fill="#8D6E63" />
        <ellipse cx="12" cy="94" rx="8" ry="4" fill="#8D6E63" />
        {/* Basket of leaves */}
        <g transform="translate(-35, 60)">
          <path d="M-10 0 L-8 16 L8 16 L10 0Z" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1.5" />
          <path d="M-10 0 Q0 -6 10 0" fill="none" stroke="#BCAAA4" strokeWidth="1.5" />
          {/* Leaves in basket */}
          <path d="M-4 0 Q-2 -8 0 -4 Q2 -8 4 0" fill="#66BB6A" />
          <path d="M-6 -1 Q-4 -10 -2 -5" fill="#81C784" />
          <path d="M2 -1 Q4 -10 6 -5" fill="#4CAF50" />
        </g>
      </g>

      {/* Robot mascot (小叶AI) */}
      <g transform="translate(100, 290)">
        {/* Shadow */}
        <ellipse cx="0" cy="55" rx="22" ry="5" fill="#388E3C" opacity="0.2" />
        {/* Antenna */}
        <line x1="0" y1="-30" x2="0" y2="-40" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="-42" r="4" fill="#FFE082" />
        {/* Head */}
        <rect x="-22" y="-28" width="44" height="36" rx="14" fill="#E8F5E9" stroke="#81C784" strokeWidth="2.5" />
        {/* Face plate */}
        <rect x="-16" y="-18" width="32" height="20" rx="8" fill="white" stroke="#A5D6A7" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="-6" cy="-10" r="3.5" fill="#333" />
        <circle cx="6" cy="-10" r="3.5" fill="#333" />
        <circle cx="-5" cy="-11.5" r="1" fill="white" />
        <circle cx="7" cy="-11.5" r="1" fill="white" />
        {/* Mouth */}
        <path d="M-5 -2 Q0 4 5 -2" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <ellipse cx="-12" cy="-4" rx="3" ry="2" fill="#FFCDD2" opacity="0.5" />
        <ellipse cx="12" cy="-4" rx="3" ry="2" fill="#FFCDD2" opacity="0.5" />
        {/* Body */}
        <rect x="-16" y="10" width="32" height="24" rx="8" fill="#C8E6C9" stroke="#81C784" strokeWidth="2" />
        {/* Leaf badge */}
        <path d="M-3 18 Q0 14 3 18 Q0 22 -3 18Z" fill="#4CAF50" />
        {/* Arms */}
        <line x1="-16" y1="18" x2="-26" y2="28" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
        <line x1="16" y1="18" x2="26" y2="12" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
        {/* Hand holding leaf card */}
        <g transform="translate(30, 6)">
          <rect x="-8" y="-10" width="16" height="20" rx="3" fill="white" stroke="#81C784" strokeWidth="1.5" />
          <path d="M-3 -4 Q0 -8 3 -4 Q0 0 -3 -4Z" fill="#66BB6A" />
        </g>
        {/* Legs */}
        <line x1="-6" y1="34" x2="-8" y2="48" stroke="#81C784" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="6" y1="34" x2="8" y2="48" stroke="#81C784" strokeWidth="3.5" strokeLinecap="round" />
        {/* Feet */}
        <ellipse cx="-10" cy="50" rx="6" ry="3" fill="#A5D6A7" />
        <ellipse cx="10" cy="50" rx="6" ry="3" fill="#A5D6A7" />
      </g>

      {/* Floating leaves */}
      {[
        { x: 300, y: 180, r: 15, d: 0 },
        { x: 380, y: 140, r: 12, d: 45 },
        { x: 250, y: 130, r: 10, d: -30 },
        { x: 340, y: 220, r: 8, d: 60 },
        { x: 420, y: 170, r: 11, d: -20 },
      ].map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.d})`} opacity="0.7">
          <path d={`M0 ${-leaf.r} Q${leaf.r * 0.6} ${-leaf.r * 0.3} 0 ${leaf.r} Q${-leaf.r * 0.6} ${-leaf.r * 0.3} 0 ${-leaf.r}Z`} fill={['#81C784', '#66BB6A', '#4CAF50', '#A5D6A7', '#81C784'][i]} />
          <line x1="0" y1={`${-leaf.r + 3}`} x2="0" y2={`${leaf.r - 2}`} stroke="white" strokeWidth="0.8" opacity="0.5" />
        </g>
      ))}

      {/* Product UI card overlay */}
      <g transform="translate(340, 240)">
        <rect x="0" y="0" width="180" height="140" rx="14" fill="white" opacity="0.95" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.1))" />
        {/* Camera frame */}
        <rect x="12" y="12" width="60" height="60" rx="8" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        <path d="M30 28 Q42 22 42 36 Q42 48 30 48 Q22 48 22 36 Q22 28 30 28Z" fill="#81C784" />
        <line x1="30" y1="30" x2="30" y2="44" stroke="white" strokeWidth="1" opacity="0.5" />
        {/* AI result text */}
        <text x="82" y="30" fontSize="9" fill="#999" fontFamily="sans-serif">AI guess:</text>
        <text x="82" y="44" fontSize="13" fill="#2E7D32" fontWeight="bold" fontFamily="sans-serif">锯齿叶</text>
        <text x="82" y="58" fontSize="9" fill="#999" fontFamily="sans-serif">Confidence</text>
        <text x="82" y="72" fontSize="16" fill="#FF9800" fontWeight="bold" fontFamily="sans-serif">92%</text>
        {/* Progress dots */}
        <g transform="translate(12, 85)">
          <rect width="156" height="40" rx="8" fill="#F1F8E9" />
          {[
            { x: 12, label: '长条叶', n: '8' },
            { x: 52, label: '圆圆叶', n: '6' },
            { x: 92, label: '锯齿叶', n: '10' },
            { x: 132, label: '大菜叶', n: '7' },
          ].map((d, i) => (
            <g key={i} transform={`translate(${d.x}, 8)`}>
              <circle cx="0" cy="5" r="4" fill={['#4CAF50', '#66BB6A', '#FF9800', '#43A047'][i]} opacity="0.7" />
              <text x="8" y="9" fontSize="7" fill="#666" fontFamily="sans-serif">{d.n}</text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
