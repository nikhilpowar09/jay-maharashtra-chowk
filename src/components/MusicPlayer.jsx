import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX,
  ListMusic, Maximize2, Heart, AlertTriangle, Music2,
} from 'lucide-react';

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

const ERROR_MESSAGES = {
  2: 'गाणे उपलब्ध नाही, पुढील गाणे वाजवत आहोत.',
  5: 'हे गाणे या ब्राउझरवर वाजवता येत नाही.',
  100: 'व्हिडिओ सापडला नाही.',
  101: 'embedding बंद आहे — दुसरे गाणे निवडा.',
  150: 'embedding बंद आहे — दुसरे गाणे निवडा.',
};

export default function MusicPlayer({
  yt,
  currentSong,
  usingExternalPlaylist,
  favorites,
  onToggleFavorite,
  onNext,
  onPrevious,
  onVolumeChange,
  onOpenPlaylist,
  onOpenFullscreen,
  playbackError,
}) {
  const [volumeOpen, setVolumeOpen] = useState(false);

  const progress = yt.duration > 0 ? (yt.currentTime / yt.duration) * 100 : 0;
  const isFav = currentSong ? favorites.includes(currentSong.id) : false;
  const VolumeIcon = yt.muted || yt.volume === 0 ? VolumeX : yt.volume < 50 ? Volume1 : Volume2;

  const handleSeek = (e) => {
    if (!yt.duration) return;
    const pct = Number(e.target.value) / 100;
    yt.seekTo(pct * yt.duration);
  };

  return (
    <div className="mini-player glass" aria-label="संगीत प्लेयर">
      {playbackError != null && (
        <div className="mini-player-error" role="alert">
          <AlertTriangle size={13} />
          <span>{ERROR_MESSAGES[playbackError] || 'गाणे वाजवताना अडचण आली.'}</span>
        </div>
      )}

      <div className="mini-player-top">
        <span className="mini-thumb" aria-hidden="true">
          {yt.isPlaying ? (
            <span className="eq-badge static"><i /><i /><i /></span>
          ) : (
            <Music2 size={16} />
          )}
        </span>

        <div className="mini-meta">
          <p className="mini-title">{currentSong?.title || 'जय महाराष्ट्र चौक'}</p>
          <p className="mini-artist eng">
            {currentSong?.subtitle || 'Live Playlist'}{currentSong?.artist ? ` · ${currentSong.artist}` : ''}
          </p>
        </div>

        <button
          className={`icon-btn favorite-btn small ${isFav ? 'active' : ''}`}
          onClick={() => currentSong && onToggleFavorite(currentSong.id)}
          aria-pressed={isFav}
          aria-label={isFav ? 'आवडींमधून काढा' : 'आवडींमध्ये जोडा'}
          disabled={!currentSong}
        >
          <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mini-progress">
        <span className="time eng" aria-hidden="true">{formatTime(yt.currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="seek-bar mini"
          aria-label="गाण्याची प्रगती"
        />
        <span className="time eng" aria-hidden="true">{formatTime(yt.duration)}</span>
      </div>

      <div className="mini-controls">
        <div className="mini-controls-side">
          <div
            className={`mini-volume ${volumeOpen ? 'open' : ''}`}
            onMouseEnter={() => setVolumeOpen(true)}
            onMouseLeave={() => setVolumeOpen(false)}
          >
            <button
              className="icon-btn small"
              onClick={() => { yt.toggleMute(); setVolumeOpen((o) => !o); }}
              aria-label={yt.muted ? 'अनम्यूट करा' : 'म्यूट करा'}
            >
              <VolumeIcon size={15} />
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={yt.muted ? 0 : yt.volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="volume-bar mini"
              aria-label="आवाज पातळी"
            />
          </div>
        </div>

        <div className="mini-controls-center">
          <button className="icon-btn small" onClick={onPrevious} aria-label="मागील गाणे">
            <SkipBack size={17} />
          </button>
          <button className="play-btn mini" onClick={yt.toggle} aria-label={yt.isPlaying ? 'थांबवा' : 'सुरू करा'}>
            {yt.isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: 2 }} />}
          </button>
          <button className="icon-btn small" onClick={onNext} aria-label="पुढील गाणे">
            <SkipForward size={17} />
          </button>
        </div>

        <div className="mini-controls-side right">
          <button className="icon-btn small" onClick={onOpenPlaylist} aria-label="प्लेलिस्ट उघडा">
            <ListMusic size={15} />
          </button>
          <button className="icon-btn small" onClick={onOpenFullscreen} aria-label="फुल स्क्रीन">
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      {usingExternalPlaylist && (
        <p className="mini-note eng">Playing from your YouTube playlist</p>
      )}
    </div>
  );
}
