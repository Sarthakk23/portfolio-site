export default {
  botName: "Portfolio Guide",
  lang: "en",
  initialMessages: [
    { 
      message: "Hello! I can help you navigate this portfolio. Try asking about projects or skills.",
      widget: 'options'
    }
  ],
  customComponents: {
    header: () => <div className="chatbot-header">Portfolio Assistant</div>,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1e293b",
    },
    chatButton: {
      backgroundColor: "#64b5f6",
    },
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => props.actionProvider.showOptions(),
    },
    {
      widgetName: "projectOptions", 
      widgetFunc: (props) => props.actionProvider.showProjectOptions(),
    }
  ]
};