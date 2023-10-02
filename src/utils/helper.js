import BN from 'bn.js';
import { BigNumber } from 'ethers';
import { config, noneAddress } from 'src/state/chain/config';
import { ethers } from 'ethers';

import AskifyERC20 from 'src/abis/AskifyERC20.json';

export const getSteps = (tokenIn, tokenOut, poolMatrix) => {
  try {
    let par = {};
    let visit = [tokenIn];
    let q = [tokenIn];
    while (q.length) {
      let u = q[0];
      q.shift();
      let ku = Object.keys(poolMatrix[u]);
      for (let v = 0; v < ku.length; v++) {
        if (!visit.includes(ku[v])) {
          par[ku[v]] = u;
          visit.push(ku[v]);
          q.push(ku[v]);
        }
      }
    }
    if (!visit.includes(tokenOut)) return [];
    let steps = [];
    while (tokenOut != tokenIn) {
      steps.push(tokenOut);
      tokenOut = par[tokenOut];
    }
    steps.push(tokenIn);
    steps.reverse();
    return steps;
  } catch (e) {
    console.log(e);
    return [];
  }
};

function getTokenContract(address) {
  const provider = new ethers.providers.JsonRpcProvider(config.base.rpcAddress);
  return new ethers.Contract(address, AskifyERC20.abi, provider);
}

export async function getTokenData(tokenAddress) {
  try {
    const tokenContract = getTokenContract(tokenAddress);
    const [name, symbol, decimals] = await Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
    ]);

    return { address: tokenAddress, name, symbol, decimals };
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

export const loadBalance = async (account, tokenAddress) => {
  try {
    let result = BigNumber.from(0);
    if (tokenAddress == noneAddress) {
      let ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account],
      });
      return BigNumber.from(ethBalance);
    }
    const tokenContract = getTokenContract(tokenAddress);
    result = await tokenContract.balanceOf(account);
    return result;
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};
export const loadNftBalance = async (account, chain, tokenAddress) => {
  try {
    let result = BigNumber.from(0);
    if (tokenAddress == noneAddress) {
      let ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account],
      });
      return BigNumber.from(ethBalance);
    }
    const nftContract = getNftContract(tokenAddress);
    result = await nftContract.balanceOf(account);
    return result;
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    throw error;
  }
};

export const loadSupply = async (tokenAddress) => {
  try {
    let result = BigNumber.from(0);
    const tokenContract = getTokenContract(tokenAddress);
    result = await tokenContract.totalSupply();
    return result;
  } catch (error) {
    return BigNumber.from('0');
  }
};
