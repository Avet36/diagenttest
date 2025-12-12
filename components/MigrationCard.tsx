import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Button } from './Button';
import { TokenInput } from './TokenInput';
import { MigrationStatus, WalletState } from '../types';

interface MigrationCardProps {
  wallet: WalletState;
  connectWallet: () => void;
  onMigrate: (amount: string) => Promise<void>;
}

export const MigrationCard: React.FC<MigrationCardProps> = ({ wallet, connectWallet, onMigrate }) => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<MigrationStatus>(MigrationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Reset status when amount changes
  useEffect(() => {
    if (status === MigrationStatus.SUCCESS || status === MigrationStatus.ERROR) {
      setStatus(MigrationStatus.IDLE);
      setError(null);
    }
  }, [amount]);

  const handleMax = () => {
    setAmount(wallet.balanceV1.toString());
  };

  const handleAction = async () => {
    if (!wallet.isConnected) {
      connectWallet();
      return;
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (numAmount > wallet.balanceV1) {
      setError("Insufficient funds");
      return;
    }

    try {
      setError(null);
      setStatus(MigrationStatus.APPROVING);
      
      // Simulate Approve
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus(MigrationStatus.MIGRATING);
      
      // Call parent migrate function
      await onMigrate(amount);
      
      setStatus(MigrationStatus.SUCCESS);
      setAmount('');
    } catch (e) {
      setStatus(MigrationStatus.ERROR);
      setError("Transaction error. Please try again.");
    }
  };

  return (
    <div className="bg-aia-panel rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-aia-primary via-white/50 to-aia-primary" />
      
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Token Migration</h2>
          <div className="bg-white/5 px-3 py-1 rounded-full border border-white/5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-aia-primary shadow-[0_0_10px_rgba(0,216,255,0.5)]" />
            <span className="text-xs font-medium text-gray-300">Network Active</span>
          </div>
        </div>

        <div className="space-y-2 relative">
          {/* FROM Input */}
          <div className="relative z-10">
            <TokenInput
              label="You Pay (Legacy)"
              value={amount}
              onChange={setAmount}
              balance={wallet.balanceV1}
              symbol="AIA"
              network="BSC Network"
              onMax={handleMax}
            />
          </div>

          {/* Arrow Separator */}
          <div className="flex justify-center -my-5 relative z-20">
            <div className="bg-aia-panel p-2 rounded-xl border border-white/10 shadow-lg">
              <div className="bg-white/5 p-2 rounded-lg text-gray-400">
                <Icons.ArrowDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* TO Input */}
          <div className="relative z-10">
            <TokenInput
              label="You Receive (Native)"
              value={amount} // 1:1 ratio
              onChange={() => {}}
              balance={wallet.balanceV2}
              symbol="AIA"
              network="AIA Chain"
              readOnly
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <Icons.AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-sm text-red-400 font-medium">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {status === MigrationStatus.SUCCESS && (
          <div className="mt-4 p-3 bg-aia-primary/10 border border-aia-primary/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <Icons.CheckCircle className="w-5 h-5 text-aia-primary shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm text-aia-primary font-bold">Success!</span>
              <span className="text-xs text-aia-primary/80">Tokens have been sent to your wallet.</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8">
          <Button
            fullWidth
            onClick={handleAction}
            isLoading={status === MigrationStatus.APPROVING || status === MigrationStatus.MIGRATING}
            disabled={status === MigrationStatus.SUCCESS && !amount}
          >
            {!wallet.isConnected 
              ? "Connect Wallet" 
              : status === MigrationStatus.APPROVING
                ? "Approving..."
                : status === MigrationStatus.MIGRATING
                  ? "Migrating..."
                  : "Migrate"
            }
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By clicking 'Migrate', you agree to the Smart Contract Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
};