import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  personalInfo as initialPersonal,
  skillsData as initialSkills,
  experienceData as initialExperience,
  projectsData as initialProjects,
  competitiveProgrammingData as initialCP,
  achievementsData as initialAchievements,
  leadershipData as initialLeadership
} from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'naveen_portfolio_config_v1';
const ADMIN_SECRET_KEY = 'portfolio_admin_secret';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [adminSecret, setAdminSecretState] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_SECRET_KEY) || '';
    } catch {
      return '';
    }
  });

  const setAdminSecret = (secret) => {
    setAdminSecretState(secret);
    try {
      if (secret) {
        localStorage.setItem(ADMIN_SECRET_KEY, secret);
      } else {
        localStorage.removeItem(ADMIN_SECRET_KEY);
      }
    } catch {}
  };

  const [personalInfo, setPersonalInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_personal`);
      return saved ? JSON.parse(saved) : initialPersonal;
    } catch {
      return initialPersonal;
    }
  });

  const [skillsData, setSkillsData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skills`);
      return saved ? JSON.parse(saved) : initialSkills;
    } catch {
      return initialSkills;
    }
  });

  const [experienceData, setExperienceData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_experience`);
      return saved ? JSON.parse(saved) : initialExperience;
    } catch {
      return initialExperience;
    }
  });

  const [projectsData, setProjectsData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects`);
      if (!saved) return initialProjects;
      const parsed = JSON.parse(saved);
      return parsed.map((p, idx) => {
        const init = initialProjects[idx] || {};
        const demoVal =
          p.demo && p.demo !== '#' && p.demo.trim() !== ''
            ? p.demo
            : init.demo && init.demo !== '#'
            ? init.demo
            : p.github || 'https://github.com/NAVEENKUMAR12-R';
        return {
          ...p,
          demo: demoVal
        };
      });
    } catch {
      return initialProjects;
    }
  });

  const [competitiveProgrammingData, setCompetitiveProgrammingData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_cp`);
      return saved ? JSON.parse(saved) : initialCP;
    } catch {
      return initialCP;
    }
  });

  const [achievementsData, setAchievementsData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_achievements`);
      return saved ? JSON.parse(saved) : initialAchievements;
    } catch {
      return initialAchievements;
    }
  });

  const [leadershipData, setLeadershipData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_leadership`);
      return saved ? JSON.parse(saved) : initialLeadership;
    } catch {
      return initialLeadership;
    }
  });

  // Cloud Database Status
  const [cloudStatus, setCloudStatus] = useState('connecting'); // 'connecting' | 'connected' | 'offline' | 'error'
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  // Fetch portfolio data from MongoDB on initial mount
  const refreshFromCloud = useCallback(async () => {
    try {
      await Promise.resolve();
      setIsSyncing(true);
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const {
            personalInfo: cPersonal,
            skillsData: cSkills,
            experienceData: cExp,
            projectsData: cProj,
            competitiveProgrammingData: cCp,
            achievementsData: cAch,
            leadershipData: cLead,
            lastUpdated
          } = json.data;

          if (cPersonal) setPersonalInfo(cPersonal);
          if (cSkills) setSkillsData(cSkills);
          if (cExp) setExperienceData(cExp);
          if (cProj) setProjectsData(cProj);
          if (cCp) setCompetitiveProgrammingData(cCp);
          if (cAch) setAchievementsData(cAch);
          if (cLead) setLeadershipData(cLead);

          setCloudStatus(json.source === 'mongodb' ? 'connected' : 'offline');
          setLastSyncedAt(lastUpdated || new Date().toISOString());
        } else {
          setCloudStatus('offline');
        }
      } else {
        setCloudStatus('offline');
      }
    } catch (err) {
      console.warn('Portfolio Cloud Sync Notice:', err.message);
      setCloudStatus('offline');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshFromCloud();
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshFromCloud]);

  // Persist on change to localStorage (offline cache)
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_personal`, JSON.stringify(personalInfo));
    } catch {}
  }, [personalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_skills`, JSON.stringify(skillsData));
    } catch {}
  }, [skillsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_experience`, JSON.stringify(experienceData));
    } catch {}
  }, [experienceData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_projects`, JSON.stringify(projectsData));
    } catch {}
  }, [projectsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_cp`, JSON.stringify(competitiveProgrammingData));
    } catch {}
  }, [competitiveProgrammingData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_achievements`, JSON.stringify(achievementsData));
    } catch {}
  }, [achievementsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_leadership`, JSON.stringify(leadershipData));
    } catch {}
  }, [leadershipData]);

  // Persist theme and update HTML element
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch {}
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  /**
   * Saves a single section directly to MongoDB Atlas and updates local state.
   */
  const saveSectionToCloud = async (sectionName, data) => {
    setIsSyncing(true);
    // Optimistic local state update
    if (sectionName === 'personalInfo') setPersonalInfo(data);
    else if (sectionName === 'skillsData') setSkillsData(data);
    else if (sectionName === 'experienceData') setExperienceData(data);
    else if (sectionName === 'projectsData') setProjectsData(data);
    else if (sectionName === 'competitiveProgrammingData') setCompetitiveProgrammingData(data);
    else if (sectionName === 'achievementsData') setAchievementsData(data);
    else if (sectionName === 'leadershipData') setLeadershipData(data);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (adminSecret) {
        headers['x-admin-secret'] = adminSecret;
      }

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          section: sectionName,
          data,
          adminSecret
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setCloudStatus('connected');
        setLastSyncedAt(new Date().toISOString());
        return { success: true, message: 'Saved to MongoDB Atlas successfully!' };
      } else {
        if (res.status === 401) {
          return { success: false, message: 'Unauthorized: Invalid Admin Secret key.' };
        }
        return {
          success: false,
          message: json.message || 'Saved locally (MongoDB connection unavailable)'
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Saved locally in cache (Could not reach MongoDB: ' + err.message + ')'
      };
    } finally {
      setIsSyncing(false);
    }
  };

  /**
   * Saves the entire portfolio configuration directly to MongoDB Atlas.
   */
  const saveFullConfigToCloud = async (config) => {
    setIsSyncing(true);
    if (config.personalInfo) setPersonalInfo(config.personalInfo);
    if (config.skillsData) setSkillsData(config.skillsData);
    if (config.experienceData) setExperienceData(config.experienceData);
    if (config.projectsData) setProjectsData(config.projectsData);
    if (config.competitiveProgrammingData) setCompetitiveProgrammingData(config.competitiveProgrammingData);
    if (config.achievementsData) setAchievementsData(config.achievementsData);
    if (config.leadershipData) setLeadershipData(config.leadershipData);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (adminSecret) {
        headers['x-admin-secret'] = adminSecret;
      }

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fullConfig: config,
          adminSecret
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setCloudStatus('connected');
        setLastSyncedAt(new Date().toISOString());
        return { success: true, message: 'Entire portfolio saved to MongoDB Atlas!' };
      } else {
        return { success: false, message: json.message || 'Error saving to MongoDB' };
      }
    } catch (err) {
      return { success: false, message: 'Error: ' + err.message };
    } finally {
      setIsSyncing(false);
    }
  };

  const resetToDefaults = () => {
    setPersonalInfo(initialPersonal);
    setSkillsData(initialSkills);
    setExperienceData(initialExperience);
    setProjectsData(initialProjects);
    setCompetitiveProgrammingData(initialCP);
    setAchievementsData(initialAchievements);
    setLeadershipData(initialLeadership);
    try {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_personal`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_skills`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_experience`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_projects`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_cp`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_achievements`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_leadership`);
    } catch {}
  };

  const importFullConfig = (config) => {
    if (config.personalInfo) setPersonalInfo(config.personalInfo);
    if (config.skillsData) setSkillsData(config.skillsData);
    if (config.experienceData) setExperienceData(config.experienceData);
    if (config.projectsData) setProjectsData(config.projectsData);
    if (config.competitiveProgrammingData) setCompetitiveProgrammingData(config.competitiveProgrammingData);
    if (config.achievementsData) setAchievementsData(config.achievementsData);
    if (config.leadershipData) setLeadershipData(config.leadershipData);
  };

  const getFullConfig = () => ({
    personalInfo,
    skillsData,
    experienceData,
    projectsData,
    competitiveProgrammingData,
    achievementsData,
    leadershipData
  });

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        personalInfo,
        setPersonalInfo,
        skillsData,
        setSkillsData,
        experienceData,
        setExperienceData,
        projectsData,
        setProjectsData,
        competitiveProgrammingData,
        setCompetitiveProgrammingData,
        achievementsData,
        setAchievementsData,
        leadershipData,
        setLeadershipData,
        resetToDefaults,
        importFullConfig,
        getFullConfig,
        // MongoDB Cloud Persistence API
        cloudStatus,
        isSyncing,
        lastSyncedAt,
        adminSecret,
        setAdminSecret,
        saveSectionToCloud,
        saveFullConfigToCloud,
        refreshFromCloud
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
