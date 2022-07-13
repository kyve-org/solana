import { Node, Arweave, Gzip, JsonFileCache } from '@kyve/core';

import Solana from './runtime';

new Node()
  .addRuntime(new Solana())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();
