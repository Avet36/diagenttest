import React from 'react';

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  balance: number;
  symbol: string;
  network: string;
  onMax?: () => void;
  readOnly?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  label,
  value,
  onChange,
  balance,
  symbol,
  network,
  onMax,
  readOnly = false
}) => {
  return (
    <div className="bg-aia-input rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="text-gray-400 text-sm flex items-center gap-1">
          Balance: <span className="text-white font-mono">{balance.toLocaleString()}</span>
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (readOnly) return;
            const val = e.target.value;
            if (/^\d*\.?\d*$/.test(val)) {
              onChange(val);
            }
          }}
          placeholder="0.00"
          readOnly={readOnly}
          className="w-full bg-transparent text-3xl font-bold text-white placeholder-gray-600 focus:outline-none font-mono"
        />
        
        {onMax && !readOnly && (
          <button 
            onClick={onMax}
            className="text-aia-primary text-sm font-bold bg-aia-primary/10 px-2 py-1 rounded hover:bg-aia-primary/20 transition-colors"
          >
            MAX
          </button>
        )}
        
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 shrink-0">
          <div className="w-6 h-6 rounded-full bg-aia-primary flex items-center justify-center text-[10px] text-black font-bold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">{symbol}</span>
            <span className="text-[10px] text-gray-500 leading-none mt-0.5">{network}</span>
          </div>
        </div>
      </div>
    </div>
  );
};