import React from 'react';
import { Star, Quote } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Testimonials: React.FC = () => {
  const { testimonials } = usePortfolio();

  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0A] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#FF6B00] font-heading font-semibold text-xs sm:text-sm tracking-tight uppercase block mb-2">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight leading-none mb-4">
            Trusted by Brands & Founders
          </h2>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
            Hear from business owners and marketing directors who elevated their brands through custom graphic design and visual storytelling.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bento-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#FF6B00]/40 transition-all duration-300 relative"
            >
              <div>
                {/* Rating Stars & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10 group-hover:text-[#FF6B00]/30 transition-colors" />
                </div>

                {/* Feedback */}
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans italic mb-6">
                  "{item.feedback}"
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#FF6B00] transition-colors">
                      {item.clientName}
                    </h4>
                    <p className="text-[11px] text-white/50">
                      {item.role}, <span className="text-white/70">{item.company}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#FF6B00] font-medium">
                    {item.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
