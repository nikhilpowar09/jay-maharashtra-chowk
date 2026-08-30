import { useState } from 'react';
import { Search, Maximize2, Sun, Moon, MoonStar, Menu, X, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { id: 'aarti', label: 'आरती' },
  { id: 'bhajan', label: 'भजने' },
  { id: 'songs', label: 'गाणी' },
  { id: 'dhol', label: 'ढोल-ताशा' },
];

const THEME_CYCLE = [
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'night', icon: MoonStar, label: 'Night' },
];

export default function Navbar({
  theme, setTheme, onSearchClick, onFullscreenClick,
  selectedCategory, onSelectCategory, festivalMode, onToggleFestival,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const cycleTheme = () => {
    const idx = THEME_CYCLE.findIndex((t) => t.id === theme);
    setTheme(THEME_CYCLE[(idx + 1) % THEME_CYCLE.length].id);
  };
  const ThemeIcon = THEME_CYCLE.find((t) => t.id === theme)?.icon || Moon;

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-inner">
        <a href="#main-content" className="brand-icon" aria-label="जय महाराष्ट्र चौक — होम">
          <span aria-hidden="true">ॐ</span>
        </a>

        <div className="navbar-actions">
          <button
            className={`icon-btn ${festivalMode ? 'active' : ''}`}
            onClick={onToggleFestival}
            aria-pressed={festivalMode}
            aria-label="उत्सव मोड · Festival Mode"
          >
            <Sparkles size={18} />
          </button>
          <button className="icon-btn" onClick={onSearchClick} aria-label="गाणी शोधा · Search">
            <Search size={18} />
          </button>
          <button className="icon-btn" onClick={cycleTheme} aria-label={`थीम बदला · ${theme} mode active`}>
            <ThemeIcon size={18} />
          </button>
          <button className="icon-btn" onClick={onFullscreenClick} aria-label="फुल स्क्रीन प्लेयर उघडा">
            <Maximize2 size={18} />
          </button>
          <button
            className="icon-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'मेनू बंद करा' : 'प्रकार निवडा · Categories'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-menu glass" aria-label="संगीत प्रकार">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`mobile-link ${selectedCategory === link.id ? 'active' : ''}`}
              onClick={() => { onSelectCategory(link.id); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
