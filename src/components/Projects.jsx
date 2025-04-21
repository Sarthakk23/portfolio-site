import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Projects.css';
// Import local images
import FitnessThumbnail from '../assets/projects/fitness/thumbnail.webp';
import FitnessSS1 from '../assets/projects/fitness/screenshot1.webp';
import FitnessSS2 from '../assets/projects/fitness/screenshot2.webp';
import FitnessSS3 from '../assets/projects/fitness/screenshot3.webp';
import AQIThumbnail from '../assets/projects/aqi/thumbnail.webp';
import AQISS1 from '../assets/projects/aqi/screenshot1.webp';
import AQISS2 from '../assets/projects/aqi/screenshot2.webp';
import AngryBirdThumbnail from '../assets/projects/angrybird/thumbnail.webp';
import AngryBirdSS1 from '../assets/projects/angrybird/screenshot1.webp';
import AngryBirdSS2 from '../assets/projects/angrybird/screenshot2.webp';
import AngryBirdSS3 from '../assets/projects/angrybird/screenshot3.webp';
import SmartParkingThumbnail from '../assets/projects/smartparking/thumbnail.webp';
import SmartParkingSS1 from '../assets/projects/smartparking/screenshot1.webp';
import SmartParkingSS2 from '../assets/projects/smartparking/screenshot2.webp';
import SmartParkingSS3 from '../assets/projects/smartparking/screenshot3.webp';
import QuanticaThumbnail from '../assets/projects/quantica/thumbnail.webp';
import QuanticaSS1 from '../assets/projects/quantica/screenshot1.webp';
import QuanticaSS2 from '../assets/projects/quantica/screenshot2.webp';
import QuanticaSS3 from '../assets/projects/quantica/screenshot3.webp';

const projects = [
  {
    title: "Fitness Activity Logger",
    description: "Track workouts and health metrics with data visualization",
    tags: ["Flutter", "Firebase", "Ollama", "Google-Fit"],
    thumbnail: FitnessThumbnail,
    screenshots: [FitnessSS1, FitnessSS2, FitnessSS3],
    links: {
      github: "#"
    }
  },
  {
    title: "AQI Predictor",
    description: "Machine learning model for air quality forecasting",
    tags: ["Python", "Seabourn", "Matplotib", "Numpy"],
    thumbnail: AQIThumbnail,
    screenshots: [AQISS1, AQISS2],
    links: {
      github: "#"
    }
  },
  {
    title: "Angry Bird Clone",
    description: "Physics-based game with custom level design",
    tags: ["LibGDX", "Java", "Game Design", "Box2D"],
    thumbnail: AngryBirdThumbnail,
    screenshots: [AngryBirdSS1, AngryBirdSS2, AngryBirdSS3],
    links: {
      github: "#"
    }
  },
  {
    title: "Smart Parking System",
    description: "Parking space detection and reservation system",
    tags: ["IoT", "React", "MySQL", "StreamLite"],
    thumbnail: SmartParkingThumbnail,
    screenshots: [SmartParkingSS1, SmartParkingSS2, SmartParkingSS3],
    links: {
      github: "#"
    }
  },
  {
    title: "Quantica",
    description: "Quantum computing simulation toolkit",
    tags: ["Adobe Illustrator", "Adobe Express", "Adobe Photoshop"],
    thumbnail: QuanticaThumbnail,
    screenshots: [QuanticaSS1, QuanticaSS2, QuanticaSS3],
    links: {
      github: "#"
    }
  }
];

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: true,
      once: false,
      mirror: true,
      duration: 800,
      easing: 'ease-in-out-quart'
    });
    AOS.refresh();
  }, []);

  return (
    <section id="projects" className="section" data-aos="fade" data-aos-once="false">
      <div className="Projects-container">
        <h2 data-aos="fade-down" data-aos-delay="100" data-aos-once="false">
          My Projects
        </h2>
        
        <div className="projects-grid" data-aos="fade-up" data-aos-delay="200" data-aos-once="false">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-thumbnail"
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              data-aos="zoom-in"
              data-aos-delay={300 + (index * 100)}
              data-aos-once="false"
            >
              <img src={project.thumbnail} alt={project.title} loading="lazy" />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags-mini">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="project-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="project-collage"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 data-aos="fade-down" data-aos-once="false">{selectedProject.title}</h3>
                <p className="project-description" data-aos="fade-right" data-aos-delay="100" data-aos-once="false">
                  {selectedProject.description}
                </p>
                
                <div className="screenshots-grid">
                  {selectedProject.screenshots.map((screenshot, i) => (
                    <motion.img
                      key={i}
                      src={screenshot}
                      alt={`Screenshot ${i+1}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      data-aos="zoom-in"
                      data-aos-delay={200 + (i * 100)}
                      data-aos-once="false"
                    />
                  ))}
                </div>
                
                <div className="project-meta" data-aos="fade-up" data-aos-delay="300" data-aos-once="false">
                  <div className="project-tags">
                    {selectedProject.tags.map((tag, i) => (
                      <span key={i} data-aos="flip-left" data-aos-delay={400 + (i * 50)} data-aos-once="false">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {/* Removed the View Code link while keeping the container */}
                  </div>
                </div>
                
                <button 
                  className="close-btn"
                  onClick={() => setSelectedProject(null)}
                  data-aos="fade-up" data-aos-delay="700" data-aos-once="false"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects;