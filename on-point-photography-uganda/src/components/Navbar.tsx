import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, ShieldCheck, Phone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { VividPixelLogo } from './AdobeIcons';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { config, isAdmin } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['home', 'about', 'portfolio', 'services', 'skills', 'process', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/60 border border-white/15 flex items-center justify-center group-hover:scale-105 group-hover:border-[#FF6B00]/60 transition-all duration-300 shadow-md">
              {config.profileImage ? (
                <img
                  src={config.profileImage}
                  alt={config.brandName || 'VIVID PIXELS'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <VividPixelLogo className="w-full h-full p-1" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                {config.brandName || 'VIVID PIXELS'}
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">
                Graphic Designer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#141414]/80 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6B00] text-black font-semibold shadow-md shadow-[#FF6B00]/25'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {config.contactPhone && (
              <a
                href={`tel:${config.contactPhone.startsWith('01') ? `+88${config.contactPhone}` : config.contactPhone}`}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title={`Call: ${config.contactPhone}`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px] font-semibold">{config.contactPhone}</span>
              </a>
            )}

            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAdmin
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
              title="Admin Dashboard"
            >
              {isAdmin ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-[#FF6B00]" />}
              <span className="hidden md:inline font-mono text-[11px]">{isAdmin ? 'Admin: Active' : 'CMS'}</span>
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="bg-[#FF6B00] hover:bg-[#ff7a1a] text-black px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 shadow-lg shadow-[#FF6B00]/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-white/70 hover:text-white bg-white/5 border border-white/10"
              title="Admin"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF6B00]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/98 border-b border-white/10 px-4 pt-4 pb-6 mt-3 shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FF6B00] text-black font-semibold'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-2">
              {config.contactPhone && (
                <a
                  href={`tel:${config.contactPhone.startsWith('01') ? `+88${config.contactPhone}` : config.contactPhone}`}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {config.contactPhone}</span>
                </a>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 text-white/80 border border-white/10 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                <span>Open CMS Admin Dashboard</span>
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full bg-[#FF6B00] text-black py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/25"
              >
                <span>Hire Me Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
