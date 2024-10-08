import { Effect } from 'effect';

import { cardsAreValidForRental } from '@wharf-gaming/splinterlands-utils';

import {
  fetchGroupedPlayerCards,
  handleAllListedCardsRentedScenario,
  handleCardsListedNoneRentedScenario,
  handleCardsListedSomeRentedScenario,
  handleNoCardsListedScenario,
  PriceLadder,
} from '..';

export const rentalPricingEngine = (
  player: string,
  priceLadder: PriceLadder,
) => {
  return Effect.gen(function* () {
    const cardGroups = yield* fetchGroupedPlayerCards(player);

    const validCardGroups = cardGroups.filter((cardGroup) =>
      cardsAreValidForRental(cardGroup),
    );

    let priceRecommendations = [];

    // List of scenario handlers
    const scenarioHandlers = [
      handleNoCardsListedScenario,
      handleCardsListedNoneRentedScenario,
      handleCardsListedSomeRentedScenario,
      handleAllListedCardsRentedScenario,
    ];

    // Process each card group and apply all scenarios
    for (const cardGroup of validCardGroups) {
      for (const handleScenario of scenarioHandlers) {
        const recommendations = yield* handleScenario(cardGroup, priceLadder);

        // Prevents further scenarios from being applied, currently our scenarios are mutually exclusive however this may not be the case in future
        if (recommendations && recommendations.length > 0) {
          priceRecommendations.push(...recommendations);
          break;
        }
      }
    }

    return priceRecommendations;
  });
};
