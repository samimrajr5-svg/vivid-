import React, { useState } from 'react';
import { Shield, Type, Grid, Palette, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PhotoshopIcon, IllustratorIcon, InDesignIcon } from './AdobeIcons';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'software' | 'design_theory'>('all');

  const filteredSkills = skills.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const renderSkillIcon = (skillName: string, iconType: string) => {
    const lower = skillName.toLowerCase();
    if (lower.includes('photoshop')) {
      return <PhotoshopIcon size={38} />;
    }
    if (lower.includes('illustrator')) {
      return <IllustratorIcon size={38} />;
    }
    if (lower.includes('indesign')) {
      return <InDesignIcon size={38} />;
    }
    if (lower.includes('brand')) {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300">
          <Shield className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('typography')) {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300">
          <Type className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('layout')) {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300">
          <Grid className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('color')) {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300">
          <Palette className="w-5 h-5" />
        </div>
      );
    }
    if (lower.includes('social')) {
      return (
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300">
          <Share2 className="w-5 h-5" />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-black transition-colors duration-300">
        <Sparkles className="w-5 h-5" />
      </div>
    );
  };

  return (
    <section id="skills" className="relative py-20 md:py-28 bg-[#0A0A0A] text-white overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#FF6B00] font-heading font-semibold text-xs sm:text-sm tracking-tight uppercase block mb-2">
              EXPERTISE & TOOLS
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              Skills & Creative Stack
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 mt-6 md:mt-0 p-1 bg-white/5 rounded-full border border-white/10 self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#FF6B00] text-black font-bold shadow-md shadow-[#FF6B00]/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setFilter('software')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === 'software'
                  ? 'bg-[#FF6B00] text-black font-bold shadow-md shadow-[#FF6B00]/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Software
            </button>
            <button
              onClick={() => setFilter('design_theory')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === 'design_theory'
                  ? 'bg-[#FF6B00] text-black font-bold shadow-md shadow-[#FF6B00]/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Strategy
            </button>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="bento-card p-6 flex flex-col justify-between group hover:border-[#FF6B00]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">{renderSkillIcon(skill.name, skill.icon)}</div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF6B00] transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-white/50 font-medium tracking-wide">
                        {skill.experienceYears || '4+ Years Exp'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
                    {skill.category === 'software' ? 'Software' : 'Design Theory'}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-white/50 font-medium">Proficiency Level</span>
                  <span className="font-heading font-bold text-white group-hover:text-[#FF6B00] transition-colors">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF9A00] rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-white/10 bg-gradient-to-r from-[#141414] via-[#161616] to-[#121212]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                Industry-Standard Print & Digital Delivery
              </h4>
              <p className="text-xs text-white/60 mt-0.5">
                Every project includes full commercial vectors (AI, EPS, SVG), layered PSDs, bleed guides, and CMYK color profiles.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/10 hover:bg-[#FF6B00] hover:text-black text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer border border-white/10 hover:border-transparent"
          >
            Start Project
          </button>
        </div>
      </div>
    </section>
  );
};
