import { useContext, useState, useEffect, useRef } from 'react';
import { AudioContext } from './AudioContext';

const AudioToggle = () => {
  const { muted, toggleMute, volume, setVolume } = useContext(AudioContext);
  const [showVolume, setShowVolume] = useState(false);
  const timeoutRef = useRef(null);

  const handleToggle = () => {
    toggleMute();
    setShowVolume(true);
    resetTimeout();
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    resetTimeout();
  };

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowVolume(false);
    }, 3000); // Hide after 3 seconds of inactivity
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`audio-controls ${showVolume ? 'show-volume' : ''}`}>
      <button 
        className="audio-toggle"
        onClick={handleToggle}
        aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {muted ? '🔇' : volume > 0.5 ? '🔊' : '🔈'}
      </button>
      
      <div className="volume-container">
        <span className="volume-icon">
          {volume <= 0 ? '🔇' : volume < 0.3 ? '🔈' : '🔊'}
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume control"
        />
      </div>
    </div>
  );
};

export default AudioToggle;