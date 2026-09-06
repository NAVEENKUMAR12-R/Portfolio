import React, { createContext, useContext, useState, useEffect } from 'react';
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
        const demoVal = p.demo && p.demo !== '#' && p.demo.trim() !== ''
          ? p.demo
          : (init.demo && init.demo !== '#' ? init.demo : p.github || 'https://github.com/NAVEENKUMAR12-R');
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

  // Persist on change
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
        getFullConfig
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
