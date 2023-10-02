import baseTestnetConfig from 'src/state/config/base-testnet.json';
import baseMainnetConfig from 'src/state/config/base-mainnet.json';

export const noneAddress = '0x0000000000000000000000000000000000000000';

export const klaytn = {
  id: 8_217,
  name: 'Klaytn',
  network: 'klaytn',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: { http: ['https://klaytn.blockpi.network/v1/rpc/public'] },
    public: { http: ['https://klaytn.blockpi.network/v1/rpc/public'] },
  },
  blockExplorers: {
    etherscan: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
    default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
  },
  AskifyContract: baseMainnetConfig.AskifyContract,
};
export const baobab = {
  id: 1001,
  name: 'baobab',
  network: 'baobab',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: {
      http: [
        'https://klaytn-baobab-rpc.allthatnode.com:8551/JDYwYnv5fTvAmwy3KJckqdZMyzQ7t9J4',
      ],
    },
    public: {
      http: [
        'https://klaytn-baobab-rpc.allthatnode.com:8551/JDYwYnv5fTvAmwy3KJckqdZMyzQ7t9J4',
      ],
    },
  },
  blockExplorers: {
    etherscan: { name: 'klaytnfinder', url: 'https://baobab.klaytnfinder.io/' },
    default: { name: 'klaytnfinder', url: 'https://baobab.klaytnfinder.io/' },
  },
  AskifyContract: baseTestnetConfig.AskifyContract,
};

export const config =
  process.env.NEXT_PUBLIC_NETWORK == 'mainnet' ? klaytn : baobab;

const ChainInfosTestnet = {
  label: 'Metamask',
  logo: '/metamask-icon.png',
  disabled: false,
};

const ChainInfosMainnet = {
  label: 'Metamask',
  logo: '/metamask-icon.png',
  disabled: false,
};

export const chainInfos =
  process.env.NEXT_PUBLIC_NETWORK == 'mainnet'
    ? ChainInfosMainnet
    : ChainInfosTestnet;
