import { Effect } from 'effect';

import { CardGroup } from '@wharf-gaming/splinterlands-models';
import {
  allCardsAreUnlisted,
  computeCardLevel,
} from '@wharf-gaming/splinterlands-utils';

import {
  fetchLowestRentalCardPrice,
  getIndexForTargetPrice,
  PriceLadder,
  recommendPricesFromLadder,
} from '..';

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
    const lowestRentalCardPrice = yield* fetchLowestRentalCardPrice({
      cardDetailId: cardGroup.cardGroupingInfo.cardDetailId,
      gold: cardGroup.cardGroupingInfo.gold,
      level: computeCardLevel(
        cardGroup.cardDetails.rarity,
        cardGroup.cardGroupingInfo.bcx,
      ),
    });

    const startIndex = getIndexForTargetPrice(
      lowestRentalCardPrice,
      priceLadder,
    );

    return recommendPricesFromLadder({
      cards: cardGroup.cards,
      priceLadder,
      startIndex,
      stepCount: 1,
      direction: 'up',
    });
  });
};
