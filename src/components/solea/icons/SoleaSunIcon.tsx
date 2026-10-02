export function SoleaSunIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-label="Símbolo Solar Solea">
      <circle cx="50" cy="50" r="22" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const isLong = i % 2 === 0;
        const length = isLong ? 15 : 9;
        return (
          <line
            key={i}
            x1="50"
            y1={50 - 25}
            x2="50"
            y2={50 - 25 - length}
            stroke="currentColor"
            strokeWidth={isLong ? "2.5" : "1.8"}
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </svg>
  );
}
