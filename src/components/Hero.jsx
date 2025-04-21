import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import SubtitleAnimation from './SubtitleAnimation';
import './Hero.css';
import AOS from 'aos';

function Hero() {
  useEffect(() => {
    // Initialize AOS with new settings when component mounts
    AOS.init({
      disable: false,
      startEvent: 'load',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: true,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 800,
      easing: 'ease',
      once: false, // Changed to false to allow replay
      mirror: true,
      anchorPlacement: 'top-bottom',
    });

    // Refresh AOS when scrolling back to the section
    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="hero-container"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-once="false" // Explicitly set to allow replay
    >
      <h2 
        className="hero-title" 
        data-aos="fade-up" 
        data-aos-delay="200"
        data-aos-once="false"
      >
        Hello{' '}
        <span className="typewriter-text">
          <Typewriter
            options={{
              strings: ['Folks', 'TAs', 'Engineers', 'Recruiters'],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              pauseFor: 1500,
            }}
          />
        </span>
      </h2>

      <h3
        className="name-subtitle"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-once="false"
      >
        I am Sarthak Juyal
      </h3>

      <div 
        data-aos="fade-up" 
        data-aos-delay="600"
        data-aos-once="false"
      >
        <SubtitleAnimation />
      </div>
    </section>
  );
}

export default Hero;