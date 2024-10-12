import { Effect } from 'effect';

import { CardGroup } from '@wharf-gaming/splinterlands-models';
import { allAvailableCardsRented } from '@wharf-gaming/splinterlands-utils';

/**
 * This is the scenario where all available cards are rented.
 */
export const handleAllAvailableCardsRentedScenario = (cardGroup: CardGroup) => {
  if (!allAvailableCardsRented(cardGroup.cards)) {
    return Effect.succeed([]);
  }

  return processAllAvailableCardsRentedScenario(cardGroup);
};

export const processAllAvailableCardsRentedScenario = (
  cardGroup: CardGroup,
) => {
  return Effect.gen(function* () {
    return [cardGroup.cardGroupDetails];
  });
};
