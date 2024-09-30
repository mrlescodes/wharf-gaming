import { Card, PlayerCard } from '..';

// A card that has the same Card Detail ID, BCX and Gold Foil status are effectively identical.
export interface CardGroupingInfo {
  cardDetailId: number;
  bcx: number;
  gold: boolean;
}

export interface CardGroup {
  cards: PlayerCard[];
  cardDetails: Card;
  cardGroupingInfo: CardGroupingInfo;
}
