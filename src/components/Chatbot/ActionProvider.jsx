export default class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, props) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.scroller = props.scroller;
    this.setTypingStart = props.setTypingStart || (() => {});
    this.setTypingEnd = props.setTypingEnd || (() => {});
    this.smoothScroll = props.smoothScroll;
    this.projectData = props.projectData || [];
    this.greet();
  }

  greet = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
    this.addMessageToState(
      this.createChatBotMessage(`Good ${greeting}! How can I help you today?`, 
      { widget: 'options' })
    );
  };

  handleDefault = (message) => {
    this.addMessageToState(
      this.createChatBotMessage(
        `I understand you asked about "${message}". I can help with:\n` +
        '• Navigating sections (Home, About, Skills, Projects)\n' +
        '• Showing project details ("Project 1")\n' +
        '• Explaining my skills',
        { widget: 'options' }
      )
    );
  };

  navigateTo = (section) => {
    const sectionMap = { home: 'home', about: 'aboutme', skills: 'skills', projects: 'projects' };
    const target = sectionMap[section] || 'home';
    
    this.addMessageToState(
      this.createChatBotMessage(`Taking you to ${section} section...`)
    );
    
    setTimeout(() => {
      this.smoothScroll(target);
      if (target === 'projects') this.showProjectOptions();
    }, 800);
  };

  handleProjectQuery = (projectNumber) => {
    const projectIndex = parseInt(projectNumber) - 1;
    const project = this.projectData[projectIndex];
    
    if (project) {
      this.addMessageToState(
        this.createChatBotMessage(
          `Project ${projectNumber}: ${project.title}\n\n` +
          `${project.description}\n\n` +
          `Technologies: ${project.tags.join(', ')}`
        )
      );
    } else {
      this.addMessageToState(
        this.createChatBotMessage(
          `I couldn't find project ${projectNumber}. ` +
          `I have ${this.projectData.length} projects available.`
        )
      );
    }
  };

  showProjectOptions = () => {
    this.addMessageToState(
      this.createChatBotMessage(
        `Which project interests you? (1-${this.projectData.length})`,
        { widget: 'projectOptions' }
      )
    );
  };

  addMessageToState = (message) => {
    this.setTypingStart();
    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      typing: false
    }));
    this.setTypingEnd();
  };
}