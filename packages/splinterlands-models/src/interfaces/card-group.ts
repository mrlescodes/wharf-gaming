import { CardRarity, PlayerCard } from '..';

// A card that has the same Card Detail ID, BCX, Gold Foil and Edition are effectively identical.
export interface CardGroupDetails {
  cardDetailId: number;
  bcx: number;
  gold: boolean;
  edition: number;
  rarity: CardRarity;
}

export interface CardGroup {
  cards: PlayerCard[];
  cardGroupDetails: CardGroupDetails;
}
