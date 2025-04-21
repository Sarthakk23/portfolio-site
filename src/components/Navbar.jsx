import { useContext } from 'react';
import { AudioContext } from './AudioContext';
import './Navbar.css';

function Navbar({ activeSection, smoothScroll, isScrolled, isMobile }) {
  const { playSound } = useContext(AudioContext);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'aboutme', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ];

  const handleNavClick = (id) => {
    playSound('click');
    smoothScroll(id);
  };

  return (
    <nav className={`Navbar-container ${isScrolled ? 'scrolled' : ''} ${isMobile ? 'mobile' : ''}`}>
      {links.map((link) => (
        <button
          key={link.id}
          className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
          onClick={() => handleNavClick(link.id)}
          onMouseEnter={() => playSound('hover')}
          data-target={link.id}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;