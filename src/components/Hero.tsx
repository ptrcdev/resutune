
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      style={{ 
        '--mouse-x': '0.5', 
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(59, 130, 246, 0.15), transparent 40%)',
            transition: 'all 0.2s ease',
          }}
        ></div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/30 dark:bg-blue-900/10 rounded-full filter blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-100/20 dark:bg-blue-900/10 rounded-full filter blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
      
      <div 
        className="text-center max-w-4xl mx-auto space-y-6 animate-fade-up"
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
      >
        <div className="inline-block">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
            AI-Powered Resume Analysis
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="block">Elevate Your Resume With</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-primary">
            Professional AI Feedback
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Get instant, actionable feedback on your resume. Improve your chances of landing interviews with our detailed analysis and personalized recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a 
            href="#upload" 
            className={cn(
              "px-8 py-3 rounded-full font-medium transition-all text-white",
              "bg-gradient-to-r from-blue-600 to-primary hover:shadow-lg hover:shadow-blue-500/20",
              "transform hover:-translate-y-0.5 duration-200 ease-out"
            )}
          >
            Analyze Your Resume
          </a>
          <a 
            href="#how-it-works" 
            className="px-8 py-3 rounded-full font-medium bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all transform hover:-translate-y-0.5 duration-200 ease-out"
          >
            Learn How It Works
          </a>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <a href="#upload" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
