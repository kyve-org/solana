import { BlockResponse } from "@solana/web3.js";
import axios from "axios";
import { nanoid } from "nanoid";
import { Response, Signature } from "./types";

export async function fetchBlock(
  endpoint: string,
  height: number,
  signature: Signature
): Promise<BlockResponse> {
  return await call<BlockResponse>(
    endpoint,
    "getBlock",
    [
      height,
      {
        encoding: "jsonParsed",
      },
    ],
    signature
  );
}

async function call<T>(
  endpoint: string,
  method: string,
  params: any[],
  signature: Signature
): Promise<T> {
  const { data } = await axios.post<Response<T>>(endpoint, {
    jsonrpc: "2.0",
    id: nanoid(),
    method,
    params,
  }, {
    headers: {
      Signature: signature.signature,
      "Public-Key": signature.pubKey,
      "Pool-ID": signature.poolId,
      Timestamp: signature.timestamp,
      "Content-Type": "application/json",
    },
  });

  return data.result;
}
