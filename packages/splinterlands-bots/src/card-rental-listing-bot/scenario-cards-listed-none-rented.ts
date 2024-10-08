import { Effect } from 'effect';

import { CardGroup } from '@wharf-gaming/splinterlands-models';
import {
  getHighestListedCardPrice,
  hasCardsListedNoneRented,
} from '@wharf-gaming/splinterlands-utils';

import { PriceLadder, recommendPricesFromLadder } from '..';

/**
 * This is the scenario where cards are listed but none are rented out.
 */
export const handleCardsListedNoneRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (!hasCardsListedNoneRented(cardGroup.cards)) {
    return Effect.succeed([]);
  }

  return processCardsListedNoneRentedScenario(cardGroup, priceLadder);
};

export const processCardsListedNoneRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    const highestListedPrice = getHighestListedCardPrice(cardGroup.cards);
    const highestListedPriceIndex = priceLadder.findIndex(
      (step) => step.price === highestListedPrice,
    );

    // Out of Bounds guard
    if (highestListedPriceIndex === -1) return [];

    return recommendPricesFromLadder({
      cards: cardGroup.cards,
      priceLadder,
      startIndex: highestListedPriceIndex,
      stepCount: 1,
      direction: 'down',
    });
  });
};
