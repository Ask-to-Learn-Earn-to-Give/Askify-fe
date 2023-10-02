import { config } from 'src/state/chain/config';
import { getContract as viemGetContract } from 'viem';
import ABI_MINT_NFT from 'src/abis/MintNft.json';

export const getContract = ({ abi, address, signer, publicClient }) => {
  const c = viemGetContract({
    abi,
    address,
    publicClient,
    walletClient: signer,
  });
  return {
    ...c,
    account: signer?.account,
    chain: signer?.chain,
  };
};

export function prepareContract(address, abi, walletClient, publicClient) {
  if (!address) return null;
  try {
    return getContract({
      abi,
      address,
      chainId: config.base.chainId,
      signer: walletClient,
      publicClient,
    });
  } catch (error) {
    console.error('Failed to get contract', error);
    return null;
  }
}

export function getNftContract(walletClient, publicClient) {
  return prepareContract(
    config.base.nftAddress,
    ABI_MINT_NFT,
    walletClient,
    publicClient
  );
}
