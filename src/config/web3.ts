import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { bsc, bscTestnet, polygon, arbitrum, base, mainnet } from 'wagmi/chains';

export const projectId = 'e277359f0fca74fc6f379c202652ad12';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'Bit Access',
  description: 'Revolutionizing Daily Life Through Web3',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://bitaccess.io',
  icons: [typeof window !== 'undefined' ? `${window.location.origin}/icon-192x192.png` : 'https://bitaccess.io/icon.png']
};

const chains = [bsc, polygon, arbitrum, base, mainnet, bscTestnet] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});
