import { useState, useEffect } from 'react';

interface AnimatedDragonProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AnimatedDragon = ({ size = 'medium', className = '' }: AnimatedDragonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const sizeClasses = {
    small: 'text-4xl',
    medium: 'text-6xl',
    large: 'text-8xl'
  };

  useEffect(() => {
    const animateDragon = () => {
      setPosition({
        x: Math.sin(Date.now() * 0.001) * 50,
        y: Math.cos(Date.now() * 0.0007) * 30,
      });
    };

    const interval = setInterval(animateDragon, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div
      className={`absolute ${sizeClasses[size]} transition-all duration-300 ${className} ${
        isVisible ? 'opacity-100' : 'opacity-70'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        filter: 'drop-shadow(0 0 20px rgba(212, 0, 42, 0.6))',
      }}
    >
      <div className="animate-dragon-fly">
        🐉
      </div>
    </div>
  );
};

export default AnimatedDragon;