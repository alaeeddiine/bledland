import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ['home', 'story', 'drop', 'cities', 'newsletter'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    closeMenu();
  };

  return (
    <>
      <nav className={`navbar-urban ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container-urban">
          {/* Logo */}
          <a href="#hero" className="logo-urban" onClick={() => handleNavClick('home')}>
            <span className="logo-text">BLEDLAND</span>
            <span className="logo-underline"></span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-links-urban">
            {[
              { id: 'hero', label: 'HOME' },
              { id: 'story', label: 'OUR STORY' },
              { id: 'drop', label: 'FIRST DROP' },
              { id: 'cities', label: 'CITIES' },
              { id: 'newsletter', label: 'NEWSLETTER' }
            ].map((item) => (
              <li key={item.id} className="nav-item-urban">
                <a 
                  href={`#${item.id}`}
                  className={`nav-link-urban ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                  <span className="nav-underline"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className={`burger-menu-urban ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay-urban ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content-urban">
            <div className="mobile-menu-header-urban">
              <span className="mobile-menu-title">NAVIGATION</span>
              <div className="mobile-menu-accent"></div>
            </div>
            
            <ul className="mobile-nav-links-urban">
              {[
                { id: 'hero', label: 'HOME', number: '00' },
                { id: 'story', label: 'OUR STORY', number: '01' },
                { id: 'drop', label: 'FIRST DROP', number: '02' },
                { id: 'cities', label: 'CITIES', number: '03' },
                { id: 'newsletter', label: 'NEWSLETTER', number: '04' }
              ].map((item) => (
                <li key={item.id} className="mobile-nav-item-urban">
                  <a 
                    href={`#${item.id}`}
                    className={`mobile-nav-link-urban ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="nav-number">{item.number}</span>
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-menu-footer-urban">
              <div className="mobile-menu-stats-urban">
                <div className="mobile-stat">
                  <span className="stat-number">15K+</span>
                  <span className="stat-label">WAITLIST</span>
                </div>
                <div className="mobile-stat">
                  <span className="stat-number">5</span>
                  <span className="stat-label">CITIES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className="menu-backdrop-urban" onClick={closeMenu}></div>
      )}
    </>
  );
};

export default Navbar;