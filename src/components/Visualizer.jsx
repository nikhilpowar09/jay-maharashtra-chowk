// YouTube's IFrame API does not expose raw audio-frequency data, so this is a
// visual playback animation synchronized to play/pause state — not a real
// audio analyzer. Bars use randomized-but-seeded heights animated via CSS.
export default function Visualizer({ isPlaying, bars = 28 }) {
  return (
    <div className={`visualizer ${isPlaying ? 'playing' : ''}`} aria-hidden="true">
      {[...Array(bars)].map((_, i) => (
        <span
          key={i}
          className="vis-bar"
          style={{
            '--i': i,
            animationDelay: `${(i % 7) * 0.09}s`,
            animationDuration: `${0.6 + (i % 5) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
