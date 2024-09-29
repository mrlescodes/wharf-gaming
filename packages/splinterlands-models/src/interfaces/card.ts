import { CardRarity } from '../enums';

export interface Card {
  id: number;
  name: string;
  rarity: CardRarity;
}
