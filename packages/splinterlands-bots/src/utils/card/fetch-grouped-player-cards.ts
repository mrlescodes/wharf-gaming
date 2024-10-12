import { Effect } from 'effect';

import { SplinterlandsAPIClient } from '@wharf-gaming/splinterlands-api-client';
import {
  CardGroup,
  CardGroupDetails,
} from '@wharf-gaming/splinterlands-models';

export const fetchGroupedPlayerCards = (player: string) => {
  return Effect.gen(function* () {
    const client = yield* SplinterlandsAPIClient;

    const cards = yield* client.getCardDetails();

    // Create a map of card details for quick lookup
    const cardDetailsMap = new Map(cards.map((card) => [card.id, card]));

    const playerCards = yield* client.getPlayerCardCollection(player);

    // Create a map for grouping cards
    const groupedCardsMap = new Map<string, CardGroup>();

    // Iterate over player cards and group them
    for (const playerCard of playerCards) {
      // Define the grouping information, cards that have equal values for the below are effectively identical.
      const cardGroupDetails = {
        cardDetailId: playerCard.cardDetailId,
        bcx: playerCard.bcx,
        gold: playerCard.gold,
        edition: playerCard.edition,
        rarity: cardDetailsMap.get(playerCard.cardDetailId)?.rarity!, // TODO: Handle case where this doesn't exist. In reality this should always exist
      } satisfies CardGroupDetails;

      // Create a unique key for grouping based on the grouping info
      const groupingKey = `${cardGroupDetails.cardDetailId}-${cardGroupDetails.bcx}-${cardGroupDetails.gold}-${cardGroupDetails.edition}`;

      // If the group doesn't exist, create a new one
      if (!groupedCardsMap.has(groupingKey)) {
        // Get the card details for this card
        const cardDetails = cardDetailsMap.get(playerCard.cardDetailId);

        // In reality cardDetails should always exist
        if (cardDetails) {
          groupedCardsMap.set(groupingKey, {
            cards: [],
            cardGroupDetails,
          });
        }
      }

      // Add the player card to the corresponding group
      groupedCardsMap.get(groupingKey)?.cards.push(playerCard);
    }

    return Array.from(groupedCardsMap.values());
  });
};
