
import React from 'react';
import Transition from './Transition';
import { Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 lg:py-8">
      <div className="container">
        <Transition type="fade" delay={100}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue rounded-md p-1.5">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-medium tracking-tight">ColdCraft</h1>
            </div>
            <div className="flex items-center">
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-surface-foreground/70">
                BETA
              </span>
            </div>
          </div>
        </Transition>
        
        <Transition type="fade-up" delay={200}>
          <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Write Perfect Cold Emails with AI
            </h2>
            <p className="mt-4 md:mt-6 text-lg text-surface-foreground/70 max-w-2xl mx-auto">
              Generate personalized, compelling cold emails in seconds. Powered by advanced AI to help you connect with prospects effectively.
            </p>
          </div>
        </Transition>
      </div>
    </header>
  );
};

export default Header;
