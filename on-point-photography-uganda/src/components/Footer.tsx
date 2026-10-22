import React from 'react';
import {
  ArrowUp,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Facebook,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { VividPixelLogo } from './AdobeIcons';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { config, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#070707] text-white pt-16 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Brand Info (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center p-1">
                <VividPixelLogo className="w-full h-full" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                {config.brandName || 'VIVID PIXELS'}
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
              </span>
            </div>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              “{config.tagline || 'Turning Ideas Into Powerful Visual Experiences.'}”
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Available for Freelance & Contract Projects</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                <span>{config.location}</span>
              </div>
              {config.contactPhone && (
                <div className="flex items-center gap-2 text-white/60">
                  <Phone className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                  <a
                    href={`tel:${config.contactPhone.startsWith('01') ? `+88${config.contactPhone}` : config.contactPhone}`}
                    className="hover:text-[#FF6B00] transition-colors"
                  >
                    {config.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Nav Links (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] block mb-2">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-[#FF6B00] transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Connect (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] block mb-2">
              Connect & Follow
            </span>
            <div className="flex flex-wrap gap-2">
              {config.socials.facebook && (
                <a
                  href={config.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#1877F2]/15 hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/30 rounded-lg text-xs font-semibold text-[#1877F2] transition-colors flex items-center gap-1.5"
                  title="Follow VIVID PIXELS on Facebook"
                >
                  <Facebook className="w-3 h-3" />
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <a
                href={config.socials.behance || 'https://behance.net'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 hover:bg-[#FF6B00] hover:text-black border border-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-1.5"
              >
                <span>Behance</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={config.socials.dribbble || 'https://dribbble.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 hover:bg-[#FF6B00] hover:text-black border border-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-1.5"
              >
                <span>Dribbble</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={config.socials.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 hover:bg-[#FF6B00] hover:text-black border border-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={config.socials.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 hover:bg-[#FF6B00] hover:text-black border border-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`mailto:${config.contactEmail}`}
                className="px-3 py-1.5 bg-[#FF6B00]/15 hover:bg-[#FF6B00] hover:text-black border border-[#FF6B00]/30 rounded-lg text-xs font-semibold text-[#FF6B00] transition-colors flex items-center gap-1.5"
                title={config.contactEmail}
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
              {config.contactPhone && (
                <a
                  href={`https://wa.me/${config.contactPhone.startsWith('01') ? `88${config.contactPhone}` : config.contactPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-semibold text-emerald-400 transition-colors flex items-center gap-1.5"
                  title={`WhatsApp: ${config.contactPhone}`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} {config.brandName || 'VIVID PIXELS'}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{isAdmin ? 'Admin Dashboard (Active)' : 'Admin Login'}</span>
            </button>

            <span className="text-white/20">•</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white/70 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
