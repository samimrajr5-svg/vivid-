import React, { useState, useMemo } from 'react';
import { Search, Plus, SlidersHorizontal, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioProject } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface PortfolioProps {
  onOpenAdmin: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenAdmin }) => {
  const { projects, selectedProject, setSelectedProject, setSelectedServiceForInquiry } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'ALL',
    'LOGO DESIGN',
    'BRANDING',
    'PACKAGING DESIGN',
    'APPAREL & T-SHIRT',
    'POSTER DESIGN',
    'SOCIAL MEDIA DESIGN',
    'ADVERTISEMENT',
  ];

  const checkCategoryMatch = (projectCategory: string, cat: string) => {
    if (cat === 'ALL') return true;
    const pCat = projectCategory.toUpperCase();
    if (pCat.includes(cat) || cat.includes(pCat)) return true;
    if (
      cat === 'APPAREL & T-SHIRT' &&
      (pCat.includes('APPAREL') || pCat.includes('T-SHIRT') || pCat.includes('SHIRT'))
    )
      return true;
    if (cat === 'POSTER DESIGN' && pCat.includes('POSTER')) return true;
    if (cat === 'LOGO DESIGN' && pCat.includes('LOGO')) return true;
    return false;
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = checkCategoryMatch(project.category, selectedCategory);

      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="relative py-20 md:py-28 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#FF6B00] font-heading font-semibold text-xs sm:text-sm tracking-tight uppercase block mb-2">
            PORTFOLIO
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight leading-none mb-4">
            Recent Creative Work
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans">
            A curated showcase of branding systems, logos, packaging, advertising campaigns and print designs created with vector perfection.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto py-1 max-w-full">
            {categories.map((cat) => {
              const count =
                cat === 'ALL'
                  ? projects.length
                  : projects.filter((p) => checkCategoryMatch(p.category, cat)).length;

              if (count === 0 && cat !== 'ALL') return null;

              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FF6B00] text-black shadow-lg shadow-[#FF6B00]/30 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-black/30 text-black font-bold' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Manage */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
            </div>

            <button
              onClick={onOpenAdmin}
              title="Add or edit projects in CMS"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white/80 hover:text-white font-medium transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="hidden sm:inline">Add / Edit</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bento-card overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-[#FF6B00]/50 transition-all duration-300"
              >
                {/* Image Container with aspect ratio */}
                <div className="relative w-full aspect-[16/10] bg-[#161616] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-[#FF6B00] text-black text-[9px] font-extrabold uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Hover Floating Arrow */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#FF6B00] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6B00] block mb-1">
                      {project.subcategory || 'Graphic Case Study'}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF6B00] transition-colors line-clamp-1 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-xs line-clamp-2 leading-relaxed font-sans mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tools list */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[9px] px-1.5 py-0.5 text-white/40">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bento-card p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#FF6B00]">
              <FolderGit2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              No Projects Found
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mb-6 leading-relaxed">
              {searchQuery
                ? `No projects matched "${searchQuery}". Try a different keyword or reset filters.`
                : 'No projects in this category yet. You can add your own projects via the CMS dashboard.'}
            </p>
            <div className="flex justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={onOpenAdmin}
                className="px-5 py-2 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Add Project in CMS
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectService={(service) => setSelectedServiceForInquiry(service)}
      />
    </section>
  );
};
