import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CompetitiveProgramming from './components/CompetitiveProgramming';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAuthModal from './components/admin/AdminAuthModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

function PortfolioMain() {
  const { setAdminSecret } = usePortfolio();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const token =
        localStorage.getItem('portfolio_admin_auth') ||
        sessionStorage.getItem('portfolio_admin_auth');
      return Boolean(token);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const checkAdminRoute = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase();
      if (pathname === '/creatoradmin' || hash === '#creatoradmin') {
        setIsAdminOpen(true);
      } else {
        setIsAdminOpen(false);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const hash = window.location.hash.toLowerCase();
    if (pathname === '/creatoradmin' || hash === '#creatoradmin') {
      window.history.pushState('', document.title, '/');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    handleCloseAdmin();
  };

  const handleAuthenticated = (token) => {
    setIsAuthenticated(true);
    setAdminSecret(token);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* Background Interactive Canvas */}
      <BackgroundParticles />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CompetitiveProgramming />
        <Achievements />
        <Leadership />
        <Contact />
      </main>

      {/* Futuristic Cyber Footer */}
      <Footer />

      {/* Creator Admin Protection Gateway & Cockpit */}
      {isAdminOpen && (
        isAuthenticated ? (
          <AdminDashboard onClose={handleCloseAdmin} onLogout={handleLogout} />
        ) : (
          <AdminAuthModal
            onAuthenticated={handleAuthenticated}
            onCancel={handleCloseAdmin}
          />
        )
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
