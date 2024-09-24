import {
  Currency,
  MarketListingType,
  MarketRentalStatus,
  MarketRentalType,
} from '../enums';

export interface PlayerCard {
  player: string;
  cardId: string;
  cardDetailId: number;
  xp: number;
  gold: boolean;
  edition: number;
  cardSet: string;
  collectionPower: number;
  marketListingId: string | null;
  marketListingPrice: string;
  marketListingType: MarketListingType;
  marketRentalStatus: MarketRentalStatus | null;
  marketListingCreatedDate: string | null;
  marketRentalType: MarketRentalType | null;
  marketRentalDays: number | null;
  marketRentalDate: string | null;
  marketRentalNextPayment: string | null;
  marketRentalCancelTx: string | null;
  marketRentalCancelDate: string | null;
  marketRentalCancelPlayer: string | null;
  lastUsedBlock: number | null;
  lastUsedPlayer: string | null;
  lastUsedDate: string | null;
  lastTransferredBlock: number | null;
  lastTransferredDate: string | null;
  alphaXp: number | null;
  delegatedTo: string | null;
  delegationTx: string | null;
  skin: null;
  delegatedToDisplayName: string | null;
  displayName: string;
  lockDays: number | null;
  unlockDate: string | null;
  wagonId: string | null;
  stakeStartDate: string | null;
  stakeEndDate: string | null;
  stakePlot: string | number | null;
  stakeRegion: string | number | null;
  createdDate: string | null;
  createdBlock: number | null;
  createdTx: string | null;
  expirationDate: string | null;
  lastBuyPrice: string | null;
  lastBuyCurrency: Currency | null;
  bcx: number;
  landBasePp: string;
  landDecStakeNeeded: number;
  level: number;
}
