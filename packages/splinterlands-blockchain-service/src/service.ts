import { Context, Effect, Layer } from 'effect';

import { HiveBlockchainClient } from '@wharf-gaming/hive-blockchain-client';
import {
  MarketListingType,
  Currency,
} from '@wharf-gaming/splinterlands-models';

const makeSplinterlandsBlockchainService = Effect.gen(function* (_) {
  const client = yield* _(HiveBlockchainClient);

  return {
    listCardsForRent: ({
      cards,
      username,
      postingKey,
    }: {
      cards: [string, number][];
      username: string;
      postingKey: string;
    }) =>
      Effect.gen(function* () {
        const operation = {
          id: 'sm_market_list',
          json: JSON.stringify({
            cards,
            type: MarketListingType.Rent,
            fee: 500,
            list_fee: cards.length, // The list fee is 1 DEC per card
            list_fee_token: Currency.DEC,
          }),
          required_auths: [],
          required_posting_auths: [username],
        };

        return yield* client.broadcastOperation(
          operation,
          postingKey,
          'Failed to list cards for rent',
        );
      }),
  };
});

export class SplinterlandsBlockchainService extends Context.Tag(
  'SplinterlandsBlockchainService',
)<
  SplinterlandsBlockchainService,
  Effect.Effect.Success<typeof makeSplinterlandsBlockchainService>
>() {
  static readonly Live = Layer.effect(
    SplinterlandsBlockchainService,
    makeSplinterlandsBlockchainService,
  ).pipe(Layer.provide(HiveBlockchainClient.Live));
}
