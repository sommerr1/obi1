import React from 'react';
import { X, MoreHorizontal, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  title: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, title, showBack = false }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden shadow-2xl relative border-x border-gray-100">
      {/* Instagram Webview Style Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-50 pt-[env(safe-area-inset-top,12px)]">
        <div className="w-10 flex items-center">
          {showBack ? (
            <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
          ) : (
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
              <X size={24} className="text-gray-900" />
            </button>
          )}
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Appointment</span>
          <h1 className="text-sm font-bold text-gray-900 truncate max-w-[180px] text-center">{title}</h1>
        </div>

        <div className="w-10 flex items-center justify-end">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
            <MoreHorizontal size={24} className="text-gray-900" />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-white">
        {children}
      </main>
      
      {/* Mobile Indicator Bar (Visual only) */}
      <div className="h-1 w-16 bg-gray-200 rounded-full mx-auto my-2 shrink-0 hidden md:block" />
    </div>
  );
};

export default Layout;