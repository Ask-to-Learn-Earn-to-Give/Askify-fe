import { useMemo } from 'react';
import { createPublicClient, http } from 'viem';
import { CHAINS } from './wallet';

export function useViemClient() {
  return useMemo(() => {
    return createPublicClient({
      chain: CHAINS,
      transport: http(),
    });
  }, [CHAINS]);
}
