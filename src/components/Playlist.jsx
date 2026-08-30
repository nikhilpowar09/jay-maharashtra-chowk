import { X, Heart, Music2, History } from 'lucide-react';
import { SAMPLE_SONGS, CATEGORIES } from '../data/config.js';

function categoryName(id) {
  return CATEGORIES.find((c) => c.id === id)?.name || id;
}

export default function Playlist({
  open, onClose, songs, currentSongId, favorites, onToggleFavorite, onSelect,
  recentlyPlayed, usingExternalPlaylist,
}) {
  if (!open) return null;

  const recentSongs = recentlyPlayed
    .map((id) => SAMPLE_SONGS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="drawer glass"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="प्लेलिस्ट"
      >
        <div className="sheet-header">
          <h3><Music2 size={16} /> प्लेलिस्ट</h3>
          <button className="icon-btn" onClick={onClose} aria-label="बंद करा"><X size={18} /></button>
        </div>

        {usingExternalPlaylist && (
          <p className="player-note eng" style={{ padding: '0 4px 12px' }}>
            Full track list is managed by your YouTube playlist. Use the player's
            next/previous controls to browse it.
          </p>
        )}

        {recentSongs.length > 0 && (
          <div className="playlist-group">
            <h4 className="eng playlist-group-title"><History size={14} /> Recently Played</h4>
            {recentSongs.map((song) => (
              <SongRow
                key={`recent-${song.id}`}
                song={song}
                isCurrent={song.id === currentSongId}
                isFav={favorites.includes(song.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}

        <div className="playlist-group">
          <h4 className="eng playlist-group-title">All Tracks</h4>
          {songs.map((song) => (
            <SongRow
              key={song.id}
              song={song}
              isCurrent={song.id === currentSongId}
              isFav={favorites.includes(song.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelect}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

function SongRow({ song, isCurrent, isFav, onToggleFavorite, onSelect }) {
  return (
    <div className={`song-row ${isCurrent ? 'active' : ''}`}>
      <button className="song-row-main" onClick={() => onSelect(song)}>
        <span className="song-row-thumb" aria-hidden="true">
          {isCurrent ? (
            <span className="eq-badge small"><i /><i /><i /></span>
          ) : (
            <Music2 size={16} />
          )}
        </span>
        <span className="song-row-text">
          <span className="song-row-title">{song.title}</span>
          <span className="song-row-sub eng">{categoryName(song.category)}</span>
        </span>
      </button>
      <button
        className={`icon-btn favorite-btn small ${isFav ? 'active' : ''}`}
        onClick={() => onToggleFavorite(song.id)}
        aria-pressed={isFav}
        aria-label={isFav ? 'आवडींमधून काढा' : 'आवडींमध्ये जोडा'}
      >
        <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
