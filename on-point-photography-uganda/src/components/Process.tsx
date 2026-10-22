import React from 'react';
import { Search, Compass, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Process: React.FC = () => {
  const { processSteps } = usePortfolio();

  const getStepIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#FF6B00]' };
    switch (iconName) {
      case 'Search':
        return <Search {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'PenTool':
        return <PenTool {...props} />;
      case 'CheckCircle':
        return <CheckCircle {...props} />;
      default:
        return <CheckCircle {...props} />;
    }
  };

  return (
    <section id="process" className="relative py-20 md:py-28 bg-[#0D0D0D] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#FF6B00] font-heading font-semibold text-xs sm:text-sm tracking-tight uppercase block mb-2">
            WORKFLOW & EXECUTION
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight leading-none mb-4">
            How I Bring Ideas to Life
          </h2>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
            A battle-tested 4-step creative design process engineered to deliver clarity, efficiency, and timeless visual identity.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="bento-card p-6 flex flex-col justify-between group hover:border-[#FF6B00]/40 transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-black transition-colors">
                    {getStepIcon(step.iconName)}
                  </div>
                  <span className="font-heading font-black text-3xl text-white/15 group-hover:text-[#FF6B00]/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF6B00] transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-white/60 text-xs leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <span>Phase {idx + 1} of 4</span>
                <span className="text-[#FF6B00]">Step {step.step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
