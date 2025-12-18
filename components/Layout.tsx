
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
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden shadow-xl ring-1 ring-gray-100">
      {/* Instagram Webview Style Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          {showBack ? (
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Booking Service</span>
          <h1 className="text-sm font-semibold truncate max-w-[150px]">{title}</h1>
        </div>

        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
        {children}
      </main>
    </div>
  );
};

export default Layout;
