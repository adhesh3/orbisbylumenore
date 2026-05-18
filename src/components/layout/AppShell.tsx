import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { AskMePanel } from '@/components/askme/AskMePanel';
import { Sparkles } from 'lucide-react';
import { useApp } from '@/app/AppContext';

function FloatingAskMe() {
  const { setAskMeOpen } = useApp();
  return (
    <button
      onClick={() => setAskMeOpen(true)}
      aria-label="Open AskMe"
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-gradient-to-br from-gold to-gold-300 text-navy-800 shadow-pop flex items-center justify-center hover:scale-105 transition-transform"
    >
      <Sparkles size={20} />
    </button>
  );
}

export function AppShell() {
  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="px-5 lg:px-8 py-6 lg:py-8 max-w-[1500px] mx-auto">
          <Outlet />
        </main>
      </div>
      <FloatingAskMe />
      <AskMePanel />
    </div>
  );
}
