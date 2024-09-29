import { Schema } from '@effect/schema';

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
      uid: Schema.String,
      card_detail_id: Schema.Number,
      gold: Schema.Boolean,
      bcx: Schema.Number,
    }),
  ),
});
