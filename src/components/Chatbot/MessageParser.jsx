export default class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCase = message.toLowerCase();
    
    if (this.isNavigationCommand(lowerCase)) {
      this.handleNavigation(lowerCase);
    } 
    else if (this.isProjectQuery(lowerCase)) {
      this.handleProjectQuery(lowerCase);
    }
    else {
      this.actionProvider.handleDefault(message);
    }
  }

  isNavigationCommand = (message) => {
    const navKeywords = ['go to', 'show', 'view', 'navigate', 'take me'];
    const sections = ['home', 'about', 'skills', 'project'];
    return navKeywords.some(kw => message.includes(kw)) && 
           sections.some(sec => message.includes(sec));
  };

  isProjectQuery = (message) => {
    return /(project|proj|item|#)\s*\d+|first|second|third|last/i.test(message);
  };

  handleNavigation(message) {
    let section;
    if (message.includes('home')) section = 'home';
    else if (message.includes('about')) section = 'about';
    else if (message.includes('skill')) section = 'skills';
    else if (message.includes('project')) section = 'projects';
    
    if (section) this.actionProvider.navigateTo(section);
  }

  handleProjectQuery(message) {
    const numMatch = message.match(/\d+/);
    const projectNumber = numMatch ? numMatch[0] : 
                        message.includes('first') ? '1' :
                        message.includes('second') ? '2' :
                        message.includes('third') ? '3' :
                        message.includes('last') ? this.actionProvider.projectData.length.toString() : '1';
    
    this.actionProvider.handleProjectQuery(projectNumber);
  }
}