import React from 'react';
import { X, ExternalLink, Calendar, User, Tag, Sparkles, CheckCircle2 } from 'lucide-react';
import { PortfolioProject } from '../types/portfolio';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelectService }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#141414] border border-white/15 rounded-2xl overflow-hidden shadow-2xl my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#FF6B00] hover:text-black transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Hero Image */}
        <div className="relative w-full min-h-[300px] max-h-[520px] bg-[#0c0c0c] flex items-center justify-center overflow-hidden p-2">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full max-h-[500px] object-contain rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF6B00] text-black shadow-lg">
              {project.category}
            </span>
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 bg-black/70 hover:bg-white/20 border border-white/20 rounded-full text-xs text-white transition-colors"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF6B00]" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Title */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold block mb-1">
              {project.subcategory}
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              {project.title}
            </h2>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/10 text-xs">
            <div className="flex items-center gap-2 text-white/70">
              <User className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase text-white/40">Client</span>
                <span className="font-semibold text-white">{project.client || 'Confidential'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase text-white/40">Year</span>
                <span className="font-semibold text-white">{project.year || '2024'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Tag className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase text-white/40">Category</span>
                <span className="font-semibold text-white">{project.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Sparkles className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <div>
                <span className="block text-[10px] uppercase text-white/40">Format</span>
                <span className="font-semibold text-white uppercase">{project.aspectRatio || 'Vector / CMYK'}</span>
              </div>
            </div>
          </div>

          {/* Description & Full Story */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-base text-white">Project Overview</h3>
            <p className="text-white/80 text-sm leading-relaxed font-sans">
              {project.fullStory || project.description}
            </p>
          </div>

          {/* Color Palette Swatches */}
          {project.colorPalette && project.colorPalette.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-2">
                Brand Color Palette
              </span>
              <div className="flex items-center gap-2">
                {project.colorPalette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/20 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    <span className="text-[10px] font-mono text-white/50 uppercase">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables & Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {project.deliverables && project.deliverables.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-2.5">
                  Package Deliverables
                </span>
                <div className="space-y-2">
                  {project.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-2.5">
                Tools & Software Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/80 font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50 font-sans">
              Need a similar creative project for your brand?
            </span>
            <button
              onClick={() => {
                onClose();
                if (onSelectService) onSelectService(project.category);
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#ff7a1a] text-black px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FF6B00]/25 cursor-pointer"
            >
              Order Similar Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
