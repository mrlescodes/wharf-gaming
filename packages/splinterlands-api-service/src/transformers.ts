import { Schema } from '@effect/schema';

import {
  Card,
  MarketListing,
  PlayerCard,
} from '@wharf-gaming/splinterlands-models';

import {
  CardDetailsResponse,
  MarketQueryByCardResponse,
  PlayerCardCollectionResponse,
} from '.';

export const transformCardDetailsResponse = (
  response: Schema.Schema.Type<typeof CardDetailsResponse>,
) => {
  return response.map((card) => {
    return {
      id: card.id,
      name: card.name,
      rarity: card.rarity,
    };
  }) satisfies Card[];
};

export const transformMarketQueryByCardResponse = (
  response: Schema.Schema.Type<typeof MarketQueryByCardResponse>,
) => {
  return response.map((listing) => {
    return {
      cardId: listing.uid,
      price: listing.buy_price,
      bcx: listing.bcx,
      type: listing.type,
      rentalType: listing.rental_type,
      gold: listing.gold,
      cardDetailId: listing.card_detail_id,
    };
  }) satisfies MarketListing[];
};

export const transformPlayerCardCollectionResponse = (
  response: Schema.Schema.Type<typeof PlayerCardCollectionResponse>,
) => {
  return response.cards.map((card) => {
    return {
      player: card.player,
      cardId: card.uid,
      cardDetailId: card.card_detail_id,
      gold: card.gold,
      marketListingPrice: card.buy_price,
      marketListingType: card.market_listing_type,
      marketRentalStatus: card.market_listing_status,
      bcx: card.bcx,
    };
  }) satisfies PlayerCard[];
};
