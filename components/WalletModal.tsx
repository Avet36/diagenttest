import React from 'react';
import { Icons } from './Icons';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletName: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  if (!isOpen) return null;

  const wallets = [
    { name: 'MetaMask', description: 'Connect to your MetaMask Wallet' },
    { name: 'WalletConnect', description: 'Scan with WalletConnect to connect' },
    { name: 'Trust Wallet', description: 'Connect to your Trust Wallet' },
    { name: 'Coinbase Wallet', description: 'Connect to your Coinbase Wallet' },
    { name: 'Phantom', description: 'Connect using Phantom' },
    { name: 'OKX Wallet', description: 'Connect to OKX Wallet' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="relative bg-[#0F1126] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 shrink-0">
          <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-3 overflow-y-auto custom-scrollbar">
            {wallets.map((w) => (
                <button 
                    key={w.name}
                    onClick={() => onConnect(w.name)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#1A1C35] hover:bg-[#25284B] border border-white/5 hover:border-aia-primary/50 transition-all group shrink-0"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="font-bold text-white text-lg group-hover:text-aia-primary transition-colors">{w.name}</span>
                        <span className="text-xs text-gray-500">{w.description}</span>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                        <Icons.ArrowRight className="w-5 h-5 text-aia-primary" />
                    </div>
                </button>
            ))}
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5 shrink-0">
            <p className="text-center text-xs text-gray-500">
                By connecting a wallet, you agree to AIA Chain's <a href="#" className="text-aia-primary hover:underline">Terms of Service</a>
            </p>
        </div>
      </div>
    </div>
  );
};