import { useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Visualizer from './Visualizer.jsx';
import heroBg from '../assets/images/hero-bg.jpg';

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function FullscreenPlayer({ yt, currentSong, onClose, onNext, onPrevious }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const progress = yt.duration > 0 ? (yt.currentTime / yt.duration) * 100 : 0;

  return (
    <div
      className="fullscreen-player"
      role="dialog"
      aria-modal="true"
      aria-label="फुल स्क्रीन प्लेयर"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay" aria-hidden="true" />
      <button className="icon-btn fullscreen-close" onClick={onClose} aria-label="बंद करा">
        <X size={22} />
      </button>

      <div className="fullscreen-inner">
        <div className="fullscreen-meta">
          <p className="eng player-category">{currentSong?.subtitle || 'Live Playlist'}</p>
          <h2 className="fluid-h2">{currentSong?.title || 'जय महाराष्ट्र चौक'}</h2>
        </div>

        <Visualizer isPlaying={yt.isPlaying} bars={40} />

        <div className="player-progress" style={{ width: 'min(560px, 90vw)' }}>
          <span className="time eng">{formatTime(yt.currentTime)}</span>
          <input
            type="range" min="0" max="100" value={progress}
            onChange={(e) => yt.duration && yt.seekTo((Number(e.target.value) / 100) * yt.duration)}
            className="seek-bar" aria-label="गाण्याची प्रगती"
          />
          <span className="time eng">{formatTime(yt.duration)}</span>
        </div>

        <div className="player-controls">
          <button className="icon-btn" onClick={onPrevious} aria-label="मागील गाणे"><SkipBack size={24} /></button>
          <button className="play-btn large" onClick={yt.toggle} aria-label={yt.isPlaying ? 'थांबवा' : 'सुरू करा'}>
            {yt.isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" style={{ marginLeft: 3 }} />}
          </button>
          <button className="icon-btn" onClick={onNext} aria-label="पुढील गाणे"><SkipForward size={24} /></button>
        </div>
      </div>
    </div>
  );
}
