# जय महाराष्ट्र चौक — Jay Maharashtra Chowk

A premium, responsive devotional music website built with **React + Vite**, featuring the
official **YouTube IFrame Player API**, synced lyrics, genre browsing, favorites, festival
mode, an immersive fullscreen player, and a dark cinematic Marathi-cultural design.

---

## 1. Quick start

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+.

---

## 2. 🔑 The only thing you *need* to change: your playlist

Open **`src/data/config.js`** and paste your full YouTube playlist URL:

```js
export const MUSIC_CONFIG = {
  playlistUrl: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID',
  title: 'जय महाराष्ट्र चौक',
  subtitle: 'गणपती बाप्पा मोरया!',
};
```

That's it. The app extracts the playlist ID and loads the **entire playlist** through YouTube's
official player (`listType: 'playlist'`) — you never need to list individual video IDs.

**While `playlistUrl` is empty** (as shipped), the site runs on 3 sample tracks in
`SAMPLE_SONGS` (built from the links you shared) so you can see the full experience — genre
filtering, playlist drawer, search, and favorites — working immediately.

> Note: only videos the uploader has allowed to be embedded will play. Private, deleted, or
> embedding-restricted videos will show a friendly on-screen message instead of breaking the
> player (see `ERROR_MESSAGES` in `src/components/MusicPlayer.jsx`).

### Optional: multiple playlists per genre

```js
export const PLAYLISTS = [
  { id: 'aarti', url: 'https://www.youtube.com/playlist?list=PLAYLIST_ID_1' },
  { id: 'dhol',  url: 'https://www.youtube.com/playlist?list=PLAYLIST_ID_2' },
];
```

This is scaffolded in `config.js` for you to wire up later — the basic single-playlist mode
works with zero extra configuration.

---

## 3. Adding more songs

Songs live in `src/data/config.js` under `SAMPLE_SONGS`. Add a new entry with the video's
YouTube ID, a title, subtitle/category, and artist — that's all a track needs:

```js
{
  id: 's7',
  videoId: 'dQw4w9WgXcQ', // the part after youtu.be/ or ?v= in a normal YouTube link
  title: 'गाण्याचे नाव',
  subtitle: 'Category label',
  category: 'bhajan', // must match an id in CATEGORIES
  artist: 'कलाकार',
},
```

---

## 4. Project structure

```
src/
├── components/
│   ├── Navbar.jsx           Transparent, icon-only nav: search, theme, fullscreen, categories menu
│   ├── Hero.jsx              Full-bleed banner image with the compact player docked inside it
│   ├── MusicPlayer.jsx       Compact "mini player": controls, seek, volume, favorite
│   ├── Visualizer.jsx        Playback-state-synced bar visualizer (used in the fullscreen player)
│   ├── Playlist.jsx          Playlist drawer (recently played + all tracks)
│   ├── SearchModal.jsx       Global song search
│   ├── FestivalMode.jsx      Petal / glow overlay for "Bappa Festival Mode"
│   ├── FullscreenPlayer.jsx  Immersive fullscreen experience
│   └── Footer.jsx            Social links (only shows platforms you've filled in)
├── data/
│   └── config.js             ← YOUR PLAYLIST URL, categories, sample songs, social links
├── hooks/
│   ├── useYouTubePlayer.js   Thin wrapper around the YouTube IFrame Player API
│   └── useLocalStorage.js    Persists theme, favorites, recents, festival mode, etc.
├── assets/images/
│   └── hero-bg.jpg            Your banner image (used as the hero background + player art)
├── App.jsx / App.css
├── index.css                 Design tokens (palette, type scale, motion)
└── main.jsx
```

---

## 5. Features included

- Official YouTube IFrame Player API integration (single playlist URL, no video IDs needed)
- Friendly error handling for private / restricted / deleted videos
- Compact player docked inside the hero image: play/pause, prev/next, seek, time, volume, favorite
- Category switching (Aarti, Bhajan, Ganapati Songs, Dhol-Tasha, and more) via the navbar menu
- Playlist drawer with Recently Played + all tracks
- Global search across title / artist / category
- Favorites, stored in `localStorage`, no login required
- "Continue Listening": last song, category, volume, and theme are remembered on refresh
- Dark / Light / Night theme modes
- Bappa Festival Mode: floating petals, extra glow
- Fullscreen immersive player with a playback-synced visualizer
- Transparent, icon-only navbar
- Fully responsive (320px → 4K), keyboard accessible, respects `prefers-reduced-motion`

---

## 6. Social links

Your YouTube channel, Instagram, and location are wired up in the footer, and it automatically
shows only the platforms you've actually filled in. Edit them anytime in `src/data/config.js`
under `SOCIAL_LINKS`:

```js
export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@jaymaharashtrachowk',
  instagram: 'https://www.instagram.com/jaymaharashtrachouk/',
  location: 'https://maps.google.com/...',
  facebook: '',   // add a URL and the icon appears automatically
  whatsapp: '',   // e.g. a WhatsApp group invite link
  twitter: '',
};
```

Leave any of these as an empty string `''` and that icon simply won't render in the footer —
no other code changes needed.

## 7. Deployment

This is a static Vite app — deploy the `dist/` folder anywhere static hosting is supported:

**Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**GitHub Pages / any static host**
```bash
npm run build
# upload the contents of dist/ to your host
```

No backend or environment variables are required — everything runs client-side against the
public YouTube IFrame API.

---

## 8. Artwork

The banner image (`src/assets/images/hero-bg.jpg`) is used as the hero background and as the
player's album art in both the compact player and the fullscreen view. To swap it for a
different photo, replace that file (keeping the same filename) or update the `heroBg` import
path in `Hero.jsx`, `MusicPlayer.jsx`, and `FullscreenPlayer.jsx`.

---

**जय महाराष्ट्र चौक — गणपती बाप्पा मोरया! 🙏**
