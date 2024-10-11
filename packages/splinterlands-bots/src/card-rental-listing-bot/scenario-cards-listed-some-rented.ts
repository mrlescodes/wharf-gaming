import { Effect } from 'effect';

import { CardGroup } from '@wharf-gaming/splinterlands-models';
import {
  getHighestRentedCardPrice,
  hasCardsListedSomeRented,
} from '@wharf-gaming/splinterlands-utils';

import { PriceLadder, recommendPricesFromLadder } from '..';

/**
 * This is the scenario where cards ares listed and some are rented out.
 */
export const handleCardsListedSomeRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (!hasCardsListedSomeRented(cardGroup.cards)) {
    return Effect.succeed([]);
  }

  return processCardsListedSomeRentedScenario(cardGroup, priceLadder);
};

export const processCardsListedSomeRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    const highestRentedCardPrice = getHighestRentedCardPrice(cardGroup.cards);

    // TODO: Review
    const highestRentedCardPriceIndex = priceLadder.findIndex(
      (step) => step.price > highestRentedCardPrice,
    );

    // Out of Bounds guard
    if (highestRentedCardPriceIndex === -1) return [];

    return recommendPricesFromLadder({
      cards: cardGroup.cards,
      priceLadder,
      startIndex: highestRentedCardPriceIndex,
      stepCount: 1,
      direction: 'down',
    });
  });
};
