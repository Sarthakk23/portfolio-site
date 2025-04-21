import { useCallback, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Aboutme.css';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: 'transparent' },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'connect'
            },
          },
        },
        particles: {
          color: { value: '#a9e5ff' },
          links: {
            color: '#64b5f6',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1
          },
          move: {
            direction: 'none',
            enable: true,
            speed: 1.5,
            outModes: 'bounce'
          },
          number: {
            density: { enable: true, area: 800 },
            value: 50
          },
          opacity: { value: { min: 0.1, max: 0.5 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }}
    />
  );
};

function Aboutme() {
  useEffect(() => {
    // Initialize AOS with settings that allow re-animation
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: true,
      once: false, // Crucial: Allows re-animation
      mirror: true,
      duration: 800,
      easing: 'ease-in-out-quart'
    });

    // Refresh AOS when the component mounts/updates
    AOS.refresh();
  }, []);

  return (
    <section id="aboutme" className="about-section">
      <ParticlesBackground />
      <div 
        className="about-content-container"
        data-aos="fade-up"
        data-aos-once="false" // Allows re-animation
      >
        <h2 
          className="about-title"
          data-aos="zoom-in"
          data-aos-delay="100"
          data-aos-once="false"
        >
          <span className="title-gradient">About Me</span>
        </h2>
        
        <div className="about-text-content">
          <p 
            className="intro-text"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-once="false"
          >
            Hey there! I'm a Frontend Developer, part-time Designer, and Content Creator.
          </p>
          
          <p 
            className="passion-text"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-once="false"
          >
            I love creating beautiful web apps, designing smart products, and learning new tech every day.
          </p>
          
          <div 
            className="experience-card"
            data-aos="flip-up"
            data-aos-delay="400"
            data-aos-once="false"
          >
            <p 
              className="experience-item"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-once="false"
            >
              I've worked on diverse projects like an AQI data analysis for IBM, a smart pet feeder design, 
              and a food ordering system in Java.
            </p>
            <p 
              className="experience-item"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-once="false"
            >
              Currently exploring AI integration into fitness tracking apps and accessible communication tools.
            </p>
          </div>
          
          <p 
            className="closing-text"
            data-aos="zoom-out"
            data-aos-delay="700"
            data-aos-once="false"
          >
            Excited to build more ideas into reality!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Aboutme;