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
    console.error('Chatbot Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="chatbot-error">
          <h4>Chatbot Service Interruption</h4>
          <p>We're experiencing technical difficulties.</p>
          {this.state.error && (
            <details className="error-details">
              <summary>Error Details</summary>
              <pre>{this.state.error.toString()}</pre>
            </details>
          )}
          <button onClick={this.handleRetry} className="retry-button">
            Reconnect Chatbot
          </button>
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
        rootMargin: '-20% 0px -60% 0px', // Adjust these values as needed
        threshold: 0.1
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = useCallback((id, ref) => {
    sectionRefs.current[id] = ref;
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

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    AOS.init({ 
      duration: 800, 
      once: false, 
      offset: 100, 
      easing: 'ease-in-out-quart',
      mirror: true
    });
    
    const hour = new Date().getHours();
    setTheme(hour > 18 || hour < 6 ? 'dark' : 'light');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = useCallback((target) => {
    setActiveSection(target);
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuint',
      offset: -70,
      ignoreCancelEvents: true
    });
  }, []);

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
    <Element name={id}>
      <div 
        id={id}
        ref={(ref) => registerSection(id, ref)}
        className={`section ${id}`}
        style={{ minHeight: '100vh' }}
      >
        <Component />
      </div>
    </Element>
  );

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