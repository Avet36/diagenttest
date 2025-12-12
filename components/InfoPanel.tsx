import React from 'react';
import { Icons } from './Icons';

export const InfoPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-aia-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-aia-primary/10 blur-[50px] rounded-full pointer-events-none" />

        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Icons.ShieldCheck className="w-5 h-5 text-aia-primary" />
          Migration Information
        </h3>
        
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-aia-primary">1</span>
            </div>
            <p className="text-sm text-gray-400">
              <strong className="text-white">1:1 Rate.</strong> You will receive exactly the same amount of Native AIA as the Legacy AIA you migrate.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-aia-primary">2</span>
            </div>
            <p className="text-sm text-gray-400">
              <strong className="text-white">No Network Fees.</strong> Gas fees are covered by the migration fund during the launch period.
            </p>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-aia-primary">3</span>
            </div>
            <p className="text-sm text-gray-400">
              <strong className="text-white">Instant Receipt.</strong> Tokens will arrive at your address on the AIA Chain automatically after 12 block confirmations.
            </p>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-aia-primary/10 to-aia-secondary/20 rounded-2xl p-6 border border-aia-primary/20">
        <h4 className="text-white font-bold mb-2 text-sm">Need Help?</h4>
        <p className="text-xs text-gray-400 mb-4">If you encounter any issues with migration, please contact the official support chat.</p>
        <a href="#" className="text-xs font-bold text-aia-primary flex items-center gap-1 hover:underline">
          Telegram Support <Icons.ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};