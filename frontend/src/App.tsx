import { useState, useEffect } from 'react';
import { SocketProvider, useSocket } from './context/SocketContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Chart } from './components/Chart';
import { Stats } from './components/Stats';

import { Profile } from './components/Profile';

const DashboardContent = () => {
  const [activeTicker, setActiveTicker] = useState<string>('AAPL');
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');
  const { tickers, history, fetchHistory } = useSocket();

  // If AAPL isn't available yet, but others are, select the first one
  useEffect(() => {
    const availableTickers = Object.keys(tickers);
    if (availableTickers.length > 0 && !tickers[activeTicker]) {
      setActiveTicker(availableTickers[0]);
    }
  }, [tickers, activeTicker]);

  // Fetch history when active ticker changes
  useEffect(() => {
    if (activeTicker && !history[activeTicker]) {
      fetchHistory(activeTicker);
    }
  }, [activeTicker, fetchHistory, history]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-text-primary">
      {currentView === 'dashboard' && (
        <Sidebar activeTicker={activeTicker} setActiveTicker={setActiveTicker} />
      )}
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {currentView === 'dashboard' && (
          <>
            {/* Background ambient glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
          </>
        )}
        
        <Header onProfileClick={() => setCurrentView('profile')} />
        
        {currentView === 'dashboard' ? (
          <div className="flex-1 overflow-y-auto p-8 z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{activeTicker}</h2>
                  <p className="text-text-secondary">Real-time Chart & Analysis</p>
                </div>
              </div>

              <div className="glass-panel p-6 border-border/50 bg-surface/50">
                <Chart symbol={activeTicker} />
              </div>

              <Stats symbol={activeTicker} />
            </div>
          </div>
        ) : (
          <Profile onBack={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <SocketProvider>
      <DashboardContent />
    </SocketProvider>
  );
}

export default App;
