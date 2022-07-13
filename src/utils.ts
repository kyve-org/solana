import { BlockResponse, Connection } from '@solana/web3.js';
import { Signature, SLOT_WAS_SKIPPED } from './types';

// NOTE: The response type isn't correct because of our patch.
export async function fetchBlock(
  endpoint: string,
  height: number,
  headers: any
): Promise<BlockResponse> {
  const provider = initialiseSolanaRPC(endpoint, headers);

  return (await provider.getBlock(height))!;
}

function initialiseSolanaRPC(endpoint: string, headers: any): Connection {
  return new Connection('https://proxy.alpha.kyve.network/solana', {
    httpHeaders: headers,
  });
}

export function wasSlotSkipped(err: any, height: number): boolean {
  return new Error(err).message.includes(SLOT_WAS_SKIPPED(height));
}
