export default function AbstractShapes() {
  return (
    <svg
      className="absolute right-0 top-0 w-[55%] h-full"
      viewBox="0 0 600 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <style>{`
        @keyframes shapeFloat1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shapeFloat2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shapeFloat3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .shape-float-1 { animation: shapeFloat1 12s ease-in-out infinite; }
        .shape-float-2 { animation: shapeFloat2 10s ease-in-out infinite 2s; }
        .shape-float-3 { animation: shapeFloat3 8s ease-in-out infinite 4s; }
      `}</style>

      {/* Shape 1: Largest, most subtle — background layer */}
      <rect
        className="shape-float-1"
        x="120" y="100" width="320" height="400" rx="40"
        fill="#163E74" opacity="0.04"
      />

      {/* Shape 2: Medium, shifted — mid layer */}
      <rect
        className="shape-float-2"
        x="200" y="160" width="280" height="340" rx="32"
        fill="#2E7BBF" opacity="0.06"
      />

      {/* Shape 3: Smallest, most visible — front layer */}
      <rect
        className="shape-float-3"
        x="260" y="220" width="220" height="260" rx="24"
        fill="#163E74" opacity="0.08"
      />

      {/* Thin accent line */}
      <line
        x1="180" y1="500" x2="420" y2="160"
        stroke="#2E7BBF" strokeWidth="0.5" opacity="0.12"
      />
    </svg>
  );
}
