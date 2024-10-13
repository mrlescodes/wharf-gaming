import { MarketListingType, MarketListingStatus } from '..';

export interface PlayerCard {
  player: string;
  cardId: string;
  cardDetailId: number;
  gold: boolean;
  edition: number;
  marketListingPrice: number | null;
  marketListingType: MarketListingType | null;
  marketListingStatus: MarketListingStatus | null;
  bcx: number;
}
