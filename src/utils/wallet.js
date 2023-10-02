import { createConfig, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { base, baseGoerli } from 'wagmi/chains';
import { klaytn, baobab } from '../state/chain/config';
export const CHAINS =
  process.env.NEXT_PUBLIC_NETWORK == 'mainnet' ? [klaytn] : [baobab];
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  [publicProvider()]
);
// Set up wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Askify',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '4b15b98732a87efef49a784a0dcb002e',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
