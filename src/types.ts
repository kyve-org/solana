export const SLOT_WAS_SKIPPED = (height: number): string => {
  return `Slot ${height} was skipped`;
};

export interface Signature {
  signature: string;
  pubKey: string;
  poolId: string;
  timestamp: string;
}
