import { Client, PrivateKey } from '@hiveio/dhive';
import { Context, Effect, Layer } from 'effect';

export interface BlockchainOperation {
  id: string;
  json: string;
  required_auths: string[];
  required_posting_auths: string[];
}

export interface BlockchainTransactionConfirmation {
  id: string;
  block_num: number;
  trx_num: number;
  expired: boolean;
}

const makeHiveBlockchainClient = Effect.gen(function* (_) {
  const client = new Client([
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
    ) => {
      const privateKey = PrivateKey.fromString(keyString);

      return Effect.tryPromise({
        // TODO: Review other possible solutions
        // Explicitly declare the return type of the hive client method to resolve TS2742
        // The inferred type cannot be named without a reference to @hiveio/dhive
        try: (): Promise<BlockchainTransactionConfirmation> =>
          client.broadcast.json(operation, privateKey),
        // TODO: Effect error handling
        catch: (unknown) => new Error(`${errMsg} - ${unknown}`),
      });
    },
  };
});

export class HiveBlockchainClient extends Context.Tag('HiveBlockchainClient')<
  HiveBlockchainClient,
  Effect.Effect.Success<typeof makeHiveBlockchainClient>
>() {
  static readonly Live = Layer.effect(this, makeHiveBlockchainClient);
}
