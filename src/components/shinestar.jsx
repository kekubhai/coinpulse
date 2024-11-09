/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const StarrySky = ({
  numStars = 100,
  starSizeRange = [1, 3],
  animationDuration = 3,
  animationDelayRange = [0, 3],
  className = 'starry-sky',
  style = {},
}) => {
  const [stars, setStars] = useState([true]);  // Initialize with an empty array

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * animationDelayRange[1]}s`,
          size: Math.random() * (starSizeRange[1] - starSizeRange[0]) + starSizeRange[0],
        });
      }
      setStars(newStars);  // Correctly set the stars state
    };
    generateStars();
  }, [numStars, starSizeRange, animationDelayRange]);  // Dependencies array

  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0,
            animationDelay: star.animationDelay,
            animationDuration: `${animationDuration}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-twinkle {
          animation: twinkle infinite;
        }
      `}</style>
    </div>
  );
};

export default StarrySky;