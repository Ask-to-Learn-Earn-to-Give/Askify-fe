/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from 'src/state/chain/config';
import { connectNetwork, disconnectNetwork } from 'src/state/chain/slice';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
  useNetwork,
} from 'wagmi';
import axios, { addTokenToAxios } from '../axios';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { lastConnected } = useSelector((state: any) => state.chain);
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect, isLoading: isDisconnecting } = useDisconnect();

  const handleDisconnectNetwork = useCallback(async () => {
    dispatch(disconnectNetwork(''));

    localStorage.removeItem('token');
  }, []);

  const handleConnectNetwork = useCallback(
    async ({ address, connector }: any) => {
      dispatch(connectNetwork(connector?.id));

      if (localStorage.getItem('token')) {
        addTokenToAxios();
        return;
      }

      const {
        data: { nonce },
      } = await axios.post('/api/auth/wallet', {
        address: address,
      });

      const signedNonce = await window.ethereum.request({
        method: 'personal_sign',
        params: [`0x${Buffer.from(nonce, 'utf8').toString('hex')}`, address],
        from: address,
      });

      const {
        data: { token },
      } = await axios.post('/api/auth/verify-wallet', {
        address: address,
        signedNonce: signedNonce,
      });

      localStorage.setItem('token', token);
      addTokenToAxios();
    },
    []
  );

  const {
    isConnected,
    connector: currentConnector,
    address = '',
    isConnecting,
    isReconnecting,
  } = useAccount({
    onConnect: handleConnectNetwork,
    onDisconnect: handleDisconnectNetwork,
  });

  const handleCheckChain = useCallback(async () => {
    if (chain?.id !== config.id) {
      switchNetwork?.(config.id);
    }
  }, [config, switchNetwork, chain]);

  useEffect(() => {
    if (isConnected && switchNetwork) {
      handleCheckChain();
    }
  }, [isConnected, switchNetwork]);

  useEffect(() => {
    if (lastConnected && !isConnected && !isDisconnecting) {
      let lastConnector = connectors.find((item) => item.id === lastConnected);
      if (lastConnector) {
        connect({ connector: lastConnector });
      }
      connect();
    }
  }, [lastConnected, isConnected, isDisconnecting]);

  return (
    <WalletContext.Provider
      value={{
        address,
        connect,
        connectors,
        isLoading,
        pendingConnector,
        disconnect,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
