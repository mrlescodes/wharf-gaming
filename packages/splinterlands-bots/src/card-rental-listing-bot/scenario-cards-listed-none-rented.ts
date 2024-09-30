import { CardGroup } from '@wharf-gaming/splinterlands-models';
import { hasCardsListedNoneRented } from '@wharf-gaming/splinterlands-utils';

import { PriceLadder } from '..';

/**
 * This is the scenario where cards are listed but none are rented out.
 */
export const handleCardsListedNoneRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (hasCardsListedNoneRented(cardGroup.cards)) {
    return processCardsListedNoneRentedScenario(cardGroup, priceLadder);
  }

  return null;
};

export const processCardsListedNoneRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  // TODO: Implement logic
};
