import { Schema } from '@effect/schema';

import {
  MarketListingType,
  MarketRentalStatus,
  MarketRentalType,
} from '@wharf-gaming/splinterlands-models';

/**
 * Endpoint example
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
 * Endpoint example
 *
 * @see https://api.splinterlands.com/market/market_query_by_card?id=1
 */
export const MarketQueryByCardResponse = Schema.Array(
  Schema.Struct({
    uid: Schema.String,
    buy_price: Schema.Number,
    bcx: Schema.Number,
    type: Schema.Enums(MarketListingType),
    rental_type: Schema.NullOr(Schema.Enums(MarketRentalType)),
    gold: Schema.Boolean,
    card_detail_id: Schema.Number,
  }),
);

/**
 * Endpoint example
 *
 * @see https://api2.splinterlands.com/cards/collection/wharf-gg
 */
export const PlayerCardCollectionResponse = Schema.Struct({
  cards: Schema.Array(
    Schema.Struct({
      player: Schema.String,
      uid: Schema.String,
      card_detail_id: Schema.Number,
      gold: Schema.Boolean,
      buy_price: Schema.NullOr(Schema.NumberFromString),
      market_listing_type: Schema.NullOr(Schema.Enums(MarketListingType)),
      market_listing_status: Schema.NullOr(Schema.Enums(MarketRentalStatus)), // TODO: Review if this applies only to rentals or sales too
      bcx: Schema.Number,
    }),
  ),
});
