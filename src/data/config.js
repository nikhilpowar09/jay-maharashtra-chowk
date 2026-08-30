// =====================================================================================
// 🪔  MUSIC CONFIGURATION — जय महाराष्ट्र चौक
// =====================================================================================
// ✅ TO GO LIVE, YOU ONLY NEED TO DO ONE THING:
//    Paste your full YouTube PLAYLIST URL below as `playlistUrl`.
//    Example: "https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxxxxxxxxxx"
//
//    The app will automatically extract the playlist ID and load every video in it
//    using the official YouTube IFrame Player API (listType: 'playlist').
//    You do NOT need to enter individual video IDs.
//
//    While `playlistUrl` is empty (as shipped), the app runs on the 3 SAMPLE_SONGS
//    below so you can see the full experience working immediately.
// =====================================================================================

export const MUSIC_CONFIG = {
  // 👉 PASTE YOUR YOUTUBE PLAYLIST URL HERE:
  playlistUrl: '',
  title: 'जय महाराष्ट्र चौक',
  subtitle: 'गणपती बाप्पा मोरया!',
  englishSubtitle: 'Jay Maharashtra Chowk · Ganapati Utsav',
};

// Optional: multiple named playlists for the genre selector.
// Leave empty to run purely off SAMPLE_SONGS below. Add entries like:
// { id: 'aarti', url: 'https://www.youtube.com/playlist?list=PLAYLIST_ID_1' }
export const PLAYLISTS = [
  // { id: 'aarti', url: 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID' },
];

export const CATEGORIES = [
  { id: 'aarti', name: 'गणपती आरती', short: 'Aarti', icon: 'Flame', mood: 'aarti' },
  { id: 'bhajan', name: 'गणपती भजने', short: 'Bhajan', icon: 'HandHeart', mood: 'bhajan' },
  { id: 'songs', name: 'गणपती गाणी', short: 'Songs', icon: 'Music2', mood: 'songs' },
  { id: 'dhol', name: 'ढोल-ताशा', short: 'Dhol-Tasha', icon: 'Drum', mood: 'dhol' },
  { id: 'abhang', name: 'अभंग', short: 'Abhang', icon: 'BookOpenText', mood: 'abhang' },
  { id: 'mantra', name: 'मंत्र', short: 'Mantra', icon: 'Sparkle', mood: 'mantra' },
  { id: 'bhaktigeete', name: 'भक्तिगीते', short: 'Bhaktigeete', icon: 'Heart', mood: 'bhaktigeete' },
  { id: 'festival', name: 'उत्सव स्पेशल', short: 'Festival Special', icon: 'PartyPopper', mood: 'festival' },
  { id: 'hanuman', name: 'हनुमान चालीसा', short: 'Hanuman Chalisa', icon: 'Wind', mood: 'hanuman' },
  { id: 'shiv', name: 'शिव भजने', short: 'Shiv Bhajan', icon: 'Moon', mood: 'shiv' },
  { id: 'krishna', name: 'कृष्ण भजने', short: 'Krishna Bhajan', icon: 'Feather', mood: 'krishna' },
];

// Background mood tokens per category — used by the dynamic background system.
export const MOOD_THEME = {
  aarti:       { glow: '#FFB454', from: '#2B1607', to: '#0B0704' },
  bhajan:      { glow: '#FF9A3D', from: '#241206', to: '#0B0704' },
  songs:       { glow: '#F2B33D', from: '#26160A', to: '#0B0704' },
  dhol:        { glow: '#FF5A36', from: '#3A1206', to: '#120503' },
  abhang:      { glow: '#D9A441', from: '#241708', to: '#0B0704' },
  mantra:      { glow: '#8FA6FF', from: '#0C1230', to: '#0A0704' },
  bhaktigeete: { glow: '#FFC46B', from: '#231407', to: '#0B0704' },
  festival:    { glow: '#FFD27A', from: '#2E1608', to: '#0B0704' },
  hanuman:     { glow: '#FF6A3D', from: '#3B0F08', to: '#0B0704' },
  shiv:        { glow: '#9FC8FF', from: '#0A1626', to: '#08070A' },
  krishna:     { glow: '#8FD3FF', from: '#0A1B2E', to: '#08070A' },
};

// ---------------------------------------------------------------------------
// SAMPLE SONGS — used automatically when MUSIC_CONFIG.playlistUrl is empty.
// Replace / extend freely, or delete once you switch to a real playlist.
// videoId is the part after youtu.be/ or ?v= in a normal YouTube link.
// ---------------------------------------------------------------------------
export const SAMPLE_SONGS = [
  {
    id: 's1',
    videoId: '-XBqXdZh554',
    title: 'सुखकर्ता दुखहर्ता',
    subtitle: 'Ganapati Aarti',
    category: 'aarti',
    artist: 'पारंपारिक',
  },
  {
    id: 's2',
    videoId: 'kYQBwC744UQ',
    title: 'गणपती बाप्पा मोरया',
    subtitle: 'Ganapati Songs',
    category: 'songs',
    artist: 'पारंपारिक',
  },
  {
    id: 's3',
    videoId: 'u_YIQPtpIIs',
    title: 'ढोल-ताशा जल्लोष',
    subtitle: 'Dhol-Tasha · Festival Special',
    category: 'dhol',
    artist: 'ढोल पथक',
  },
  // ---- Jay Maharashtra Chowk — official songs ------------------------------
  // Titles below are placeholders; rename them to the real song names whenever
  // you'd like — this doesn't affect playback, it's just display text.
  {
    id: 's4',
    videoId: 'TQeGQYEjpO0',
    title: 'जय महाराष्ट्र चौक विशेष गीत १',
    subtitle: 'Jay Maharashtra Chowk · Featured',
    category: 'festival',
    artist: 'Jay Maharashtra Chowk',
  },
  {
    id: 's5',
    videoId: 'bOJZ_G6Dp38',
    title: 'जय महाराष्ट्र चौक विशेष गीत २',
    subtitle: 'Jay Maharashtra Chowk · Featured',
    category: 'festival',
    artist: 'Jay Maharashtra Chowk',
  },
  {
    id: 's6',
    videoId: 'lbY37wUZb0k',
    title: 'जय महाराष्ट्र चौक विशेष गीत ३',
    subtitle: 'Jay Maharashtra Chowk · Featured',
    category: 'festival',
    artist: 'Jay Maharashtra Chowk',
  },
];

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@jaymaharashtrachowk?si=_R8IHOE7zHxMAcLY',
  instagram: 'https://www.instagram.com/jaymaharashtrachouk/',
  location: 'https://share.google/iEE26YtaVv6XYxtQl',
  // Add any of these whenever you have a link — leave blank ('') to hide
  // that icon. Only platforms with a real URL show up in the footer.
  facebook: '',
  whatsapp: '', // e.g. a WhatsApp group invite link: https://chat.whatsapp.com/xxxxxxxx
  twitter: '',
};

export const DYNAMIC_MESSAGES = [
  'गणपती बाप्पा मोरया!',
  'मंगलमूर्ती मोरया!',
  'बाप्पाच्या भक्तीत रमूया...',
  'भक्ती, संगीत आणि उत्सवाचा संगम',
];
