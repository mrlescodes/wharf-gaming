import { Client as HiveClient, PrivateKey } from '@hiveio/dhive';
import { Context, Effect, Layer } from 'effect';

export interface BlockchainOperation {
  id: string;
  json: string;
  required_auths: string[];
  required_posting_auths: string[];
}

export interface TransactionConfirmation {
  id: string;
  block_num: number;
  trx_num: number;
  expired: boolean;
}

const makeHiveBlockchainService = Effect.gen(function* (_) {
  const client = new HiveClient([
    'https://api.hive.blog',
    'https://api.hivekings.com',
    'https://anyx.io',
    'https://api.openhive.network',
  ]);

  return {
    broadcastOperation: (
      operation: BlockchainOperation,
      keyString: string,
      errMsg: string,
    ): Effect.Effect<TransactionConfirmation, Error, never> => {
      const privateKey = PrivateKey.fromString(keyString);

      return Effect.tryPromise({
        try: () => client.broadcast.json(operation, privateKey),
        // TODO: Effect error handling
        catch: (unknown) => new Error(`${errMsg} - ${unknown}`),
      });
    },
  };
});

export class HiveBlockchainService extends Context.Tag('HiveBlockchainService')<
  HiveBlockchainService,
  Effect.Effect.Success<typeof makeHiveBlockchainService>
>() {
  static readonly Live = Layer.effect(this, makeHiveBlockchainService);
}
