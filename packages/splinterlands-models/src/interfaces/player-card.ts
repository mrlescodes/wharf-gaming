import { MarketRentalStatus } from '..';

export interface PlayerCard {
  player: string;
  id: string;
  cardDetailId: number;
  gold: boolean;
  bcx: number;
  marketRentalStatus: MarketRentalStatus | null;
  marketListingPrice: number | null;
}
