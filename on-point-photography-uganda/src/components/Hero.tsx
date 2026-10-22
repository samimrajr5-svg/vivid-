import React from 'react';
import { ArrowUpRight, Sparkles, Layers, Image as ImageIcon, Facebook } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PhotoshopIcon, IllustratorIcon, InDesignIcon } from './AdobeIcons';

export const Hero: React.FC = () => {
  const { config, projects, setSelectedProject } = usePortfolio();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF6B00]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Intro & Typography */}
          <div className="lg:col-span-5 text-left">
            <span className="text-[#FF6B00] font-heading font-semibold tracking-wider text-xs sm:text-sm mb-3 uppercase flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#FF6B00]"></span>
              HELLO, I'M
            </span>

            <h1
              id="hero-name-heading"
              className="font-heading font-bold text-5xl sm:text-7xl md:text-[80px] leading-[0.92] text-white tracking-tight uppercase mb-6"
            >
              {(config.name || 'VIVID PIXELS').split(' ')[0]}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                {(config.name || 'VIVID PIXELS').split(' ').slice(1).join(' ') || 'PIXELS'}
              </span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 border-l-2 border-[#FF6B00] pl-5 italic font-sans">
              “{config.tagline || 'Turning Ideas Into Powerful Visual Experiences.'}”
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                id="hero-view-work-btn"
                onClick={() => scrollTo('portfolio')}
                className="bg-[#FF6B00] hover:bg-[#ff7a1a] text-black px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#FF6B00]/25 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
              >
                <span>VIEW WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="hero-about-me-btn"
                onClick={() => scrollTo('about')}
                className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer"
              >
                ABOUT ME
              </button>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-3 text-white/60 text-xs font-medium">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
              <span>Available for Creative Projects</span>
            </div>
          </div>

          {/* Right Column: Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-6 gap-4">
            {/* Bento Card 1: Featured Project Teaser (sm:col-span-4) */}
            <div
              onClick={() => {
                if (featuredProject) setSelectedProject(featuredProject);
                else scrollTo('portfolio');
              }}
              className="sm:col-span-4 bento-card relative overflow-hidden group min-h-[220px] sm:min-h-[240px] flex flex-col justify-end p-6 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />

              {featuredProject ? (
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-[#161616] flex items-center justify-center p-6">
                  <div className="w-32 h-32 border border-white/15 rounded-2xl flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/30" />
                  </div>
                </div>
              )}

              <div className="relative z-20">
                <div className="inline-block px-2.5 py-1 bg-[#FF6B00] text-black text-[10px] font-bold uppercase rounded-md mb-2">
                  Featured Case Study
                </div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF6B00] transition-colors line-clamp-1">
                  {featuredProject?.title || 'Visual Identity & Branding Suite'}
                </h3>
                <p className="text-white/70 text-xs line-clamp-1 mt-0.5">
                  {featuredProject?.subcategory || 'Click to view project breakdown & assets'}
                </p>
              </div>

              <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:border-transparent transition-colors">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
              </div>
            </div>

            {/* Bento Card 2: Creative Conversion (sm:col-span-2) */}
            <div className="sm:col-span-2 bento-card p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-[#FF6B00]" />
                </div>
                <h4 className="font-heading font-bold text-base text-white mb-1.5">
                  Design Strategy
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  Crafting brand logos, social posts, posters, and marketing collateral designed to convert viewers into clients.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <span>Vector & Pixel</span>
                <span className="text-[#FF6B00] font-mono">100% CMYK/RGB</span>
              </div>
            </div>

            {/* Bento Card 3: Software Suite Badges (sm:col-span-2) */}
            <div className="sm:col-span-2 bento-card p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-2">
                  Core Tools
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <PhotoshopIcon size={32} />
                  <IllustratorIcon size={32} />
                  <InDesignIcon size={32} />
                </div>
                <h4 className="font-heading font-bold text-sm text-white mb-1">
                  Adobe Creative Suite
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-md border border-white/10 text-gray-300">
                  Branding
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-md border border-white/10 text-gray-300">
                  Typography
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-md border border-white/10 text-gray-300">
                  Layout
                </span>
              </div>
            </div>

            {/* Bento Card 4: Let's Work Together (sm:col-span-4) */}
            <div className="sm:col-span-4 bento-card p-5 flex items-center justify-between gap-4">
              <div className="flex-grow">
                <h4 className="text-base sm:text-lg font-bold font-heading text-white mb-1">
                  Let's Work Together
                </h4>
                <p className="text-white/60 text-xs mb-3 font-sans">
                  Available for brand identities, custom graphics & digital assets.
                </p>
                <div className="flex flex-wrap items-center gap-3.5">
                  {config.socials.facebook && (
                    <a
                      href={config.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/70 hover:text-[#1877F2] text-xs transition-colors group/fb"
                      title="Facebook Page: VIVID PIXELS"
                    >
                      <div className="w-5 h-5 bg-[#1877F2]/20 text-[#1877F2] rounded flex items-center justify-center text-[10px] font-bold group-hover/fb:bg-[#1877F2] group-hover/fb:text-white transition-colors">
                        <Facebook className="w-3 h-3" />
                      </div>
                      <span>Facebook</span>
                    </a>
                  )}
                  <a
                    href={config.socials.linkedin || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
                  >
                    <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">
                      in
                    </div>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={config.socials.behance || 'https://behance.net'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
                  >
                    <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">
                      be
                    </div>
                    <span>Behance</span>
                  </a>
                  <a
                    href={config.socials.dribbble || 'https://dribbble.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
                  >
                    <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">
                      dr
                    </div>
                    <span>Dribbble</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => scrollTo('contact')}
                className="w-14 h-14 rounded-full border border-[#FF6B00] flex items-center justify-center shrink-0 group hover:bg-[#FF6B00] transition-all duration-300 cursor-pointer shadow-lg shadow-[#FF6B00]/15"
                title="Start a project"
              >
                <ArrowUpRight className="w-6 h-6 text-[#FF6B00] group-hover:text-black transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
