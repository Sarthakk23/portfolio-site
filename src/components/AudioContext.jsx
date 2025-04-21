import { createContext, useState, useEffect, useRef } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.2); // Default 20% volume
  const ambientRef = useRef(null);
  const audioEnabled = useRef(false);

  // Initialize audio system
  useEffect(() => {
    ambientRef.current = new Audio('/sounds/ambient.mp3');
    ambientRef.current.loop = true;
    ambientRef.current.volume = muted ? 0 : volume;

    // Enable audio on first user interaction
    const enableAudio = () => {
      if (!audioEnabled.current) {
        audioEnabled.current = true;
        ambientRef.current.play().catch(e => console.error("Audio play failed:", e));
        document.removeEventListener('click', enableAudio);
      }
    };

    document.addEventListener('click', enableAudio);
    
    return () => {
      ambientRef.current.pause();
      document.removeEventListener('click', enableAudio);
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const playSound = (name) => {
    if (audioEnabled.current && !muted) {
      const sound = new Audio(`/sounds/${name}.mp3`);
      sound.volume = name === 'click' ? 0.5 * volume : 0.3 * volume;
      sound.play().catch(e => console.error("Sound play failed:", e));
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
    if (newVolume > 0 && muted) {
      setMuted(false);
    }
  };

  return (
    <AudioContext.Provider value={{
      muted,
      toggleMute,
      playSound,
      volume,
      setVolume: handleVolumeChange,
      audioEnabled: audioEnabled.current
    }}>
      {children}
    </AudioContext.Provider>
  );
};