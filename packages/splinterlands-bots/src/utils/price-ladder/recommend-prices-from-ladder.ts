import { PlayerCard } from '@wharf-gaming/splinterlands-models';
import {
  getUnlistedCards,
  hasListedCardAtPrice,
} from '@wharf-gaming/splinterlands-utils';

import { PriceLadder } from '.';

export interface RentalRecommendation {
  price: number;
  cardId: string;
}

export const recommendPricesFromLadder = ({
  cards,
  priceLadder,
  startIndex,
  stepCount,
  direction = 'up',
}: {
  cards: PlayerCard[];
  priceLadder: PriceLadder;
  startIndex: number;
  stepCount: number;
  direction?: 'up' | 'down';
}) => {
  const recommendations: RentalRecommendation[] = [];

  const unlistedCards = getUnlistedCards(cards);

  // Bail if no unlisted cards
  if (unlistedCards.length === 0) {
    return recommendations;
  }

  // Calculate the maximum number of steps we can iterate
  const iterations = Math.min(stepCount, unlistedCards.length);

  for (let i = 0; i < iterations; i++) {
    const index = direction === 'up' ? startIndex + i : startIndex - i;

    // Exit if index is out of bounds to avoid extra iterations
    if (index < 0 || index >= priceLadder.length) {
      break;
    }

    const step = priceLadder[index];

    // Skip this iteration if the step is not defined or if a card is already listed at this price
    if (!step || hasListedCardAtPrice(cards, step.price)) {
      continue;
    }

    const cardToList = unlistedCards.pop();

    if (cardToList) {
      recommendations.push({
        price: step.price,
        cardId: cardToList.id,
      });
    }
  }

  return recommendations;
};
