import { Effect } from 'effect';

import { CardGroupDetails } from '@wharf-gaming/splinterlands-models';

import {
  fetchGroupedPlayerCards,
  handleAllAvailableCardsRentedScenario,
} from '..';

export const rentalPriceAnalysisEngine = (player: string) => {
  return Effect.gen(function* () {
    const cardGroups = yield* fetchGroupedPlayerCards(player);

    // TODO: Return a purchase recommendation instead?
    let priceAnalysis: CardGroupDetails[] = [];

    // List of scenario handlers
    const scenarioHandlers = [handleAllAvailableCardsRentedScenario];

    // Process each card group and apply all scenarios
    for (const cardGroup of cardGroups) {
      for (const handleScenario of scenarioHandlers) {
        const recommendations = yield* handleScenario(cardGroup);

        // Prevents further scenarios from being applied, currently our scenarios are mutually exclusive however this may not be the case in future
        if (recommendations && recommendations.length > 0) {
          priceAnalysis.push(...recommendations);
          break;
        }
      }
    }

    return priceAnalysis;
  });
};
