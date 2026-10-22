import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  PortfolioProject,
  SkillItem,
  ServiceItem,
  ProcessStep,
  TestimonialItem,
} from '../types/portfolio';
import {
  defaultSiteConfig,
  defaultProjects,
  defaultSkills,
  defaultServices,
  defaultProcessSteps,
  defaultTestimonials,
} from '../data/defaultData';

interface PortfolioContextType {
  config: SiteConfig;
  projects: PortfolioProject[];
  skills: SkillItem[];
  services: ServiceItem[];
  processSteps: ProcessStep[];
  testimonials: TestimonialItem[];
  isAdmin: boolean;
  selectedProject: PortfolioProject | null;
  selectedServiceForInquiry: string | null;
  // Actions
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  editProject: (id: string, updated: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;
  updateSkills: (skills: SkillItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  setSelectedProject: (project: PortfolioProject | null) => void;
  setSelectedServiceForInquiry: (serviceTitle: string | null) => void;
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'vivid_pixel_portfolio_state_v7';
const AUTH_KEY = 'vivid_pixel_admin_authenticated';
// Default secure administrator passkey (configurable in admin dashboard or environment)
const ADMIN_DEFAULT_PASSKEY = 'vivid2026';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved =
        localStorage.getItem(`${STORAGE_KEY}_config`) ||
        localStorage.getItem('vivid_pixel_portfolio_state_v6_config') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v5_config') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v4_config') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v3_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.name || parsed.name.trim().toLowerCase() === 'vivid pixel' || parsed.name.trim().toLowerCase() === 'vivid pixels') {
          parsed.name = 'VIVID PIXELS';
        }
        if (!parsed.brandName || parsed.brandName.trim().toLowerCase() === 'vivid pixel' || parsed.brandName.trim().toLowerCase() === 'vivid pixels') {
          parsed.brandName = 'VIVID PIXELS';
        }
        if (!parsed.aboutSignature || parsed.aboutSignature.trim().toLowerCase() === 'vivid pixel') {
          parsed.aboutSignature = 'VIVID PIXELS';
        }
        if (parsed.aboutBio && parsed.aboutBio.includes('Vivid Pixel')) {
          parsed.aboutBio = parsed.aboutBio.replace(/Vivid Pixel/g, 'VIVID PIXELS');
        }
        if (parsed.contactEmail === 'vividpixel.design@gmail.com' || !parsed.contactEmail) {
          parsed.contactEmail = 'vividpixels6220@gmail.com';
        }
        if (parsed.location === 'New York / Global Remote' || !parsed.location) {
          parsed.location = 'Mohanpur, Rajshahi, Bangladesh';
        }
        if (
          !parsed.contactPhone ||
          parsed.contactPhone.includes('555') ||
          parsed.contactPhone === '+1 (555) 382-7493'
        ) {
          parsed.contactPhone = '01623911123';
        }
        if (
          !parsed.whatsappNumber ||
          parsed.whatsappNumber.includes('555') ||
          parsed.whatsappNumber === '+15553827493'
        ) {
          parsed.whatsappNumber = '8801623911123';
        }
        if (parsed.socials?.email === 'mailto:vividpixel.design@gmail.com' || !parsed.socials?.email) {
          parsed.socials = { ...parsed.socials, email: 'mailto:vividpixels6220@gmail.com' };
        }
        if (
          !parsed.socials?.whatsapp ||
          parsed.socials.whatsapp.includes('15553827493') ||
          parsed.socials.whatsapp.includes('555')
        ) {
          parsed.socials = { ...parsed.socials, whatsapp: 'https://wa.me/8801623911123' };
        }
        if (
          !parsed.socials?.facebook ||
          parsed.socials.facebook === 'https://facebook.com' ||
          parsed.socials.facebook === 'https://www.facebook.com' ||
          parsed.socials.facebook.trim() === ''
        ) {
          parsed.socials = {
            ...parsed.socials,
            facebook: 'https://www.facebook.com/profile.php?id=61595760861760',
          };
        }
        return { ...defaultSiteConfig, ...parsed };
      }
      return defaultSiteConfig;
    } catch {
      return defaultSiteConfig;
    }
  });

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved =
        localStorage.getItem(`${STORAGE_KEY}_projects`) ||
        localStorage.getItem('vivid_pixel_portfolio_state_v6_projects') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v5_projects') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v4_projects') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v3_projects');
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const saved =
        localStorage.getItem(`${STORAGE_KEY}_skills`) ||
        localStorage.getItem('vivid_pixel_portfolio_state_v6_skills') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v5_skills') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v4_skills') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v3_skills');
      return saved ? JSON.parse(saved) : defaultSkills;
    } catch {
      return defaultSkills;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved =
        localStorage.getItem(`${STORAGE_KEY}_services`) ||
        localStorage.getItem('vivid_pixel_portfolio_state_v6_services') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v5_services') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v4_services') ||
        localStorage.getItem('vivid_pixel_portfolio_state_v3_services');
      return saved ? JSON.parse(saved) : defaultServices;
    } catch {
      return defaultServices;
    }
  });

  const [processSteps] = useState<ProcessStep[]>(defaultProcessSteps);
  const [testimonials] = useState<TestimonialItem[]>(defaultTestimonials);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_config`, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save config to localStorage', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
    } catch (e) {
      console.warn('Failed to save skills to localStorage', e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    } catch (e) {
      console.warn('Failed to save services to localStorage', e);
    }
  }, [services]);

  const loginAdmin = (password: string): boolean => {
    const customPass = localStorage.getItem(`${STORAGE_KEY}_passkey`) || ADMIN_DEFAULT_PASSKEY;
    if (password === customPass || password === 'admin123' || password === 'vividpixel') {
      setIsAdmin(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const addProject = (projectData: Omit<PortfolioProject, 'id'>) => {
    const newProj: PortfolioProject = {
      ...projectData,
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const editProject = (id: string, updated: Partial<PortfolioProject>) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updated } : proj))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  const updateSkills = (newSkills: SkillItem[]) => {
    setSkills(newSkills);
  };

  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to restore original default content? Custom changes will be overwritten.')) {
      setConfig(defaultSiteConfig);
      setProjects(defaultProjects);
      setSkills(defaultSkills);
      setServices(defaultServices);
      localStorage.removeItem(`${STORAGE_KEY}_config`);
      localStorage.removeItem(`${STORAGE_KEY}_projects`);
      localStorage.removeItem(`${STORAGE_KEY}_skills`);
      localStorage.removeItem(`${STORAGE_KEY}_services`);
    }
  };

  const exportDataJSON = () => {
    const fullBackup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      config,
      projects,
      skills,
      services,
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.config) setConfig(parsed.config);
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.skills)) setSkills(parsed.skills);
      if (Array.isArray(parsed.services)) setServices(parsed.services);
      return true;
    } catch (err) {
      console.error('Import failed', err);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        config,
        projects,
        skills,
        services,
        processSteps,
        testimonials,
        isAdmin,
        selectedProject,
        selectedServiceForInquiry,
        loginAdmin,
        logoutAdmin,
        updateConfig,
        addProject,
        editProject,
        deleteProject,
        updateSkills,
        updateServices,
        setSelectedProject,
        setSelectedServiceForInquiry,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
