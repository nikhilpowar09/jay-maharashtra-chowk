import { Youtube, Instagram, Facebook, MessageCircle, Twitter, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/config.js';

const SOCIAL_ITEMS = [
  { key: 'youtube', icon: Youtube, label: 'YouTube वर पहा' },
  { key: 'instagram', icon: Instagram, label: 'Instagram वर पहा' },
  { key: 'facebook', icon: Facebook, label: 'Facebook वर पहा' },
  { key: 'whatsapp', icon: MessageCircle, label: 'WhatsApp वर जोडा' },
  { key: 'twitter', icon: Twitter, label: 'Twitter / X वर पहा' },
  { key: 'location', icon: MapPin, label: 'स्थान पहा' },
];

export default function Footer() {
  const activeLinks = SOCIAL_ITEMS.filter((item) => SOCIAL_LINKS[item.key]);

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-title gold-text">जय महाराष्ट्र चौक</p>
        <p className="footer-tagline">गणपती बाप्पा मोरया!</p>

        {activeLinks.length > 0 && (
          <div className="footer-socials" aria-label="सोशल मीडिया दुवे">
            {activeLinks.map(({ key, icon: Icon, label }) => (
              <a
                key={key}
                className="icon-btn"
                href={SOCIAL_LINKS[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        )}

        <p className="footer-credit eng">Designed &amp; developed for Jay Maharashtra Chowk ·<a href="https://www-nikhilpowar-com.vercel.app/" target="_blank" rel="noopener noreferrer" >@nikhil_powar</a> </p>
      </div>
    </footer>
  );
}
