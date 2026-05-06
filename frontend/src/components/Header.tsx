import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Bell, User } from 'lucide-react';
import logo from '../assets/multibank.jpg';

interface HeaderProps {
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  const { connected } = useSocket();

  return (
    <header className="h-20 border-b border-border/50 bg-surface/30 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center mr-32">
          <img src={logo} alt="MultiBank Group" className="h-20 w-auto object-contain mix-blend-screen scale-[2] origin-left ml-8" />
        </div>
        <div className="h-6 w-px bg-border mx-2"></div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-hover border border-border/50">
          <div className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-success animate-pulse' : 'bg-danger'}`}></div>
          <span className="text-sm font-medium text-text-secondary">
            {connected ? 'Live Market Data' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-full transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="h-8 w-px bg-border mx-2"></div>
        <button 
          onClick={onProfileClick}
          className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-surface-hover border border-border/50 hover:bg-surface transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Sherin Shahana</span>
        </button>
      </div>
    </header>
  );
};
