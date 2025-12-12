import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MigrationCard } from './components/MigrationCard';
import { InfoPanel } from './components/InfoPanel';
import { WalletModal } from './components/WalletModal';
import { WalletState } from './types';

const App: React.FC = () => {
  // Mock State
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balanceV1: 0,
    balanceV2: 0
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Open the modal instead of connecting immediately
  const handleConnectClick = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletSelect = (walletName: string) => {
    // Close modal
    setIsWalletModalOpen(false);
    
    // Simulate wallet connection with a loader/delay
    setTimeout(() => {
      setWallet({
        isConnected: true,
        address: "0x71C...9A21",
        balanceV1: 15420.50, // Legacy Balance
        balanceV2: 0.00 // Native Balance
      });
    }, 500);
  };

  const handleDisconnect = () => {
    setWallet({
      isConnected: false,
      address: null,
      balanceV1: 0,
      balanceV2: 0
    });
  };

  const performMigration = async (amount: string) => {
    return new Promise<void>((resolve) => {
      // Simulate blockchain delay
      setTimeout(() => {
        const val = parseFloat(amount);
        setWallet(prev => ({
          ...prev,
          balanceV1: prev.balanceV1 - val,
          balanceV2: prev.balanceV2 + val
        }));
        resolve();
      }, 3000);
    });
  };

  return (
    <div className="min-h-screen bg-aia-dark text-white font-sans selection:bg-aia-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-aia-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aia-secondary/20 blur-[100px] rounded-full" />
      </div>

      <Navbar 
        isConnected={wallet.isConnected} 
        address={wallet.address} 
        onConnect={handleConnectClick}
        onDisconnect={handleDisconnect}
      />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Text */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              AIA Token Migration
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Official bridge for migrating AIA tokens from BSC network to the native AIA Chain. Secure, fast, and fee-free.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Panel - Migration Card */}
            <div className="lg:col-span-7 xl:col-span-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <MigrationCard 
                wallet={wallet} 
                connectWallet={handleConnectClick}
                onMigrate={performMigration}
              />
            </div>

            {/* Right Panel - Info */}
            <div className="lg:col-span-5 xl:col-span-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <InfoPanel />
              
              {/* Stats Mini Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Migrated</div>
                  <div className="text-xl font-mono font-bold text-aia-primary">12.5M AIA</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Holders</div>
                  <div className="text-xl font-mono font-bold text-white">45,201</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
               {/* Footer Logo - Simplified */}
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-aia-primary" style={{ opacity: 0.8 }}>
                  <g fill="currentColor">
                    <circle cx="50" cy="20" r="4" />
                    <circle cx="71" cy="29" r="3" />
                    <circle cx="80" cy="50" r="4" />
                    <circle cx="71" cy="71" r="3" />
                    <circle cx="50" cy="80" r="4" />
                    <circle cx="29" cy="71" r="3" />
                    <circle cx="20" cy="50" r="4" />
                    <circle cx="29" cy="29" r="3" />
                  </g>
               </svg>
               <div className="relative z-10 flex items-center justify-center font-bold text-white text-lg tracking-tighter select-none">
                 <span>D</span>
                 <span className="-ml-0.5">Λ</span>
               </div>
            </div>
            <span className="text-gray-400 text-sm">© 2024 AIA Chain Foundation. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleWalletSelect} 
      />
    </div>
  );
};

export default App;