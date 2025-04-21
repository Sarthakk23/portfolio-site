import './Skills.css';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaNodeJs } from 'react-icons/fa';
import { SiFlutter, SiAdobephotoshop, SiAdobeillustrator, SiAdobexd, SiTailwindcss, SiFigma } from 'react-icons/si';

function Skills() {
  const skills = [
    // Development Skills
    { name: 'JavaScript', icon: <FaJs size={40} />, level: 90 },
    { name: 'React', icon: <FaReact size={40} />, level: 85 },
    { name: 'HTML5', icon: <FaHtml5 size={40} />, level: 95 },
    { name: 'CSS3', icon: <FaCss3Alt size={40} />, level: 90 },
    { name: 'Node.js', icon: <FaNodeJs size={40} />, level: 80 },
    { name: 'Flutter', icon: <SiFlutter size={40} />, level: 75 },
    
    // Design Skills
    { name: 'Photoshop', icon: <SiAdobephotoshop size={40} />, level: 85 },
    { name: 'Illustrator', icon: <SiAdobeillustrator size={40} />, level: 80 },
    { name: 'Adobe XD', icon: <SiAdobexd size={40} />, level: 75 },
    { name: 'Figma', icon: <SiFigma size={40} />, level: 90 },
    
    // Tools
    { name: 'Git', icon: <FaGitAlt size={40} />, level: 85 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} />, level: 80 },
  ];

  return (
    <section id="skills" className="section" data-aos="fade-left" data-aos-delay="200">
      <div className="Skills-container">
        <h2 data-aos="fade-up">My Skills</h2>
        
        <div className="skills-categories">
          {/* Development Skills */}
          <div className="category" data-aos="fade-up">
            <h3>Development</h3>
            <div className="skills-grid">
              {skills.slice(0, 6).map((skill, index) => (
                <SkillCard key={index} skill={skill} delay={index * 100} />
              ))}
            </div>
          </div>

          {/* Design Skills */}
          <div className="category" data-aos="fade-up" data-aos-delay="200">
            <h3>Design</h3>
            <div className="skills-grid">
              {skills.slice(6, 10).map((skill, index) => (
                <SkillCard key={index} skill={skill} delay={index * 100} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="category" data-aos="fade-up" data-aos-delay="400">
            <h3>Tools</h3>
            <div className="skills-grid">
              {skills.slice(10).map((skill, index) => (
                <SkillCard key={index} skill={skill} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Skill Card Component
function SkillCard({ skill, delay }) {
  return (
    <div className="skill-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="skill-icon">{skill.icon}</div>
      <h3>{skill.name}</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <span>{skill.level}%</span>
    </div>
  );
}

export default Skills;