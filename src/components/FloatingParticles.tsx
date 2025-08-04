import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  speed: number;
  direction: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const emojis = ['✨', '🏮', '🐉', '☁️', '🎋', '🎎', '💫', '⭐'];

  useEffect(() => {
    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      speed: Math.random() * 2 + 0.5,
      direction: Math.random() * Math.PI * 2,
    });

    const initialParticles = Array.from({ length: 15 }, (_, i) => createParticle(i));
    setParticles(initialParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + Math.cos(particle.direction) * particle.speed;
        let newY = particle.y + Math.sin(particle.direction) * particle.speed;

        // Wrap around screen edges
        if (newX < -50) newX = window.innerWidth + 50;
        if (newX > window.innerWidth + 50) newX = -50;
        if (newY < -50) newY = window.innerHeight + 50;
        if (newY > window.innerHeight + 50) newY = -50;

        return {
          ...particle,
          x: newX,
          y: newY,
        };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-sparkle opacity-70"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}px`,
            animationDelay: `${particle.id * 0.2}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;