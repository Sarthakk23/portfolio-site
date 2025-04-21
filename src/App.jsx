import React, { useEffect, useState, useCallback, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Aboutme from './components/Aboutme';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { Element, scroller } from 'react-scroll';
import { AudioProvider } from './components/AudioContext';
import AudioToggle from './components/AudioToggle';
import ChatBot from 'react-chatbot-kit';
import MessageParser from './components/Chatbot/MessageParser';
import ActionProvider from './components/Chatbot/ActionProvider';
import ChatAvatar from './components/Chatbot/ChatAvatar';
import chatbotConfig from './components/Chatbot/chatbotConfig';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h3>Component Failed to Load</h3>
          <button onClick={this.handleRetry}>Retry</button>
          {this.state.error && (
            <details>
              <summary>Error Details</summary>
              <pre>{this.state.error.toString()}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const registerSection = useCallback((id, ref) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    } else {
      delete sectionRefs.current[id];
    }
  }, []);

  return { activeSection, registerSection };
}

function App() {
  const { activeSection, registerSection } = useActiveSection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    
    try {
      AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: 'ease-in-out-quart',
        mirror: true
      });
    } catch (error) {
      console.error('AOS initialization error:', error);
    }

    const hour = new Date().getHours();
    setTheme(hour > 18 || hour < 6 ? 'dark' : 'light');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = useCallback((target) => {
    if (!isMounted) return;

    try {
      const element = document.getElementById(target);
      if (!element) {
        console.warn(`Element with ID ${target} not found`);
        return;
      }

      setActiveSection(target);
      const navbar = document.querySelector('.Navbar-container');
      const navbarHeight = navbar ? navbar.offsetHeight : 70;

      scroller.scrollTo(target, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuint',
        offset: -navbarHeight,
        ignoreCancelEvents: true
      });

      // Fallback
      requestAnimationFrame(() => {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    } catch (error) {
      console.error('Scroll error:', error);
    }
  }, [isMounted]);

  const createActionProvider = useCallback((createChatBotMessage, setState) => {
    return new ActionProvider(createChatBotMessage, setState, {
      scroller,
      setTypingStart: () => setIsTyping(true),
      setTypingEnd: () => setIsTyping(false),
      smoothScroll,
      projectData: []
    });
  }, [smoothScroll]);

  const renderSection = (id, Component) => (
    <ErrorBoundary key={id}>
      <Element 
        name={id}
        id={id}
        ref={(ref) => registerSection(id, ref)}
        className={`section ${id}`}
        style={{ minHeight: '100vh' }}
      >
        <Component />
      </Element>
    </ErrorBoundary>
  );

  if (!isMounted) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <AudioProvider>
      <div className={`app-container theme-${theme}`}>
        <AudioToggle />
        
        <button 
          className="chatbot-toggle" 
          onClick={() => setShowChatbot(!showChatbot)}
          aria-label={showChatbot ? 'Close chatbot' : 'Open chatbot'}
        >
          {showChatbot ? '✕' : '💬'}
        </button>

        {showChatbot && (
          <div className="chatbot-container">
            <ErrorBoundary>
              <ChatAvatar isTyping={isTyping} />
              <ChatBot
                config={chatbotConfig}
                messageParser={MessageParser}
                actionProvider={createActionProvider}
              />
            </ErrorBoundary>
          </div>
        )}

        <Navbar 
          activeSection={activeSection} 
          smoothScroll={smoothScroll} 
          isScrolled={isScrolled}
          isMobile={isMobile}
        />
        
        {renderSection('home', Hero)}
        {renderSection('aboutme', Aboutme)}
        {renderSection('skills', Skills)}
        {renderSection('projects', Projects)}
        
        {isMobile && (
          <div className="mobile-audio-hint">
            Tap the 🔊 icon to control sounds
          </div>
        )}
      </div>
    </AudioProvider>
  );
}

export default App;