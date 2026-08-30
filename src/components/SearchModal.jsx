import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Search, Music2 } from 'lucide-react';
import { CATEGORIES } from '../data/config.js';

function categoryName(id) {
  return CATEGORIES.find((c) => c.id === id)?.name || id;
}

export default function SearchModal({ open, onClose, songs, usingExternalPlaylist, onSelect }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery('');
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter((s) =>
      [s.title, s.subtitle, s.artist, categoryName(s.category)]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query, songs]);

  if (!open) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        className="search-modal glass"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="शोध"
      >
        <div className="search-input-row">
          <Search size={18} />
          <input
            ref={inputRef}
            type="search"
            placeholder="गाणे, कलाकार, किंवा प्रकार शोधा…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="गाणी शोधा"
          />
          <button className="icon-btn" onClick={onClose} aria-label="बंद करा"><X size={18} /></button>
        </div>

        {usingExternalPlaylist && (
          <p className="player-note eng" style={{ padding: '4px 4px 12px' }}>
            Search covers the sample catalogue. Your live YouTube playlist is searchable
            from within the YouTube app/site.
          </p>
        )}

        <div className="search-results">
          {results.length === 0 ? (
            <p className="lyrics-empty eng">काहीही सापडले नाही. दुसरे काहीतरी शोधून पहा.</p>
          ) : (
            results.map((song) => (
              <button key={song.id} className="song-row-main search-result" onClick={() => onSelect(song)}>
                <span className="song-row-thumb" aria-hidden="true"><Music2 size={16} /></span>
                <span className="song-row-text">
                  <span className="song-row-title">{song.title}</span>
                  <span className="song-row-sub eng">{categoryName(song.category)} · {song.artist}</span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
