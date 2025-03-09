
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface TransitionProps {
  show?: boolean;
  appear?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'fade' | 'fade-up' | 'slide-in-right' | 'blur-in';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
}

const Transition: React.FC<TransitionProps> = ({
  show = true,
  appear = false,
  children,
  className,
  type = 'fade',
  delay = 0,
  duration = 500,
}) => {
  const [isVisible, setIsVisible] = useState(appear);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, delay]);

  const getAnimationClass = () => {
    switch (type) {
      case 'fade':
        return 'animate-fade-in';
      case 'fade-up':
        return 'animate-fade-up';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'blur-in':
        return 'animate-blur-in';
      default:
        return 'animate-fade-in';
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-out`,
    animationDuration: `${duration}ms`,
    animationFillMode: 'forwards' as const,
  };

  if (!isVisible && !show) {
    return null;
  }

  return (
    <div 
      className={cn(
        isVisible ? getAnimationClass() : 'opacity-0',
        className
      )} 
      style={style}
    >
      {children}
    </div>
  );
};

export default Transition;
