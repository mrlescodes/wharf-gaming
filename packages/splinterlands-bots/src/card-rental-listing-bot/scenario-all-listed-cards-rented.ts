import { Effect } from 'effect';

import { CardGroup } from '@wharf-gaming/splinterlands-models';
import {
  allListedCardsRented,
  getHighestRentedCardPrice,
} from '@wharf-gaming/splinterlands-utils';

import { PriceLadder, recommendPricesFromLadder } from '..';

/**
 * This is the scenario where all listed cards are rented.
 */
export const handleAllListedCardsRentedScenario = (
  cardGroup: CardGroup,
  priceLadder: PriceLadder,
) => {
  if (!allListedCardsRented(cardGroup.cards)) {
    return Effect.succeed([]);
  }

  return processAllListedCardsRentedScenario(cardGroup, priceLadder);
};

export const processAllListedCardsRentedScenario = (
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
