import React from 'react';
import {
  Compass,
  Layers,
  FileText,
  Maximize2,
  FileMinus,
  BookOpen,
  Share2,
  CreditCard,
  Youtube,
  Target,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Services: React.FC = () => {
  const { services, setSelectedServiceForInquiry } = usePortfolio();

  const getServiceIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#FF6B00]' };
    switch (iconName) {
      case 'Compass':
        return <Compass {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'Maximize2':
        return <Maximize2 {...props} />;
      case 'FileMinus':
        return <FileMinus {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Share2':
        return <Share2 {...props} />;
      case 'CreditCard':
        return <CreditCard {...props} />;
      case 'Youtube':
        return <Youtube {...props} />;
      case 'Target':
        return <Target {...props} />;
      case 'Printer':
        return <Printer {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const handleRequestService = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[#0D0D0D] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[#FF6B00] font-heading font-semibold text-xs sm:text-sm tracking-tight uppercase block mb-2">
              WHAT I DO
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              Design Services & Solutions
            </h2>
          </div>
          <p className="text-white/60 text-xs sm:text-sm max-w-md mt-4 md:mt-0 font-sans">
            End-to-end design solutions crafted with strategic visual communication, optical precision, and commercial-grade deliverables.
          </p>
        </div>

        {/* Services Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bento-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#FF6B00]/50 transition-all duration-300 relative"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-[#FF6B00] text-black text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-md shadow-[#FF6B00]/25">
                  Popular
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#FF6B00]/20 transition-all duration-300">
                  {getServiceIcon(service.iconName)}
                </div>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#FF6B00] transition-colors mb-2.5">
                  {service.title}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans mb-5">
                  {service.shortDesc}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-2">
                    Key Deliverables:
                  </span>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tools Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleRequestService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#FF6B00] hover:text-black border border-white/10 hover:border-transparent text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
