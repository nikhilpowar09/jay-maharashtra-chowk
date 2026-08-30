const PETAL_EMOJI = ['🌼', '🪷', '🌺'];

export default function FestivalMode() {
  return (
    <div className="festival-overlay" aria-hidden="true">
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 7.1) % 100}%`,
            '--size': `${14 + (i % 4) * 4}px`,
            '--dur': `${10 + (i % 6)}s`,
            '--delay': `${i * 0.7}s`,
          }}
        >
          {PETAL_EMOJI[i % PETAL_EMOJI.length]}
        </span>
      ))}
      <div className="glow-blob" style={{ width: 420, height: 420, bottom: '-10%', left: '10%' }} />
    </div>
  );
}
