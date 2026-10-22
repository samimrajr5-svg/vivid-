import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  FolderGit2,
  Share2,
  User,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioProject } from '../../types/portfolio';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    config,
    projects,
    skills,
    services,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    updateConfig,
    addProject,
    editProject,
    deleteProject,
    updateSkills,
    updateServices,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'contact' | 'projects' | 'services' | 'backup'>('profile');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form states for profile / contact editing
  const [profileForm, setProfileForm] = useState(config);

  useEffect(() => {
    if (isOpen) {
      setProfileForm(config);
    }
  }, [isOpen, config]);

  // Form state for adding/editing project
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Logo Design',
    subcategory: '',
    description: '',
    fullStory: '',
    image: '',
    tools: 'Adobe Illustrator, Photoshop',
    client: '',
    year: '2024',
    featured: false,
    aspectRatio: 'landscape' as 'landscape' | 'portrait' | 'square',
    deliverables: 'Vector Logo Suite, Brand Guidelines',
    colorPalette: '#FF6B00, #0A0A0A, #FFFFFF',
    projectLink: '',
  });

  if (!isOpen) return null;

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(passwordInput);
    if (success) {
      setPasswordInput('');
      setProfileForm(config);
      showNotification('Authenticated as Administrator.');
    } else {
      setLoginError('Invalid administrator passkey. Please check password and try again.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(profileForm);
    showNotification('Brand & profile information saved successfully!');
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'profile' | 'project') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (PNG, JPG, SVG, WebP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'profile') {
        setProfileForm((prev) => ({ ...prev, profileImage: result }));
        updateConfig({ profileImage: result });
        showNotification('Profile photo updated!');
      } else {
        setProjectForm((prev) => ({ ...prev, image: result }));
        showNotification('Project image uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectForm.title.trim()) {
      showNotification('Project title is required.', 'error');
      return;
    }

    const toolsArr = projectForm.tools
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const deliverablesArr = projectForm.deliverables
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const paletteArr = projectForm.colorPalette
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const fallbackImg =
      projectForm.image ||
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';

    if (editingProject) {
      editProject(editingProject.id, {
        title: projectForm.title,
        category: projectForm.category,
        subcategory: projectForm.subcategory,
        description: projectForm.description,
        fullStory: projectForm.fullStory,
        image: fallbackImg,
        tools: toolsArr,
        client: projectForm.client,
        year: projectForm.year,
        featured: projectForm.featured,
        aspectRatio: projectForm.aspectRatio,
        deliverables: deliverablesArr,
        colorPalette: paletteArr,
        projectLink: projectForm.projectLink,
      });
      showNotification(`Updated project "${projectForm.title}"`);
    } else {
      addProject({
        title: projectForm.title,
        category: projectForm.category,
        subcategory: projectForm.subcategory || 'Graphic Case Study',
        description: projectForm.description,
        fullStory: projectForm.fullStory || projectForm.description,
        image: fallbackImg,
        tools: toolsArr.length ? toolsArr : ['Illustrator', 'Photoshop'],
        client: projectForm.client || 'Creative Client',
        year: projectForm.year || '2024',
        featured: projectForm.featured,
        aspectRatio: projectForm.aspectRatio,
        deliverables: deliverablesArr,
        colorPalette: paletteArr,
        projectLink: projectForm.projectLink,
      });
      showNotification(`Added new project "${projectForm.title}"`);
    }

    setEditingProject(null);
    setIsAddingProject(false);
  };

  const handleStartEditProject = (proj: PortfolioProject) => {
    setEditingProject(proj);
    setIsAddingProject(true);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      subcategory: proj.subcategory || '',
      description: proj.description,
      fullStory: proj.fullStory || '',
      image: proj.image,
      tools: proj.tools.join(', '),
      client: proj.client,
      year: proj.year,
      featured: !!proj.featured,
      aspectRatio: proj.aspectRatio || 'landscape',
      deliverables: (proj.deliverables || []).join(', '),
      colorPalette: (proj.colorPalette || []).join(', '),
      projectLink: proj.projectLink || '',
    });
  };

  const handleStartAddProject = () => {
    setEditingProject(null);
    setIsAddingProject(true);
    setProjectForm({
      title: '',
      category: 'Logo Design',
      subcategory: 'Brand Mark & Vectors',
      description: '',
      fullStory: '',
      image: '',
      tools: 'Adobe Illustrator, Photoshop',
      client: '',
      year: '2024',
      featured: false,
      aspectRatio: 'landscape',
      deliverables: 'Primary Logo, Vector Source Files, High-Res PNG',
      colorPalette: '#FF6B00, #141414, #FFFFFF',
      projectLink: '',
    });
  };

  const handleExport = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vivid-pixel-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Portfolio data exported successfully!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const ok = importDataJSON(text);
      if (ok) {
        showNotification('Data imported successfully! The site has been updated.');
        setProfileForm(config);
      } else {
        showNotification('Invalid JSON file format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in text-white">
      <div className="relative w-full max-w-5xl bg-[#111111] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] text-black flex items-center justify-center font-bold">
              VP
            </div>
            <div>
              <h2 className="font-heading font-bold text-base sm:text-lg text-white flex items-center gap-2">
                {config.brandName || 'VIVID PIXELS'} CMS
                {isAdmin && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-medium">
                    Authenticated
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-white/50">Content Management & Live Customizer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Logout admin session"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 transition-all ${
              statusMessage.type === 'error'
                ? 'bg-rose-500/20 text-rose-300 border-b border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30'
            }`}
          >
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Main Content Area */}
        {!isAdmin ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-5">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-white mb-2">
              Administrator Login
            </h3>
            <p className="text-xs text-white/60 mb-6 leading-relaxed font-sans">
              Enter your admin passkey to edit brand information, customize contact details, and manage portfolio projects.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter administrator passkey..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1C1C1C] border border-white/15 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B00] transition-colors"
                  autoFocus
                />
                {loginError && (
                  <p className="text-[11px] text-rose-400 text-left mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{loginError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#FF6B00]/25 cursor-pointer"
              >
                Access Admin Dashboard
              </button>

              <p className="text-[11px] text-white/40 pt-2 font-mono">
                Default demo passkey: <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded">vivid2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Tab navigation */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-[#141414] overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'profile'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Brand & Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'contact'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Contact & Socials</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'projects'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Portfolio Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'services'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Skills & Services</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === 'backup'
                    ? 'border-[#FF6B00] text-[#FF6B00]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Backup & Data</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: Brand & Profile */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Brand Name *
                      </label>
                      <input
                        type="text"
                        value={profileForm.brandName}
                        onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Display Name / Signature
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={profileForm.role}
                        onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Location / Timezone
                      </label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      Hero Tagline
                    </label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      About Headline
                    </label>
                    <input
                      type="text"
                      value={profileForm.aboutHeadline}
                      onChange={(e) => setProfileForm({ ...profileForm, aboutHeadline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      About Bio / Creative Philosophy
                    </label>
                    <textarea
                      rows={4}
                      value={profileForm.aboutBio}
                      onChange={(e) => setProfileForm({ ...profileForm, aboutBio: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00] resize-none"
                    />
                  </div>

                  {/* Profile Photo / Brand Asset */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-black border border-white/15 overflow-hidden flex items-center justify-center shrink-0">
                      {profileForm.profileImage ? (
                        <img src={profileForm.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-white/40" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="text-xs font-bold text-white block">Profile Photo or Brand Emblem</span>
                      <p className="text-[11px] text-white/50">Upload your headshot or custom logo mark (PNG, JPG, SVG)</p>
                      <div className="flex flex-wrap gap-2">
                        <label className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageFileUpload(e, 'profile')}
                          />
                        </label>
                        {profileForm.profileImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfileForm({ ...profileForm, profileImage: '' });
                              updateConfig({ profileImage: '' });
                            }}
                            className="px-3 py-1.5 bg-rose-500/10 text-rose-300 rounded-lg text-xs font-semibold hover:bg-rose-500/20"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF6B00]/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Brand Profile</span>
                  </button>
                </form>
              )}

              {/* TAB 2: Contact & Socials */}
              {activeTab === 'contact' && (
                <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 8801623911123 or +8801623911123"
                        value={profileForm.whatsappNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                      <span className="text-[10px] text-white/40 mt-1 block">
                        Used for one-click direct WhatsApp chat links throughout website.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Contact Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 01623911123 or +880 1623-911123"
                        value={profileForm.contactPhone}
                        onChange={(e) => setProfileForm({ ...profileForm, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      Direct Email Address *
                    </label>
                    <input
                      type="email"
                      value={profileForm.contactEmail}
                      onChange={(e) => setProfileForm({ ...profileForm, contactEmail: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                    <span className="text-[10px] text-white/40 mt-1 block">
                      Direct mailto: and inquiry links update automatically.
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                      Social & Portfolio Profiles
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/60 mb-1">Facebook Page / Profile URL</label>
                        <input
                          type="text"
                          placeholder="https://www.facebook.com/..."
                          value={profileForm.socials.facebook || ''}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, facebook: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/60 mb-1">Behance Profile URL</label>
                        <input
                          type="text"
                          value={profileForm.socials.behance}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, behance: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/60 mb-1">Dribbble Profile URL</label>
                        <input
                          type="text"
                          value={profileForm.socials.dribbble}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, dribbble: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/60 mb-1">LinkedIn Profile URL</label>
                        <input
                          type="text"
                          value={profileForm.socials.linkedin}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, linkedin: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-white/60 mb-1">Instagram Profile URL</label>
                        <input
                          type="text"
                          value={profileForm.socials.instagram}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, instagram: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF6B00]/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </form>
              )}

              {/* TAB 3: Portfolio Projects CRUD */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Top action bar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        Portfolio Projects ({projects.length})
                      </h3>
                      <p className="text-xs text-white/50">
                        Add, replace images, edit project titles, or delete items.
                      </p>
                    </div>

                    {!isAddingProject && (
                      <button
                        onClick={handleStartAddProject}
                        className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/20 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project</span>
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Project Form */}
                  {isAddingProject && (
                    <div className="p-6 bg-[#161616] border border-white/15 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h4 className="font-heading font-bold text-base text-white">
                          {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
                        </h4>
                        <button
                          onClick={() => {
                            setIsAddingProject(false);
                            setEditingProject(null);
                          }}
                          className="text-xs text-white/50 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveProject} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                              Project Title *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Apex Coffee & Tea Branding"
                              value={projectForm.title}
                              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                              Category *
                            </label>
                            <select
                              value={projectForm.category}
                              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            >
                              <option value="Logo Design">Logo Design</option>
                              <option value="Branding">Branding</option>
                              <option value="Packaging Design">Packaging Design</option>
                              <option value="Apparel & T-Shirt">Apparel & T-Shirt</option>
                              <option value="Poster Design">Poster Design</option>
                              <option value="Social Media Design">Social Media Design</option>
                              <option value="Print Design">Print Design</option>
                              <option value="Advertisement">Advertisement</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                              Subcategory Tag
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Organic Brand Identity"
                              value={projectForm.subcategory}
                              onChange={(e) => setProjectForm({ ...projectForm, subcategory: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                              Client Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Apex Labs"
                              value={projectForm.client}
                              onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">Year</label>
                            <input
                              type="text"
                              placeholder="2024"
                              value={projectForm.year}
                              onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>
                        </div>

                        {/* Project Image & Upload */}
                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                            Project Image URL or Upload File *
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="https://... or upload below"
                              value={projectForm.image}
                              onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                              className="flex-1 px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                            <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                              <Upload className="w-3.5 h-3.5 text-[#FF6B00]" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageFileUpload(e, 'project')}
                              />
                            </label>
                          </div>
                          {projectForm.image && (
                            <div className="mt-2 w-36 h-24 rounded-lg overflow-hidden border border-white/20">
                              <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                            Short Summary Description *
                          </label>
                          <textarea
                            rows={2}
                            required
                            placeholder="Brief description for portfolio grid card..."
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00] resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                            Full Case Study / Story (Modal View)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Detailed story, design challenges, and creative solutions..."
                            value={projectForm.fullStory}
                            onChange={(e) => setProjectForm({ ...projectForm, fullStory: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00] resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                              Tools Used (comma separated)
                            </label>
                            <input
                              type="text"
                              placeholder="Adobe Illustrator, Photoshop, InDesign"
                              value={projectForm.tools}
                              onChange={(e) => setProjectForm({ ...projectForm, tools: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                              Deliverables (comma separated)
                            </label>
                            <input
                              type="text"
                              placeholder="Vector Logo, Brand Book, Icon Set"
                              value={projectForm.deliverables}
                              onChange={(e) => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                              className="w-full px-3.5 py-2 bg-[#202020] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                            <input
                              type="checkbox"
                              checked={projectForm.featured}
                              onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                              className="w-4 h-4 rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                            />
                            <span>Feature in Hero & Top Showcase</span>
                          </label>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingProject(false);
                              setEditingProject(null);
                            }}
                            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF6B00]/20 cursor-pointer"
                          >
                            {editingProject ? 'Save Changes' : 'Create Project'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Project List Table */}
                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#141414]">
                    <div className="divide-y divide-white/10">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15">
                              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h5 className="font-heading font-bold text-sm text-white line-clamp-1">
                                {proj.title}
                              </h5>
                              <div className="flex items-center gap-2 text-[10px] text-white/50 mt-0.5">
                                <span className="text-[#FF6B00]">{proj.category}</span>
                                <span>•</span>
                                <span>{proj.client || 'Client Project'}</span>
                                {proj.featured && (
                                  <>
                                    <span>•</span>
                                    <span className="text-amber-400 font-bold">Featured</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleStartEditProject(proj)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                              title="Edit project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete project "${proj.title}"?`)) {
                                  deleteProject(proj.id);
                                  showNotification(`Deleted "${proj.title}"`);
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Skills & Services */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">
                      Skills & Services Configuration
                    </h3>
                    <p className="text-xs text-white/50">
                      Fine-tune proficiency levels and service offerings.
                    </p>
                  </div>

                  {/* Skills tuning */}
                  <div className="p-5 bg-[#161616] border border-white/10 rounded-2xl space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] block">
                      Core Skills Proficiency (%)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills.map((skill, idx) => (
                        <div key={skill.name} className="p-3 bg-white/5 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{skill.name}</span>
                            <span className="font-mono text-[#FF6B00]">{skill.level}%</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={skill.level}
                            onChange={(e) => {
                              const updated = [...skills];
                              updated[idx].level = parseInt(e.target.value);
                              updateSkills(updated);
                            }}
                            className="w-full accent-[#FF6B00] cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services listing */}
                  <div className="p-5 bg-[#161616] border border-white/10 rounded-2xl space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] block">
                      Services Suite ({services.length} items)
                    </span>
                    <div className="space-y-2">
                      {services.map((srv, idx) => (
                        <div
                          key={srv.id}
                          className="p-3 bg-white/5 rounded-xl flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <span className="font-bold text-white">{srv.title}</span>
                            <p className="text-[11px] text-white/50 line-clamp-1">{srv.shortDesc}</p>
                          </div>
                          <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              checked={!!srv.popular}
                              onChange={(e) => {
                                const updated = [...services];
                                updated[idx].popular = e.target.checked;
                                updateServices(updated);
                                showNotification(`Updated "${srv.title}" popular flag`);
                              }}
                              className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                            />
                            <span className="text-[10px] text-white/70">Popular Tag</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Backup & Data Management */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">
                      Data Backup & Restoration
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-sans">
                      All your edits are stored persistently in browser storage. You can export a JSON backup file to save your changes or restore them anytime.
                    </p>
                  </div>

                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">Export Full Portfolio Data</h4>
                        <p className="text-xs text-white/50">Downloads a .json file containing projects, profile, and settings.</p>
                      </div>
                      <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#FF6B00]/20"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export JSON</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">Import JSON Backup</h4>
                        <p className="text-xs text-white/50">Restore previously saved projects and configuration from a file.</p>
                      </div>
                      <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-4 h-4 text-[#FF6B00]" />
                        <span>Import File</span>
                        <input type="file" accept=".json" className="hidden" onChange={handleImportFile} />
                      </label>
                    </div>
                  </div>

                  <div className="p-5 bg-rose-500/10 border border-rose-500/25 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-rose-300">Reset to Default Data</h4>
                      <p className="text-xs text-rose-200/70">Restores all original reference portfolio samples and defaults.</p>
                    </div>
                    <button
                      onClick={() => {
                        resetToDefaults();
                        showNotification('Reset to defaults complete.');
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
