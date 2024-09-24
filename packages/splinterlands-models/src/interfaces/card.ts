import { CardColor, CardRarity, CardType } from '../enums';

export interface Card {
  eId: number;
  name: string;
  color: CardColor;
  type: CardType;
  subType: null;
  rarity: CardRarity;
  dropRate: number;
  stats: any;
  isStarter: boolean;
  editions: string;
  createdBlockNum: number | null;
  lastUpdateTx: string | null;
  totalPrinted: number;
  isPromo: boolean;
  tier: number | null;
  secondaryColor: string | null;
  stakeTypeId: number | null;
  printStartDate: string | null;
  distribution: any;
}
