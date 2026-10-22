import React from 'react';
import { Briefcase, Users, Award, Smile, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { VividPixelLogo } from './AdobeIcons';

export const About: React.FC = () => {
  const { config } = usePortfolio();

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#FF5A1F] group-hover:text-black transition-colors" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#FF5A1F] group-hover:text-black transition-colors" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#FF5A1F] group-hover:text-black transition-colors" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-[#FF5A1F] group-hover:text-black transition-colors" />;
      default:
        return <Award className="w-5 h-5 text-[#FF5A1F] group-hover:text-black transition-colors" />;
    }
  };

  const strengths = [
    'Pixel & Vector Precision',
    'Print & Digital Ready',
    'Fast Turnaround Time',
    'Brand Strategy & Layout',
    'Minimalist Aesthetics',
    '1-on-1 Direct Support',
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#F4F4F4] text-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-[#FF5A1F] font-heading font-bold text-xs sm:text-sm tracking-widest uppercase block mb-2">
            ABOUT ME
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] tracking-tight leading-tight max-w-2xl">
            {config.aboutHeadline || 'Creative. Professional. Detail-Oriented.'}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Profile Card (lg:col-span-5) */}
          <div className="lg:col-span-5 light-card p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-black/5 bg-white">
            <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/4.2] w-full bg-[#0D0D0D] border border-gray-200/50 flex items-center justify-center p-2 sm:p-3 shadow-inner">
              {config.profileImage ? (
                <img
                  src={config.profileImage}
                  alt={config.name}
                  className="w-full h-full max-h-[380px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 select-none shadow-md"
                />
              ) : (
                <div className="w-full h-full min-h-[260px] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#FF5A1F]/10 blur-2xl rounded-full" />
                  <div className="w-20 h-20 rounded-2xl bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-[#FF5A1F]/20">
                    <VividPixelLogo size={42} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white relative z-10">
                    {config.brandName || 'VIVID PIXELS'}
                  </h3>
                  <p className="text-xs text-white/60 uppercase tracking-widest mt-1 relative z-10">
                    {config.role || 'Professional Graphic Designer'}
                  </p>
                  <div className="mt-4 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-white/70 relative z-10">
                    Visual Brand Strategist
                  </div>
                </div>
              )}

              <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>Brand Identity</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-700 font-bold tracking-wide">
                {config.name || 'VIVID PIXELS'}
              </span>
              <span className="text-xs text-[#FF5A1F] font-bold">Creative Design Studio</span>
            </div>
          </div>

          {/* Right Column: Bio & Statistics (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            {/* Bio Card */}
            <div className="light-card p-6 sm:p-8 bg-white shadow-lg shadow-black/5">
              <p className="text-gray-900 font-medium text-base sm:text-lg leading-relaxed mb-4 font-sans">
                {config.aboutBio ||
                  'I am a passionate graphic designer at VIVID PIXELS, transforming ideas into meaningful visual solutions. I specialize in branding, print design, and digital creatives that help businesses grow and stand out.'}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans">
                With a passion for high-impact visual communication, I specialize in crafting distinctive brand identities, print collateral, packaging, and digital marketing assets. Every design is built with strategic intention to help businesses connect, inspire confidence, and grow.
              </p>

              {/* Strengths Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-5 border-t border-gray-100">
                {strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-800 bg-[#F4F4F4] px-3 py-2 rounded-lg border border-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {config.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="light-card p-4 sm:p-5 flex flex-col justify-between group hover:border-[#FF5A1F] transition-all bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 group-hover:bg-[#FF5A1F] transition-colors">
                      {getStatIcon(stat.iconName)}
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};