import { Effect } from 'effect';

import { SplinterlandsAPIClient } from '@wharf-gaming/splinterlands-api-client';
import {
  MarketListingType,
  MarketRentalType,
} from '@wharf-gaming/splinterlands-models';

export const fetchLowestRentalCardPrice = (params: {
  cardDetailId: number;
  gold?: boolean;
  level?: number;
}) => {
  return Effect.gen(function* () {
    const client = yield* SplinterlandsAPIClient;

    const listings = yield* client.getMarketQueryByCard({
      cardDetailId: params.cardDetailId,
      gold: params.gold,
      level: params.level,
      type: MarketListingType.Rent,
      rentalType: MarketRentalType.Daily,
    });

    if (listings.length === 0) {
      return 0;
    }

    const prices = listings.map((listing) => listing.price);

    prices.sort((a, b) => a - b);

    return prices[0] ?? 0;
  });
};
