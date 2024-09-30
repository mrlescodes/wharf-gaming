import { Effect } from 'effect';

import { cardsAreValidForRental } from '@wharf-gaming/splinterlands-utils';

import {
  fetchGroupedPlayerCards,
  handleCardsListedNoneRentedScenario,
  handleCardsListedSomeRentedScenario,
  handleNoCardsListedScenario,
  PriceLadder,
} from '..';

export const runRentalPricingEngine = (priceLadder: PriceLadder) => {
  return Effect.gen(function* () {
    const cardGroups = yield* fetchGroupedPlayerCards;

    const validCardGroups = cardGroups.filter((cardGroup) =>
      cardsAreValidForRental(cardGroup),
    );

    let priceRecommendations = [];

    // List of scenario handlers
    const scenarioHandlers = [
      handleNoCardsListedScenario,
      handleCardsListedNoneRentedScenario,
      handleCardsListedSomeRentedScenario,
    ];

    // Process each card group and apply all scenarios
    for (const cardGroup of validCardGroups) {
      for (const handleScenario of scenarioHandlers) {
        const recommendation = handleScenario(cardGroup, priceLadder);

        if (recommendation) {
          priceRecommendations.push(recommendation);
        }
      }
    }

    return priceRecommendations;
  });
};
