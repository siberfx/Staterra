export default function NetworkVisualization() {
  return (
    <svg
      className="absolute right-0 top-0 w-[55%] h-full hidden lg:block"
      viewBox="0 0 600 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <style>{`
        @keyframes heroFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(12px,-18px); } }
        @keyframes heroFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-16px,14px); } }
        @keyframes heroFloat3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,20px); } }
        @keyframes heroPulse { 0%,100% { opacity: 0.15; } 50% { opacity: 0.35; } }
        .hero-float-1 { animation: heroFloat1 8s ease-in-out infinite; }
        .hero-float-2 { animation: heroFloat2 10s ease-in-out infinite; }
        .hero-float-3 { animation: heroFloat3 7s ease-in-out infinite; }
        .hero-line { stroke-dasharray: 6, 4; animation: heroPulse 4s ease-in-out infinite; }
      `}</style>

      {/* Verbindingslijnen */}
      <line x1="200" y1="180" x2="380" y2="280" className="hero-line" stroke="#163E74" strokeWidth="1" />
      <line x1="380" y1="280" x2="300" y2="460" className="hero-line" stroke="#2E7BBF" strokeWidth="1" style={{ animationDelay: '1s' }} />
      <line x1="200" y1="180" x2="300" y2="460" className="hero-line" stroke="#163E74" strokeWidth="0.8" style={{ animationDelay: '2s' }} />
      <line x1="200" y1="180" x2="120" y2="350" className="hero-line" stroke="#2E7BBF" strokeWidth="0.6" style={{ animationDelay: '0.5s' }} />
      <line x1="380" y1="280" x2="480" y2="180" className="hero-line" stroke="#163E74" strokeWidth="0.6" style={{ animationDelay: '1.5s' }} />
      <line x1="300" y1="460" x2="420" y2="520" className="hero-line" stroke="#2E7BBF" strokeWidth="0.6" style={{ animationDelay: '3s' }} />

      {/* Node 1: Woo-compliance */}
      <g className="hero-float-1">
        <circle cx="200" cy="180" r="44" fill="#163E74" opacity="0.9" />
        <circle cx="200" cy="180" r="44" stroke="#2E7BBF" strokeWidth="1" fill="none" opacity="0.3" />
        <rect x="186" y="164" width="28" height="32" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
        <polyline points="192,180 198,186 210,174" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Node 2: Open source */}
      <g className="hero-float-2">
        <circle cx="380" cy="280" r="44" fill="#163E74" opacity="0.9" />
        <circle cx="380" cy="280" r="44" stroke="#2E7BBF" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="380" cy="266" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="368" cy="290" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="392" cy="290" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="380" y1="270" x2="380" y2="280" stroke="white" strokeWidth="1.5" />
        <path d="M380,280 Q380,286 368,286" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M380,280 Q380,286 392,286" stroke="white" strokeWidth="1.5" fill="none" />
      </g>

      {/* Node 3: Maatwerk */}
      <g className="hero-float-3">
        <circle cx="300" cy="460" r="44" fill="#163E74" opacity="0.9" />
        <circle cx="300" cy="460" r="44" stroke="#2E7BBF" strokeWidth="1" fill="none" opacity="0.3" />
        <polyline points="284,450 274,460 284,470" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="316,450 326,460 316,470" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="306" y1="446" x2="294" y2="474" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Kleine decoratieve nodes */}
      <g className="hero-float-2" style={{ animationDelay: '2s' }}>
        <circle cx="120" cy="350" r="14" fill="#2E7BBF" opacity="0.25" />
      </g>
      <g className="hero-float-1" style={{ animationDelay: '3s' }}>
        <circle cx="480" cy="180" r="12" fill="#2E7BBF" opacity="0.2" />
      </g>
      <g className="hero-float-3" style={{ animationDelay: '1s' }}>
        <circle cx="420" cy="520" r="10" fill="#163E74" opacity="0.15" />
      </g>

      {/* Labels onder de nodes */}
      <text x="200" y="240" textAnchor="middle" fill="#163E74" fontSize="11" fontWeight="600" opacity="0.5">WOO-COMPLIANCE</text>
      <text x="380" y="340" textAnchor="middle" fill="#163E74" fontSize="11" fontWeight="600" opacity="0.5">OPEN SOURCE</text>
      <text x="300" y="520" textAnchor="middle" fill="#163E74" fontSize="11" fontWeight="600" opacity="0.5">MAATWERK</text>
    </svg>
  );
}
