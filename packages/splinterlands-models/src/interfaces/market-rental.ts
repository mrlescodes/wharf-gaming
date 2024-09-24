import { Currency, MarketRentalStatus, MarketRentalType } from '../enums';

export interface MarketRental {
  eId: number;
  sellTrxId: string;
  seller: string;
  numCards: number;
  price: string;
  feePercent: number;
  rentalType: MarketRentalType;
  marketItemId: number;
  rentalTx: string;
  rentalDate: string;
  renter: string;
  status: MarketRentalStatus;
  marketAccount: string;
  rentalDays: number;
  nextRentalPayment: string;
  paymentCurrency: Currency;
  paymentAmount: string;
  escrowCurrency: Currency;
  escrowAmount: string;
  paidAmount: string;
  cancelTx: string | null;
  cancelPlayer: string | null;
  cancelDate: string | null;
  cardId: string;
  cardDetailId: number;
  gold: boolean;
  xp: number;
  edition: number;
}
