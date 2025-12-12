export enum MigrationStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  APPROVING = 'APPROVING',
  MIGRATING = 'MIGRATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface TokenBalance {
  symbol: string;
  balance: number;
  icon: string;
  network: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balanceV1: number;
  balanceV2: number;
}

declare global {
  interface Window {
    ethereum: any;
  }
}