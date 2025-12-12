import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { Button } from './Button';

interface NavbarProps {
  isConnected: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isConnected, address, onConnect, onDisconnect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-aia-dark/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
               {/* Animated Galaxy Dots */}
               <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-aia-primary animate-[spin_10s_linear_infinite]" style={{ animationDuration: '30s' }}>
                  <g fill="currentColor">
                    {/* Outer Ring */}
                    <circle cx="50" cy="10" r="2" opacity="0.4" />
                    <circle cx="80" cy="20" r="3" opacity="0.5" />
                    <circle cx="90" cy="50" r="2" opacity="0.4" />
                    <circle cx="80" cy="80" r="3" opacity="0.5" />
                    <circle cx="50" cy="90" r="2" opacity="0.4" />
                    <circle cx="20" cy="80" r="3" opacity="0.5" />
                    <circle cx="10" cy="50" r="2" opacity="0.4" />
                    <circle cx="20" cy="20" r="3" opacity="0.5" />
                    
                    {/* Middle Ring */}
                    <circle cx="50" cy="20" r="4" opacity="0.8" />
                    <circle cx="71" cy="29" r="3" opacity="0.7" />
                    <circle cx="80" cy="50" r="4" opacity="0.8" />
                    <circle cx="71" cy="71" r="3" opacity="0.7" />
                    <circle cx="50" cy="80" r="4" opacity="0.8" />
                    <circle cx="29" cy="71" r="3" opacity="0.7" />
                    <circle cx="20" cy="50" r="4" opacity="0.8" />
                    <circle cx="29" cy="29" r="3" opacity="0.7" />

                    {/* Inner Ring */}
                    <circle cx="50" cy="30" r="5" />
                    <circle cx="63" cy="37" r="4" />
                    <circle cx="70" cy="50" r="5" />
                    <circle cx="63" cy="63" r="4" />
                    <circle cx="50" cy="70" r="5" />
                    <circle cx="37" cy="63" r="4" />
                    <circle cx="30" cy="50" r="5" />
                    <circle cx="37" cy="37" r="4" />
                  </g>
               </svg>
               {/* DA Text */}
               <div className="relative z-10 flex items-center justify-center font-bold text-white text-xl tracking-tighter select-none">
                 <span>D</span>
                 <span className="-ml-0.5">Λ</span>
               </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">DEAGENT AI</h1>
              <p className="text-[10px] text-aia-primary tracking-wider font-semibold">MIGRATION PORTAL</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
          </div>

          {/* Connect Button / Wallet Menu */}
          <div className="hidden md:block" ref={dropdownRef}>
            <div className="relative">
              <Button 
                variant={isConnected ? "secondary" : "primary"}
                onClick={() => isConnected ? setIsDropdownOpen(!isDropdownOpen) : onConnect()}
                className="min-w-[160px]"
              >
                {isConnected && address ? (
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-aia-primary animate-pulse" />
                    {formatAddress(address)}
                    <Icons.ArrowDown className={`w-3 h-3 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Icons.Wallet className="w-4 h-4" />
                    Connect
                  </span>
                )}
              </Button>

              {/* Dropdown Menu */}
              {isConnected && isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-aia-panel border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  <button 
                    onClick={() => {
                      onDisconnect();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Icons.LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-aia-panel border-b border-white/5 p-4 space-y-4 animate-in slide-in-from-top-10">
          {isConnected ? (
             <Button 
                fullWidth 
                variant="secondary"
                onClick={() => {
                  onDisconnect();
                  setIsMobileMenuOpen(false);
                }}
                className="text-red-400 border-red-500/20"
              >
                <div className="flex items-center gap-2">
                  <Icons.LogOut className="w-4 h-4" />
                  Disconnect {address ? formatAddress(address) : ''}
                </div>
              </Button>
          ) : (
              <Button 
                fullWidth 
                variant="primary"
                onClick={() => {
                  onConnect();
                  setIsMobileMenuOpen(false);
                }}
              >
                Connect Wallet
              </Button>
          )}
        </div>
      )}
    </nav>
  );
};