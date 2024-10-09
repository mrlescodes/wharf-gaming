import { MarketListingType, MarketRentalStatus } from '..';

export interface PlayerCard {
  player: string;
  cardId: string;
  cardDetailId: number;
  gold: boolean;
  marketListingPrice: number | null;
  marketListingType: MarketListingType | null;
  marketRentalStatus: MarketRentalStatus | null; // TODO: Review market_listing_status, does this only apply to rentals or sales too?
  bcx: number;
}
