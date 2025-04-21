import React, { useState, useEffect } from 'react';
import './Chatbot.css';

export default function ChatAvatar({ isTyping }) {
  const [expression, setExpression] = useState('neutral');

  useEffect(() => {
    if (isTyping) {
      setExpression('thinking');
      const timer = setTimeout(() => setExpression('talking'), 1000);
      return () => clearTimeout(timer);
    } else {
      setExpression('neutral');
    }
  }, [isTyping]);

  return (
    <div className="avatar-container">
      <div className={`avatar-face ${expression}`}>
        <div className="eyes">
          <div className="eye"></div>
          <div className="eye"></div>
        </div>
        <div className="mouth"></div>
      </div>
    </div>
  );
}