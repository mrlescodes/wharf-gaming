import { CardGroup } from '@wharf-gaming/splinterlands-models';
import { hasCardsListedSomeRented } from '@wharf-gaming/splinterlands-utils';

import { PriceLadder } from '..';

/**
 * This is the scenario where cards ares listed and some are rented out.
 */
export const handleCardsListedSomeRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (hasCardsListedSomeRented(cardGroup.cards)) {
    return processCardsListedSomeRentedScenario(cardGroup, priceLadder);
  }

  return null;
};

export const processCardsListedSomeRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  // TODO: Implement logic
};
