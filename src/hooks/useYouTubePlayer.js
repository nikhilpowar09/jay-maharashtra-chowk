import { useCallback, useEffect, useRef, useState } from 'react';

let apiPromise = null;

// Loads the YouTube IFrame Player API script exactly once, however many
// components ask for it.
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === 'function') prevCallback();
      resolve(window.YT);
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });

  return apiPromise;
}

export function extractPlaylistId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.searchParams.get('list');
  } catch {
    return null;
  }
}

export function extractVideoId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

/**
 * Wraps the YouTube IFrame Player API behind a small, app-friendly control
 * surface: play/pause/next/prev/seek/volume plus polled time & duration.
 * Only initializes the player lazily, on first mount of the element it needs.
 */
export function useYouTubePlayer({ elementId }) {
  const playerRef = useRef(null);
  const rafRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [muted, setMuted] = useState(false);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [playbackError, setPlaybackError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Poll time/duration while playing (YT API has no timeupdate event).
  useEffect(() => {
    function tick() {
      const p = playerRef.current;
      if (p && typeof p.getCurrentTime === 'function') {
        try {
          setCurrentTime(p.getCurrentTime() || 0);
          setDuration(p.getDuration() || 0);
        } catch {
          /* player not ready yet */
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const init = useCallback(
    async ({ videoId, listId } = {}) => {
      const YT = await loadYouTubeAPI();
      if (playerRef.current) return playerRef.current;

      return new Promise((resolve) => {
        const player = new YT.Player(elementId, {
          width: '100%',
          height: '100%',
          videoId: listId ? undefined : videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            fs: 0,
            ...(listId ? { listType: 'playlist', list: listId } : {}),
          },
          events: {
            onReady: (e) => {
              playerRef.current = player;
              e.target.setVolume(volume);
              setReady(true);
              resolve(player);
            },
            onStateChange: (e) => {
              const YTState = window.YT.PlayerState;
              if (e.data === YTState.PLAYING) {
                setIsPlaying(true);
                setNeedsUserGesture(false);
                setPlaybackError(null);
              }
              if (e.data === YTState.PAUSED) setIsPlaying(false);
              if (e.data === YTState.ENDED) setIsPlaying(false);
              if (e.data === YTState.CUED) {
                // ready to play — attempt autoplay
              }
              try {
                const idx = player.getPlaylistIndex ? player.getPlaylistIndex() : 0;
                if (typeof idx === 'number' && idx >= 0) setCurrentIndex(idx);
              } catch {
                /* not in playlist mode */
              }
            },
            onError: (e) => {
              // 2 invalid param, 5 html5, 100 not found, 101/150 embedding disabled
              setPlaybackError(e.data);
            },
          },
        });
      });
    },
    [elementId, volume]
  );

  const play = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      p.playVideo();
      // Detect autoplay block: if state doesn't change within a beat, ask for a tap.
      setTimeout(() => {
        if (p.getPlayerState && p.getPlayerState() !== 1) {
          setNeedsUserGesture(true);
        }
      }, 700);
    } catch {
      setNeedsUserGesture(true);
    }
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.();
  }, []);

  const toggle = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, pause, play]);

  const next = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.nextVideo) p.nextVideo();
  }, []);

  const previous = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.previousVideo) p.previousVideo();
  }, []);

  const playIndex = useCallback((index) => {
    const p = playerRef.current;
    if (!p) return;
    if (p.playVideoAt) p.playVideoAt(index);
  }, []);

  const loadSingle = useCallback((videoId) => {
    const p = playerRef.current;
    if (!p || !videoId) return;
    p.loadVideoById(videoId);
  }, []);

  const seekTo = useCallback((seconds) => {
    playerRef.current?.seekTo?.(seconds, true);
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    playerRef.current?.setVolume?.(v);
    if (v === 0) {
      playerRef.current?.mute?.();
      setMuted(true);
    } else if (muted) {
      playerRef.current?.unMute?.();
      setMuted(false);
    }
  }, [muted]);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  }, [muted]);

  return {
    init,
    ready,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    needsUserGesture,
    playbackError,
    currentIndex,
    play,
    pause,
    toggle,
    next,
    previous,
    playIndex,
    loadSingle,
    seekTo,
    setVolume,
    toggleMute,
  };
}
