import { CardGroup } from '@wharf-gaming/splinterlands-models';
import { allCardsAreUnlisted } from '@wharf-gaming/splinterlands-utils';

import { PriceLadder } from '..';

/**
 * This is the scenario when no cards are listed.
 */
export const handleNoCardsListedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (allCardsAreUnlisted(cardGroup.cards)) {
    return processNoCardsListedScenario(cardGroup, priceLadder);
  }

  return null;
};

export const processNoCardsListedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  // TODO: Implement logic
};
