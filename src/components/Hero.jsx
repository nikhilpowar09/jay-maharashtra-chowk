import { useEffect, useState } from 'react';
import heroBg from '../assets/images/hero-bg.jpg';
import MusicPlayer from './MusicPlayer.jsx';
import { DYNAMIC_MESSAGES } from '../data/config.js';

// Native pixel dimensions of the banner image — drives the aspect-ratio box
// so the image is always shown in full, never cropped or distorted.
const IMAGE_ASPECT = '1672 / 941';

export default function Hero({
  currentSong,
  usingExternalPlaylist,
  listenerCount,
  yt,
  favorites,
  onToggleFavorite,
  onNext,
  onPrevious,
  onVolumeChange,
  onOpenPlaylist,
  onOpenFullscreen,
}) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % DYNAMIC_MESSAGES.length);
        setVisible(true);
      }, 500);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" aria-label="स्वागत विभाग">
      <div className="hero-media" style={{ aspectRatio: IMAGE_ASPECT }}>
        <img src={heroBg} alt="जय महाराष्ट्र चौक — गणपती बाप्पा मोरया" className="hero-img" />
        <div className="hero-scrim-top" aria-hidden="true" />
        <div className="hero-scrim-bottom" aria-hidden="true" />

        <div className="hero-top-row">
          <span className="badge glass eng">
            <span className="live-dot" aria-hidden="true" />
            {listenerCount.toLocaleString('en-IN')} भक्त सुन रहे हैं
          </span>
          <p className={`hero-dynamic-msg ${visible ? 'in' : 'out'}`} aria-live="polite">
            {DYNAMIC_MESSAGES[msgIndex]}
          </p>
        </div>

        <div className="hero-player-dock">
          <MusicPlayer
            yt={yt}
            currentSong={currentSong}
            usingExternalPlaylist={usingExternalPlaylist}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onNext={onNext}
            onPrevious={onPrevious}
            onVolumeChange={onVolumeChange}
            onOpenPlaylist={onOpenPlaylist}
            onOpenFullscreen={onOpenFullscreen}
            playbackError={yt.playbackError}
          />
        </div>
      </div>
    </section>
  );
}
