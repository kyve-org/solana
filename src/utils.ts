import { BlockResponse, Connection } from '@solana/web3.js';
import { Signature, SLOT_WAS_SKIPPED } from './types';

// NOTE: The response type isn't correct because of our patch.
export async function fetchBlock(
  endpoint: string,
  height: number,
  signature: Signature
): Promise<BlockResponse> {
  const provider = initialiseSolanaRPC(endpoint, signature);

  return (await provider.getBlock(height))!;
}

function initialiseSolanaRPC(
  endpoint: string,
  signature: Signature
): Connection {
  return new Connection(endpoint, {
    httpHeaders: {
      'Content-Type': 'application/json',
      Signature: signature.signature,
      'Public-Key': signature.pubKey,
      'Pool-ID': signature.poolId,
      Timestamp: signature.timestamp,
    },
  });
}

export function wasSlotSkipped(err: any, height: number): boolean {
  return new Error(err).message.includes(SLOT_WAS_SKIPPED(height));
}
