import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: 'transparent' },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ['connect', 'grab', 'bubble'],
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
            onDiv: {
              elementId: 'aboutme',
              enable: true,
              mode: 'bounce',
              type: 'rectangle'
            }
          },
          modes: {
            connect: {
              distance: 100,
              links: {
                opacity: 0.5
              },
              radius: 150
            },
            grab: {
              distance: 150,
              links: {
                blink: true,
                consent: true,
                opacity: 0.3
              }
            },
            bubble: {
              distance: 200,
              size: 15,
              duration: 0.5,
              opacity: 0.8
            },
            push: {
              quantity: 3
            }
          }
        },
        particles: {
          color: { value: '#a9e5ff' },
          links: {
            color: '#64b5f6',
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              color: '#a9e5ff',
              opacity: 0.1
            }
          },
          move: {
            direction: 'none',
            enable: true,
            speed: 1.5,
            outModes: 'bounce',
            trail: {
              enable: true,
              length: 10,
              fillColor: '#0f172a'
            }
          },
          number: {
            density: { enable: true, area: 800 },
            value: 60
          },
          opacity: { value: { min: 0.1, max: 0.5 } },
          shape: { 
            type: 'circle',
            options: {
              polygon: {
                sides: 5
              }
            }
          },
          size: { 
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 3,
              sync: true
            }
          }
        },
        detectRetina: true,
        motion: {
          reduce: {
            factor: 3,
            value: true
          }
        }
      }}
    />
  );
}