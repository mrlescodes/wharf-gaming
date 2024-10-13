import { Effect } from 'effect';

import { SplinterlandsBlockchainClient } from '@wharf-gaming/splinterlands-blockchain-client';

import { chunkArray, PriceLadder, rentalPricingEngine } from '..';

export const cardRentalListingBot = (
  player: string,
  postingKey: string,
  priceLadder: PriceLadder,
  batchSize = 2,
) =>
  Effect.gen(function* () {
    const client = yield* SplinterlandsBlockchainClient;

    const recommendations = yield* rentalPricingEngine(player, priceLadder);

    const listings = recommendations.map(({ cardId, price }) => [
      cardId,
      price,
    ]) satisfies [string, number][];

    const batches = chunkArray(listings, batchSize);

    let processedListings = [];

    // Process each batch sequentially
    for (const batch of batches) {
      // Broadcast the batch of listings to the blockchain client
      yield* client.listCardsForRent({
        cards: batch,
        username: player,
        postingKey,
      });

      processedListings.push(...batch);
    }

    return processedListings;
  });
