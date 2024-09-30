import { Schema } from '@effect/schema';

import { MarketRentalStatus } from '@wharf-gaming/splinterlands-models';

/**
 * Endpoint
 *
 * @see https://api2.splinterlands.com/cards/get_details
 */
export const CardDetailsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    rarity: Schema.Number,
  }),
);

/**
 * Endpoint
 *
 * @see https://api2.splinterlands.com/cards/collection/wharf-gg
 */
export const PlayerCardCollectionResponse = Schema.Struct({
  cards: Schema.Array(
    Schema.Struct({
      player: Schema.String,
      id: Schema.String,
      card_detail_id: Schema.Number,
      gold: Schema.Boolean,
      bcx: Schema.Number,
      market_listing_status: Schema.NullOr(Schema.Enums(MarketRentalStatus)),
      buy_price: Schema.NullOr(Schema.NumberFromString),
    }),
  ),
});
