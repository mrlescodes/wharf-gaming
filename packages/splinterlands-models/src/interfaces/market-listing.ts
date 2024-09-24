import { Currency, MarketListingType, MarketRentalType } from '../enums';

export interface MarketListing {
  eId: string;
  cardId: string;
  xp: number;
  alphaXp: number | null;
  price: number;
  seller: string;
  feePercent: number;
  bcx: number;
  priceBcx: number;
  type: MarketListingType;
  rentalType: MarketRentalType | null;
  expirationDate: string;
  lastUsedBlock: number | null;
  lastUsedDate: string | null;
  lastTransferredBlock: number | null;
  lastTransferredDate: string | null;
  lastUsedPlayer: string | null;
  gold: boolean;
  edition: number;
  cardDetailId: number;
  currency: Currency;
  level: number;
  uid: string;
}
