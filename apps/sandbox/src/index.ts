import { Effect, Layer, ManagedRuntime } from 'effect';

import { SplinterlandsAPIClient } from '@wharf-gaming/splinterlands-api-client';
import { SplinterlandsBlockchainClient } from '@wharf-gaming/splinterlands-blockchain-client';
import {
  cardRentalListingBot,
  priceLadder,
  rentalPriceAnalysisEngine,
} from '@wharf-gaming/splinterlands-bots';

const player = '';
const postingKey = '';

const MainLayer = Layer.mergeAll(
  SplinterlandsAPIClient.Live,
  SplinterlandsBlockchainClient.Live,
);

const SplinterlandsRuntime = ManagedRuntime.make(MainLayer);

const runCardRentalListingBot = Effect.gen(function* () {
  return yield* cardRentalListingBot(player, postingKey, priceLadder, 1);
});

const runRentalPriceAnalysisEngine = Effect.gen(function* () {
  return yield* rentalPriceAnalysisEngine(player);
});

// Run the program with the runtime
SplinterlandsRuntime.runPromise(runCardRentalListingBot).then((r) => {
  console.log(r);
});
