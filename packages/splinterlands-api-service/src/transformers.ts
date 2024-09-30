import { Schema } from '@effect/schema';

import { Card, PlayerCard } from '@wharf-gaming/splinterlands-models';

import { CardDetailsResponse, PlayerCardCollectionResponse } from '.';

export const transformCardDetailsResponse = (
  response: Schema.Schema.Type<typeof CardDetailsResponse>,
) => {
  return response.map((card) => {
    return {
      id: card.id,
      rarity: card.rarity,
      name: card.name,
    };
  }) satisfies Card[];
};

export const transformPlayerCardCollectionResponse = (
  response: Schema.Schema.Type<typeof PlayerCardCollectionResponse>,
) => {
  return response.cards.map((card) => {
    return {
      player: card.player,
      id: card.id,
      cardDetailId: card.card_detail_id,
      gold: card.gold,
      bcx: card.bcx,
      marketRentalStatus: card.market_listing_status,
      marketListingPrice: card.buy_price,
    };
  }) satisfies PlayerCard[];
};
