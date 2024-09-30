import { CardGroup } from '@wharf-gaming/splinterlands-models';

import { cardIsExactCombine, hasUnlistedCard } from '.';

/**
 * Determines if a group of cards are valid for rental.
 */
export const cardsAreValidForRental = (cardGroup: CardGroup) => {
  const { cards, cardDetails, cardGroupingInfo } = cardGroup;

  if (cards.length === 0) {
    return false;
  }

  if (!hasUnlistedCard(cards)) {
    return false;
  }

  if (!cardIsExactCombine(cardDetails.rarity, cardGroupingInfo.bcx)) {
    return false;
  }

  return true;
};
