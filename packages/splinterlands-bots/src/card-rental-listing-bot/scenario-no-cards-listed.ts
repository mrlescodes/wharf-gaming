import { Effect } from 'effect';

import { CardGroup } from '@wharf-gaming/splinterlands-models';
import { allCardsAreUnlisted } from '@wharf-gaming/splinterlands-utils';

import { PriceLadder, recommendPricesFromLadder } from '..';

/**
 * This is the scenario when no cards are listed.
 */
export const handleNoCardsListedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (!allCardsAreUnlisted(cardGroup.cards)) {
    return Effect.succeed([]);
  }

  return processNoCardsListedScenario(cardGroup, priceLadder);
};

export const processNoCardsListedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    return recommendPricesFromLadder({
      cards: cardGroup.cards,
      priceLadder,
      startIndex: 0,
      stepCount: 3,
      direction: 'up',
    });
  });
};
