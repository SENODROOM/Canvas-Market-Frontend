import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const neuralLines = useRef([]);
  const headerRef = useRef(null);

  const setNeuralLineRef = (el, index) => {
    neuralLines.current[index] = el;
  };

  useEffect(() => {
    // Scroll handling for header, active links, and parallax shapes
    const handleScroll = () => {
      if (!headerRef.current) return;

      // Header scroll effect
      if (window.pageYOffset > 50) headerRef.current.classList.add('scrolled');
      else headerRef.current.classList.remove('scrolled');

      // Active menu highlighting
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
      let currentSection = '';
      const scrollPos = window.pageYOffset + 100;
      sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active');
      });

      // Parallax shapes
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${window.pageYOffset * speed}px) rotate(${window.pageYOffset * 0.1}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    // Neural lines pulse effect
    const neuralInterval = setInterval(() => {
      neuralLines.current.forEach((line, index) => {
        setTimeout(() => {
          if (!line) return;
          line.style.opacity = '1';
          line.style.transform = 'scaleX(1.2)';
          setTimeout(() => {
            line.style.opacity = '0.2';
            line.style.transform = 'scaleX(0.5)';
          }, 200);
        }, index * 300);
      });
    }, 2000);

    // Quantum particle generation
    const createQuantumParticle = () => {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      const size = Math.random() * 4 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      const colors = ['#00ffff', '#ff0080', '#8000ff'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '100vh';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '-1';
      particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
      document.body.appendChild(particle);

      const duration = Math.random() * 3000 + 2000;
      const drift = (Math.random() - 0.5) * 200;

      particle.animate(
        [
          { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
          { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 },
        ],
        { duration, easing: 'ease-out' }
      ).onfinish = () => particle.remove();
    };
    const particleInterval = setInterval(createQuantumParticle, 1500);

    // Intersection Observer for timeline and hexagon animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.timeline-content, .hexagon').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
      clearInterval(neuralInterval);
      clearInterval(particleInterval);
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const btn = e.currentTarget;
    btn.innerHTML = 'TRANSMITTING...';
    btn.style.background = 'linear-gradient(45deg, #8000ff, #00ffff)';
    setTimeout(() => {
      btn.innerHTML = 'TRANSMISSION COMPLETE';
      btn.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
      setTimeout(() => {
        btn.innerHTML = 'TRANSMIT TO MATRIX';
        btn.style.background = 'linear-gradient(45deg, #00ffff, #ff0080)';
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <header className="glass" ref={headerRef}>
        <nav>

          <Link to="/" className="logo">
            <svg className="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: ' #4da6ff' }} />
                  <stop offset="50%" style={{ stopColor: '#1a75ff' }} />
                  <stop offset="100%" style={{ stopColor: 'rgb(0, 120, 255)' }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="30" r="8" fill="url(#logoGradient)" style={{ opacity: 0.8 }}>
                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="30" cy="60" r="6" fill="url(#logoGradient)" style={{ opacity: 0.6 }}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="65" r="7" fill="url(#logoGradient)" style={{ opacity: 0.7 }}>
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <line x1="50" y1="30" x2="30" y2="60" stroke="url(#logoGradient)" strokeWidth="2" style={{ opacity: 0.6 }}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="30" x2="70" y2="65" stroke="url(#logoGradient)" strokeWidth="2" style={{ opacity: 0.6 }}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
              </line>
              <line x1="30" y1="60" x2="70" y2="65" stroke="url(#logoGradient)" strokeWidth="2" style={{ opacity: 0.6 }}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
              </line>
            </svg>
            CANVAS MARKET
          </Link>

          <ul className="nav-links">
            <li><Link to="/about" className="li-link">About</Link></li>
            <li><Link to="/contact" className="li-link">Contact</Link></li>
            <li><Link to="/advertise" className="li-link">Advertise on AU</Link></li>
            <li> <Link to="/Sell" className='li-link'>Sell Paintings</Link></li>
            <li><Link to="/Get" className='li-link'>Get Paintings</Link></li>
          </ul>

          {/* Mobile menu toggle */}
          <div
            className={`mobile-menu-toggle ${menuActive ? 'active' : ''}`}
            onClick={() => setMenuActive(!menuActive)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </nav>

        {/* Mobile navigation */}
        <div className={`mobile-nav ${menuActive ? 'active' : ''}`}>
          <Link to="/about" className="li-link" onClick={() => setMenuActive(false)}>About</Link>
          <Link to="/contact" className="li-link" onClick={() => setMenuActive(false)}>Contact</Link>
          <Link to="/advertise" className="li-link" onClick={() => setMenuActive(false)}>Advertise on AU</Link>
          <Link to="/Sell" className='li-link' onClick={() => setMenuActive(false)}>Sell Paintings</Link>
          <Link to="/Get" className='li-link' onClick={() => setMenuActive(false)}>Get Paintings</Link>

        </div>
      </header>
    </>
  );
}

export default Header;
