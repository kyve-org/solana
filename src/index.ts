import KYVE, { Item } from '@kyve/core';
import { Signature } from './types';
import { fetchBlock, wasSlotSkipped } from './utils';
import { name, version } from '../package.json';

process.env.KYVE_RUNTIME = name;
process.env.KYVE_VERSION = version;

KYVE.metrics.register.setDefaultLabels({
  app: process.env.KYVE_RUNTIME,
});

class KyveSolana extends KYVE {
  public async getDataItem(key: string): Promise<Item> {
    let block;

    try {
      block = await fetchBlock(
        this.pool.config.rpc,
        +key,
        await this.getSignature()
      );
    } catch (err) {
      if (wasSlotSkipped(err, +key)) return { key, value: null };

      this.logger.warn(`Failed to fetch block ${key}. Retrying ...`);

      throw err;
    }

    return { key, value: block };
  }

  public async getNextKey(key: string): Promise<string> {
    if (key) {
      return (parseInt(key) + 1).toString();
    }

    return '0';
  }

  public async formatValue(value: any): Promise<string> {
    return value.blockhash;
  }

  private async getSignature(): Promise<Signature> {
    const address = await this.sdk.wallet.getAddress();
    const timestamp = new Date().valueOf().toString();

    const message = `${address}//${this.poolId}//${timestamp}`;

    const { signature, pub_key } = await this.sdk.signString(message);

    return {
      signature,
      pubKey: pub_key.value,
      poolId: this.poolId.toString(),
      timestamp,
    };
  }
}

// noinspection JSIgnoredPromiseFromCall
new KyveSolana().start();
