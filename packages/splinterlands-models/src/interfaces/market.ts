import { MarketListingType, MarketRentalType } from '../enums';

export interface MarketListing {
  cardId: string;
  price: number;
  bcx: number;
  type: MarketListingType;
  rentalType: MarketRentalType | null;
  gold: boolean;
  cardDetailId: number;
}
