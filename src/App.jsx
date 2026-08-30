import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Playlist from './components/Playlist.jsx';
import SearchModal from './components/SearchModal.jsx';
import FullscreenPlayer from './components/FullscreenPlayer.jsx';
import FestivalMode from './components/FestivalMode.jsx';
import Footer from './components/Footer.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useYouTubePlayer, extractPlaylistId } from './hooks/useYouTubePlayer.js';
import {
  MUSIC_CONFIG,
  SAMPLE_SONGS,
  MOOD_THEME,
} from './data/config.js';

const USING_EXTERNAL_PLAYLIST = Boolean(MUSIC_CONFIG.playlistUrl);

export default function App() {
  const [theme, setTheme] = useLocalStorage('jmc-theme', 'dark');
  const [festivalMode, setFestivalMode] = useLocalStorage('jmc-festival', false);
  const [favorites, setFavorites] = useLocalStorage('jmc-favorites', []);
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage('jmc-recent', []);
  const [selectedCategory, setSelectedCategory] = useLocalStorage('jmc-category', 'aarti');
  const [songIndex, setSongIndex] = useLocalStorage('jmc-song-index', 0);
  const [savedVolume, setSavedVolume] = useLocalStorage('jmc-volume', 80);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [listenerCount, setListenerCount] = useState(1285);

  const yt = useYouTubePlayer({ elementId: 'yt-player' });
  const initRef = useRef(false);

  const currentSong = USING_EXTERNAL_PLAYLIST
    ? null
    : SAMPLE_SONGS[songIndex % SAMPLE_SONGS.length];

  const mood = MOOD_THEME[(currentSong && currentSong.category) || selectedCategory] || MOOD_THEME.aarti;

  // Apply theme + mood CSS variables to the document root.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty('--mood-glow', mood.glow);
    document.documentElement.style.setProperty('--mood-from', mood.from);
    document.documentElement.style.setProperty('--mood-to', mood.to);
  }, [theme, mood]);

  // Initialize the player once on mount.
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    if (USING_EXTERNAL_PLAYLIST) {
      const listId = extractPlaylistId(MUSIC_CONFIG.playlistUrl);
      yt.init({ listId });
    } else {
      yt.init({ videoId: currentSong?.videoId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore saved volume once the player is ready.
  useEffect(() => {
    if (yt.ready) yt.setVolume(savedVolume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yt.ready]);

  // Track recently played once a song actually starts playing.
  useEffect(() => {
    if (yt.isPlaying && currentSong) {
      setRecentlyPlayed((prev) => {
        const withoutCurrent = prev.filter((id) => id !== currentSong.id);
        return [currentSong.id, ...withoutCurrent].slice(0, 10);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yt.isPlaying]);

  // Gently jitter the "live listener" badge for atmosphere (demo data only).
  useEffect(() => {
    const id = setInterval(() => {
      setListenerCount((c) => Math.max(600, c + Math.round((Math.random() - 0.5) * 40)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const selectSongByIndex = useCallback(
    (index) => {
      if (USING_EXTERNAL_PLAYLIST) {
        yt.playIndex(index);
        return;
      }
      const song = SAMPLE_SONGS[index % SAMPLE_SONGS.length];
      setSongIndex(index % SAMPLE_SONGS.length);
      yt.loadSingle(song.videoId);
      setTimeout(() => yt.play(), 250);
    },
    [yt, setSongIndex]
  );

  const handleNext = useCallback(() => {
    if (USING_EXTERNAL_PLAYLIST) return yt.next();
    selectSongByIndex((songIndex + 1) % SAMPLE_SONGS.length);
  }, [USING_EXTERNAL_PLAYLIST, yt, songIndex, selectSongByIndex]);

  const handlePrevious = useCallback(() => {
    if (USING_EXTERNAL_PLAYLIST) return yt.previous();
    selectSongByIndex((songIndex - 1 + SAMPLE_SONGS.length) % SAMPLE_SONGS.length);
  }, [USING_EXTERNAL_PLAYLIST, yt, songIndex, selectSongByIndex]);

  const toggleFavorite = useCallback(
    (songId) => {
      setFavorites((prev) =>
        prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
      );
    },
    [setFavorites]
  );

  const handleVolumeChange = useCallback(
    (v) => {
      yt.setVolume(v);
      setSavedVolume(v);
    },
    [yt, setSavedVolume]
  );

  const visibleSongs = useMemo(() => {
    if (USING_EXTERNAL_PLAYLIST) return [];
    if (selectedCategory === 'all') return SAMPLE_SONGS;
    return SAMPLE_SONGS.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">मुख्य मजकुराकडे जा · Skip to content</a>

      <div className="ambient-bg" aria-hidden="true" />

      {festivalMode && <FestivalMode />}

      <Navbar
        theme={theme}
        setTheme={setTheme}
        onSearchClick={() => setSearchOpen(true)}
        onFullscreenClick={() => setFullscreenOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        festivalMode={festivalMode}
        onToggleFestival={() => setFestivalMode((f) => !f)}
      />

      <main id="main-content">
        <Hero
          currentSong={currentSong}
          usingExternalPlaylist={USING_EXTERNAL_PLAYLIST}
          listenerCount={listenerCount}
          yt={yt}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onVolumeChange={handleVolumeChange}
          onOpenPlaylist={() => setDrawerOpen(true)}
          onOpenFullscreen={() => setFullscreenOpen(true)}
          playbackError={yt.playbackError}
        />
      </main>

      <Footer />

      {/* Off-screen YouTube player target — visually hidden but present in DOM */}
      <div style={{ position: 'fixed', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none', bottom: 0, left: 0 }}>
        <div id="yt-player" />
      </div>

      <Playlist
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        songs={visibleSongs.length ? visibleSongs : SAMPLE_SONGS}
        currentSongId={currentSong?.id}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelect={(song) => {
          const idx = SAMPLE_SONGS.findIndex((s) => s.id === song.id);
          if (idx >= 0) selectSongByIndex(idx);
          setDrawerOpen(false);
        }}
        recentlyPlayed={recentlyPlayed}
        usingExternalPlaylist={USING_EXTERNAL_PLAYLIST}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        songs={SAMPLE_SONGS}
        usingExternalPlaylist={USING_EXTERNAL_PLAYLIST}
        onSelect={(song) => {
          const idx = SAMPLE_SONGS.findIndex((s) => s.id === song.id);
          if (idx >= 0) selectSongByIndex(idx);
          setSearchOpen(false);
        }}
      />

      {fullscreenOpen && (
        <FullscreenPlayer
          yt={yt}
          currentSong={currentSong}
          onClose={() => setFullscreenOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
